import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";


export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    image_url: string | null;
    created_at: string;
}

export function useCategories({ category }: { category?: string }) {


    return useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            if (category) {
                const { data, error } = await supabase
                    .from("categories")
                    .select("*", { count: "exact" })
                    .eq("id", category);
                if (error) throw new Error(error.message);
                return data as Category[];
            }
            const { data, error } = await supabase
                .from("categories")
                .select("*", { count: "exact" })
                .order("name");

            if (error) throw new Error(error.message);
            return data as Category[];
        },
    });
}

export function useCategory(slugOrId: string | null) {
    return useQuery({
        queryKey: ["category", slugOrId],
        queryFn: async () => {
            if (!slugOrId) return null;

            const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slugOrId);

            const query = supabase.from("categories").select("*");
            if (isUuid) {
                query.eq("id", slugOrId);
            } else {
                query.eq("slug", slugOrId);
            }

            const { data, error } = await query.single();

            if (error) throw new Error(error.message);
            return data as Category;
        },
        enabled: !!slugOrId,
    });
}
