"use client"

import React, { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, ShoppingCart, Heart, Share2, Star, ShieldCheck, Truck } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { useProduct } from "@/hooks/api/useProducts"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

export default function ProductDetailsPage() {
    const { id } = useParams()
    const router = useRouter()
    const { addToCart } = useCart()
    const [quantity, setQuantity] = useState(1)

    const { data: product, isLoading } = useProduct(typeof id === "string" ? id : id?.[0] || null)

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary" />
            </div>
        )
    }

    if (!product) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
                    <button onClick={() => router.back()} className="text-primary font-bold hover:underline">
                        Go Back
                    </button>
                </div>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            <section className="pt-8 md:pt-10 pb-20 md:pb-24">
                <div className="container px-4 md:px-6 mx-auto">

                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 md:mb-8 group"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        <span className="text-sm font-medium">Back to Shop</span>
                    </button>

                    <div className="grid lg:grid-cols-2 gap-10 md:gap-14 lg:gap-16 items-start">

                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="relative aspect-square rounded-[2rem] md:rounded-[2.5rem] w-full overflow-hidden bg-secondary premium-shadow"
                        >
                            <img
                                src={product.image_url || "/placeholder.jpg"}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        {/* Product Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex flex-col gap-6 md:gap-8"
                        >

                            <div className="space-y-4">

                                <div className="flex items-center justify-between flex-wrap gap-3">

                                    <span className="text-xs font-bold text-primary uppercase tracking-widest px-3 py-1 bg-primary/10 rounded-full">
                                        {product.categories?.name || "Uncategorized"}
                                    </span>

                                    <div className="flex gap-2">
                                        <button className="h-10 w-10 border border-border rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                                            <Heart className="h-5 w-5" />
                                        </button>

                                        <button className="h-10 w-10 border border-border rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                                            <Share2 className="h-5 w-5" />
                                        </button>
                                    </div>

                                </div>

                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                                    {product.name}
                                </h1>

                                <div className="flex items-center gap-4 flex-wrap">
                                    <div className="flex text-primary">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star key={s} className="h-4 w-4 fill-current" />
                                        ))}
                                    </div>

                                    <span className="text-sm text-muted-foreground font-medium">
                                        4.8 (124 reviews)
                                    </span>
                                </div>

                                <p className="text-2xl md:text-3xl font-bold text-primary italic">
                                    ${product.price.toFixed(2)}
                                </p>

                                <p className="text-base md:text-lg text-muted-foreground leading-relaxed pt-1 md:pt-2">
                                    {product.description}
                                </p>

                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-2 md:pt-4">

                                <div className="flex items-center justify-between sm:justify-start gap-4 border border-border rounded-2xl p-2 h-14 w-full sm:w-auto">

                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="h-10 w-10 rounded-xl hover:bg-accent flex items-center justify-center font-bold"
                                    >
                                        -
                                    </button>

                                    <span className="w-8 text-center font-bold text-lg">
                                        {quantity}
                                    </span>

                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="h-10 w-10 rounded-xl hover:bg-accent flex items-center justify-center font-bold"
                                    >
                                        +
                                    </button>

                                </div>

                                <button
                                    onClick={() => {
                                        for (let i = 0; i < quantity; i++)
                                            addToCart({
                                                id: product.id,
                                                name: product.name,
                                                price: product.price,
                                                category: product.categories?.name || "Uncategorized",
                                                image: product.image_url || "/placeholder.jpg"
                                            })
                                    }}
                                    className="flex-1 h-14 bg-primary text-primary-foreground rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all premium-shadow"
                                >
                                    <ShoppingCart className="h-10 w-5" />
                                    Add to Collection
                                </button>

                            </div>

                            {/* Trust Badges */}
                            <div className="flex flex-wrap items-center gap-6 md:gap-8 pt-2 md:pt-4">

                                <div className="flex items-center gap-3 opacity-60">
                                    <Truck className="h-5 w-5" />
                                    <span className="text-xs font-bold uppercase tracking-wider">
                                        Free Worldwide Shipping
                                    </span>
                                </div>

                                <div className="flex items-center gap-3 opacity-60">
                                    <ShieldCheck className="h-5 w-5" />
                                    <span className="text-xs font-bold uppercase tracking-wider">
                                        2 Year Warranty
                                    </span>
                                </div>

                            </div>

                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}