import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export interface User {
    id: string;
    email: string;
    full_name: string | null;
    is_guest: boolean;
    created_at: string;
}

export function useUser(id: string | null) {
    return useQuery({
        queryKey: ["users", id],
        queryFn: async () => {
            if (!id) return null;
            const { data, error } = await supabase
                .from("users")
                .select("*")
                .eq("id", id)
                .single();

            if (error) throw new Error(error.message);
            return data as User;
        },
        enabled: !!id,
    });
}

export function useCreateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (user: Omit<User, "id" | "created_at">) => {
            const { data, error } = await supabase
                .from("users")
                .insert(user)
                .select()
                .single();

            if (error) throw new Error(error.message);
            return data as User;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["users", data.id], data);
        },
    });
}

export function useUpdateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, updates }: { id: string; updates: Partial<User> }) => {
            const { data, error } = await supabase
                .from("users")
                .update(updates)
                .eq("id", id)
                .select()
                .single();

            if (error) throw new Error(error.message);
            return data as User;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["users", data.id] });
        },
    });
}
