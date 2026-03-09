"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { useCategories } from "@/hooks/api/useCategories"
import { useSearchParams } from "next/navigation"

const SPAN_MAP: Record<number, string> = {
    0: "lg:col-span-2",
    1: "lg:col-span-1",
    2: "lg:col-span-1",
    3: "lg:col-span-1",
    4: "lg:col-span-1",
    5: "lg:col-span-2",
}

function CategoryCard({ cat, idx }: { cat: any; idx: number }) {
    const span = SPAN_MAP[idx] ?? "lg:col-span-1"

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: idx * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className={`relative group h-[260px] lg:h-[300px] overflow-hidden rounded-2xl ${span} cursor-pointer`}
        >
            {/* Full-bleed background image */}
            <motion.img
                initial={{ scale: 1.08 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                src={cat.image_url ?? cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Bottom gradient overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

            {/* Subtle top vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent" />

            {/* Hover: slight brightness boost */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 bg-white/5" />

            {/* Text content — bottom left */}
            <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 z-10">
                <h3 className="text-white font-bold text-[1.15rem] lg:text-[1.35rem] leading-tight tracking-[-0.01em] drop-shadow-sm">
                    {cat.name}
                </h3>
                <p className="mt-0.5 text-white/65 text-[12px] font-medium tracking-wide">
                    {cat.items ?? `${cat.product_count ?? "—"} Products`}
                </p>
            </div>

            {/* Invisible full-card link */}
            <Link
                href={`/shop?category=${encodeURIComponent(cat.id)}`}
                className="absolute inset-0 z-20"
                aria-label={`Shop ${cat.name}`}
            />
        </motion.div>
    )
}

export function CategorySection() {
    const params = useSearchParams();
    const category = params.get("category");
    const { data: categories, isLoading } = useCategories({ category: category! })

    return (
        <section className="py-16 lg:py-24 bg-background">
            <div className="container px-4 mx-auto">

                {/* Section header */}
                <div className="flex items-end justify-between mb-8 lg:mb-10">
                    <div>
                        <p className="text-xs font-semibold tracking-widest uppercase text-neutral-400 dark:text-neutral-500 mb-1.5">
                            Browse by category
                        </p>
                        <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
                            Shop by Style
                        </h2>
                    </div>
                    <Link
                        href="/shop"
                        className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-150 tracking-wide uppercase"
                    >
                        View all
                        <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                </div>

                {/* Skeleton */}
                {isLoading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className={`h-[260px] lg:h-[300px] rounded-2xl bg-neutral-100 dark:bg-neutral-800 animate-pulse ${i === 0 || i === 5 ? "lg:col-span-2" : "lg:col-span-1"}`}
                            />
                        ))}
                    </div>
                )}

                {/* Grid */}
                {!isLoading && categories && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {categories.map((cat, idx) => (
                            <CategoryCard key={cat.name} cat={cat} idx={idx} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}