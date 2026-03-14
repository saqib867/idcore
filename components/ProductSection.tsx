"use client"

import { motion } from "framer-motion"
import { ShoppingCart, Heart, Eye } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { useProducts } from "@/hooks/api/useProducts"
import Link from "next/link"

export function ProductSection() {
    const { addToCart } = useCart()
    const { data: products, isLoading } = useProducts()

    if (isLoading) {
        return (
            <section id="shop" className="py-16 bg-background">
                <div className="container px-4 mx-auto flex justify-center items-center h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary" />
                </div>
            </section>
        )
    }

    const displayProducts = products?.slice(0, 4) || []

    return (
        <section id="shop" className="py-16 bg-background transition-colors duration-300">
            <div className="container px-4 mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-3 block"
                    >
                        Handpicked Items
                    </motion.span>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-foreground">
                        Editor's <span className="text-gradient italic">Pick</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {displayProducts.map((product, idx) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative shadow-lg shadow-primary/10 p-1 rounded-3xl"
                        >
                            <div className="relative aspect-square overflow-hidden rounded-3xl bg-muted border border-border/50 mb-4 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-primary/5">
                                {/* product.isNew logic removed as it's not in base schema */}
                                <img
                                    src={product.image_url || "/placeholder.jpg"}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                <div className="absolute inset-x-4 bottom-4 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    <div className="bg-background/90 backdrop-blur-md rounded-2xl p-2 flex items-center justify-between gap-2 border border-border/50 shadow-xl">
                                        <div className="flex gap-1">
                                            <Link href={`/product/${product.id}`}>
                                                <button className="h-9 w-9 flex items-center justify-center rounded-xl bg-muted text-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                                                    <Eye className="h-4 w-4" />
                                                </button>
                                            </Link>
                                            {/* <button className="h-9 w-9 flex items-center justify-center rounded-xl bg-muted text-foreground hover:bg-red-500 hover:text-white transition-all">
                                                <Heart className="h-4 w-4" />
                                            </button> */}
                                        </div>
                                        <button
                                            onClick={() => addToCart({
                                                id: product.id,
                                                name: product.name,
                                                price: product.price,
                                                category: product.categories?.name || "Uncategorized",
                                                image: product.image_url || "/placeholder.jpg"
                                            })}
                                            className="grow h-9 px-4 flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all"
                                        >
                                            <ShoppingCart className="h-3.5 w-3.5" />
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="p-3">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1 block">
                                    {product.categories?.name || "Uncategorized"}
                                </span>
                                <div className="flex items-start justify-between gap-4">
                                    <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-1">
                                        {product.name}
                                    </h3>
                                    <p className="font-black text-primary whitespace-nowrap">
                                        ${product.price.toFixed(0)}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link href="/shop">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-4 bg-foreground text-background rounded-2xl font-black uppercase text-xs tracking-widest hover:shadow-2xl transition-all border border-transparent"
                        >
                            Explore Collection
                        </motion.button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
