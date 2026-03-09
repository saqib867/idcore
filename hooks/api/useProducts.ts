import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export interface Product {
    id: string;
    category_id: string | null;
    name: string;
    slug: string;
    description: string | null;
    price: number;
    image_url: string | null;
    stock_quantity: number;
    created_at: string;
}

// Optionally, we can fetch categories along with products
export interface ProductWithCategory extends Product {
    categories: {
        name: string;
        slug: string;
    } | null;
}

interface UseProductsOptions {
    categoryId?: string | null;
    categorySlug?: string | null;
    searchQuery?: string;
    sortBy?: string;
}

export function useProducts(options?: UseProductsOptions) {
    return useQuery({
        queryKey: ["products", options],
        queryFn: async () => {
            let query = supabase
                .from("products")
                .select("*, categories(name, slug)", { count: "exact" });

            if (options?.categoryId && options.categoryId !== "All") {
                query = query.eq("category_id", options.categoryId);
            } else if (options?.categorySlug) {
                // Requires a join filter
                query = query.eq("categories.slug", options.categorySlug);
            }

            if (options?.searchQuery) {
                query = query.ilike("name", `%${options.searchQuery}%`);
            }

            // Apply sorting
            if (options?.sortBy === "price-low") {
                query = query.order("price", { ascending: true });
            } else if (options?.sortBy === "price-high") {
                query = query.order("price", { ascending: false });
            } else {
                // Default / featured
                query = query.order("created_at", { ascending: false });
            }

            const { data, error } = await query;

            if (error) throw new Error(error.message);

            // If filtering by categories.slug, supabase might return null for products where the relation doesn't match,
            // so we filter out products that don't have the category if we're doing an inner join equivalent.
            if (options?.categorySlug) {
                return (data as unknown as ProductWithCategory[]).filter(p => p.categories !== null);
            }

            return data as unknown as ProductWithCategory[];
        },
    });
}

export function useProduct(slugOrId: string | null) {
    return useQuery({
        queryKey: ["product", slugOrId],
        queryFn: async () => {
            if (!slugOrId) return null;

            const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slugOrId);

            let query = supabase.from("products").select("*, categories(name, slug)");

            if (isUuid) {
                query = query.eq("id", slugOrId);
            } else {
                query = query.eq("slug", slugOrId);
            }

            const { data, error } = await query.single();

            if (error) throw new Error(error.message);
            return data as unknown as ProductWithCategory;
        },
        enabled: !!slugOrId,
    });
}
