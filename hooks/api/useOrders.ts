import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export interface Order {
    id: string;
    user_id: string | null;
    total_amount: number;
    status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
    shipping_address: any | null;
    created_at: string;
}

export interface OrderItem {
    id: string;
    order_id: string;
    product_id: string | null;
    quantity: number;
    unit_price: number;
    created_at: string;
}

export function useUserOrders(userId: string | null) {
    return useQuery({
        queryKey: ["orders", "user", userId],
        queryFn: async () => {
            if (!userId) return [];

            const { data, error } = await supabase
                .from("orders")
                .select("*, order_items(*)")
                .eq("user_id", userId)
                .order("created_at", { ascending: false });

            if (error) throw new Error(error.message);
            return data; // Typed dynamically for now
        },
        enabled: !!userId,
    });
}

export function useCreateOrder() {
    const queryClient = useQueryClient();

    interface CreateOrderPayload {
        order: Omit<Order, "id" | "created_at" | "status"> & { status?: Order["status"]; user_id?: string | null };
        items: Omit<OrderItem, "id" | "created_at" | "order_id">[];
        payment_method: string;

    }

    return useMutation({
        mutationFn: async ({ order, items, payment_method }: CreateOrderPayload) => {
            // 1. Create the order
            const { data: createdOrder, error: orderError } = await supabase
                .from("orders")
                .insert({ ...order, payment_method })
                .select()
                .single();

            if (orderError) throw new Error(orderError.message);

            // 2. Create the order items
            const itemsWithOrderId = items.map((item) => ({
                ...item,
                order_id: createdOrder.id,
            }));

            const { error: itemsError } = await supabase
                .from("order_items")
                .insert(itemsWithOrderId);

            if (itemsError) throw new Error(itemsError.message);

            return createdOrder as Order;
        },
        onSuccess: (data) => {
            if (data.user_id) {
                queryClient.invalidateQueries({ queryKey: ["orders", "user", data.user_id] });
            }
        },
    });
}
