"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, ReactNode } from "react";

export function QueryProvider({ children }: { children: ReactNode }) {
    // Create a client exactly once per session
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes by default
                        refetchOnWindowFocus: false, // Don't refetch on window focus by default
                        retry: 1, // Retry failed requests once
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
