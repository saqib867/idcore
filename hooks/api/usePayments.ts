import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export interface Payment {
    id: string;
    order_id: string;
    amount: number;
    status: "pending" | "completed" | "failed" | "refunded";
    payment_method: string | null;
    transaction_id: string | null;
    created_at: string;
}

export function usePaymentStatus(orderId: string | null) {
    return useQuery({
        queryKey: ["payments", "order", orderId],
        queryFn: async () => {
            if (!orderId) return null;

            const { data, error } = await supabase
                .from("payments")
                .select("*")
                .eq("order_id", orderId)
                .single();

            if (error && error.code !== "PGRST116") { // Ignore no rows error
                throw new Error(error.message);
            }
            return data as Payment | null;
        },
        enabled: !!orderId,
    });
}

export function useProcessPayment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payment: Omit<Payment, "id" | "created_at">) => {
            const { data, error } = await supabase
                .from("payments")
                .insert(payment)
                .select()
                .single();

            if (error) throw new Error(error.message);
            return data as Payment;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["payments", "order", data.order_id], data);

            // We might also want to update the order status
            // In a real app, a backend webhook usually handles this part, 
            // but for client-side optimistic UI:
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
    });
}
