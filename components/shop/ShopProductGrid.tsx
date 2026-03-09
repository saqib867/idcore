"use client"

import React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, ShoppingCart } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { ProductWithCategory } from "@/hooks/api/useProducts"

interface ShopProductGridProps {
    products: ProductWithCategory[]
    isLoading: boolean
    clearFilters: () => void
}

export function ShopProductGrid({ products, isLoading, clearFilters }: ShopProductGridProps) {
    const { addToCart } = useCart()

    if (isLoading) {
        return (
            <div className="h-[400px] flex flex-col items-center justify-center text-center opacity-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary" />
            </div>
        )
    }

    if (products.length === 0) {
        return (
            <div className="h-[400px] flex flex-col items-center justify-center text-center opacity-50">
                <p className="text-xl font-medium">No products found matching your criteria.</p>
                <button
                    onClick={clearFilters}
                    className="text-primary font-bold mt-2 hover:underline"
                >
                    Clear all filters
                </button>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
                {products.map((product) => (
                    <motion.div
                        layout
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="group bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                    >
                        {/* Image */}
                        <div className="relative h-[260px] bg-secondary/40 flex items-center justify-center overflow-hidden">
                            <img
                                src={product.image_url || "/placeholder.jpg"}
                                alt={product.name}
                                className="max-h-[85%] object-contain transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Hover Actions */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
                                <Link href={`/product/${product.id}`}>
                                    <button className="h-10 w-10 flex items-center justify-center rounded-full bg-white text-black hover:bg-primary hover:text-white transition">
                                        <Eye className="h-5 w-5" />
                                    </button>
                                </Link>

                                <button
                                    onClick={() =>
                                        addToCart({
                                            id: product.id,
                                            name: product.name,
                                            price: product.price,
                                            category: product.categories?.name || "Uncategorized",
                                            image: product.image_url || "/placeholder.jpg",
                                        })
                                    }
                                    className="h-10 w-10 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:scale-110 transition"
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 space-y-2">
                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                {product.categories?.name || "Uncategorized"}
                            </span>

                            <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition">
                                {product.name}
                            </h3>

                            <div className="flex items-center justify-between pt-2">
                                <p className="font-bold text-lg text-primary">
                                    ${product.price.toFixed(2)}
                                </p>

                                <button
                                    onClick={() =>
                                        addToCart({
                                            id: product.id,
                                            name: product.name,
                                            price: product.price,
                                            category: product.categories?.name || "Uncategorized",
                                            image: product.image_url || "/placeholder.jpg",
                                        })
                                    }
                                    className="text-sm font-medium text-muted-foreground hover:text-primary transition"
                                >
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}
