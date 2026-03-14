"use client"

import React, { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ShoppingCart, Share2, Star, ShieldCheck, Truck, Plus, Minus, Sparkles, ChevronRight } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { useProduct } from "@/hooks/api/useProducts"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

export default function ProductDetailsPage() {
    const { id } = useParams()
    const router = useRouter()
    const { addToCart } = useCart()
    const [quantity, setQuantity] = useState(1)
    const [mainImage, setMainImage] = useState<string | null>(null)
    const [addedPulse, setAddedPulse] = useState(false)

    const { data: product, isLoading } = useProduct(typeof id === "string" ? id : id?.[0] || null)

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++)
            addToCart({
                id: product!.id,
                name: product!.name,
                price: product!.price,
                category: product!.categories?.name || "Uncategorized",
                image: product!.image_url || "/placeholder.jpg",
            })
        setAddedPulse(true)
        setTimeout(() => setAddedPulse(false), 600)
    }

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center bg-background">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-10 h-10 rounded-full border-[2.5px] border-border border-t-primary"
                />
            </div>
        )
    }

    if (!product) {
        return (
            <div className="h-screen flex items-center justify-center bg-background">
                <div className="text-center space-y-4">
                    <p className="text-5xl font-black text-muted-foreground/30">404</p>
                    <h1 className="text-xl font-bold text-foreground">Product Not Found</h1>
                    <button onClick={() => router.back()} className="text-sm font-bold text-primary hover:underline">
                        Go Back
                    </button>
                </div>
            </div>
        )
    }

    const images = (product as any)?.images || (product as any)?.image_urls || (product?.image_url ? [product.image_url] : ["/placeholder.jpg"])
    const currentImage = mainImage || images[0]
    const reviewCount = 124
    const rating = 4.8

    return (
        <main className="min-h-screen bg-background transition-colors duration-500">
            <Navbar />

            {/* ── Background atmosphere ── */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute -top-1/3 -right-1/4 w-[55%] h-[55%] rounded-full bg-primary/5 blur-[130px]" />
                <div className="absolute -bottom-1/4 -left-1/4 w-[45%] h-[45%] rounded-full bg-primary/8 blur-[110px]" />
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
            </div>

            <section className="relative z-10 pt-6 md:pt-10 pb-24">
                <div className="container px-4 md:px-8 mx-auto max-w-7xl">

                    {/* Breadcrumb nav */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex items-center gap-2 mb-10"
                    >
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 group"
                        >
                            <div className="w-9 h-9 rounded-xl bg-muted border border-border backdrop-blur-sm flex items-center justify-center group-hover:bg-accent transition-all duration-300 group-hover:-translate-x-0.5 shadow-sm">
                                <ArrowLeft className="h-4 w-4 text-foreground" />
                            </div>
                        </button>
                        <span className="text-muted-foreground">/</span>
                        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Shop</span>
                        <ChevronRight className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs font-semibold uppercase tracking-widest text-foreground truncate max-w-[200px]">
                            {product.name}
                        </span>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-11 gap-8 lg:gap-12 xl:gap-16 items-start">

                        {/* ── Left: Image Gallery ── */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                            className="lg:col-span-5 flex gap-4"
                        >
                            {/* Vertical thumbnails */}
                            {images.length > 1 && (
                                <div className="flex flex-col gap-3 w-[72px] flex-shrink-0">
                                    {images.map((img: string, idx: number) => (
                                        <motion.button
                                            key={idx}
                                            onClick={() => setMainImage(img)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.97 }}
                                            className={`relative aspect-square w-full rounded-2xl overflow-hidden border-[1.5px] transition-all duration-300 ${currentImage === img
                                                ? "border-primary shadow-lg shadow-primary/20"
                                                : "border-border hover:border-border/80"
                                                }`}
                                            style={{ background: currentImage === img ? undefined : "rgba(255,255,255,0.5)" }}
                                        >
                                            <div className="absolute inset-0 backdrop-blur-sm" />
                                            <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-contain p-1.5 relative z-10" />
                                            {currentImage === img && (
                                                <div className="absolute inset-0 bg-primary/5 z-20" />
                                            )}
                                        </motion.button>
                                    ))}
                                </div>
                            )}

                            {/* Main image */}
                            <div className="flex-1 relative">
                                <div
                                    className="relative aspect-square w-full rounded-[2.5rem] overflow-hidden border border-border shadow-xl"
                                    style={{ background: "rgba(255,255,255,0.6)" }}
                                >
                                    <div className="absolute inset-0 backdrop-blur-xl" />

                                    {/* Glow behind image */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="w-[65%] h-[65%] rounded-full bg-primary/10 blur-[60px]" />
                                    </div>

                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={currentImage}
                                            src={currentImage}
                                            alt={product.name}
                                            initial={{ opacity: 0, scale: 0.94 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 1.03 }}
                                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                            className="absolute inset-0 w-full h-full object-contain p-8 z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
                                        />
                                    </AnimatePresence>

                                    {/* Category pill overlay */}
                                    <div className="absolute top-5 left-5 z-20 px-3 py-1.5 rounded-full bg-background/70 border border-border backdrop-blur-md shadow-sm">
                                        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-primary">
                                            {product.categories?.name || "Collection"}
                                        </span>
                                    </div>

                                    {/* Share button overlay */}
                                    <button className="absolute top-5 right-5 z-20 w-9 h-9 rounded-xl bg-background/70 border border-border backdrop-blur-md shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                                        <Share2 className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Trust mini-badges below image */}
                                <div className="mt-4 grid grid-cols-2 gap-3">
                                    {[
                                        { icon: Truck, label: "Free Worldwide Shipping" },
                                        { icon: ShieldCheck, label: "2 Year Warranty" },
                                    ].map(({ icon: Icon, label }) => (
                                        <div key={label} className="flex items-center gap-2.5 px-4 py-3 rounded-2xl border border-border bg-muted/20 backdrop-blur-sm">
                                            <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground leading-tight">
                                                {label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* ── Right: Product Info ── */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                            className="lg:col-span-6 flex flex-col gap-8"
                        >
                            {/* Header block */}
                            <div className="space-y-5">
                                {/* Stars + reviews */}
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-0.5">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star
                                                key={s}
                                                className={`h-3.5 w-3.5 ${s <= Math.floor(rating) ? "fill-amber-400 text-amber-400" : "fill-muted text-muted-foreground"}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs font-bold text-muted-foreground">
                                        {rating} <span className="font-medium opacity-60">({reviewCount} reviews)</span>
                                    </span>
                                    <div className="flex items-center gap-1 ml-auto px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">In Stock</span>
                                    </div>
                                </div>

                                {/* Product name */}
                                <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-black text-foreground tracking-tight leading-[0.92]">
                                    {product.name}
                                </h1>

                                {/* Price row */}
                                <div className="flex items-end gap-4">
                                    <span className="text-4xl font-black text-primary tracking-tight">
                                        {product.price.toFixed(2)}
                                    </span>
                                    {/* <span className="text-sm text-neutral-400 dark:text-neutral-600 line-through mb-1 font-medium">
                                        ${(product.price * 1.2).toFixed(2)}
                                    </span> */}
                                    {/* <span className="mb-1 px-2.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-800/40 text-[9px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">
                                        20% off
                                    </span> */}
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

                            {/* Description */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.22em] text-muted-foreground">About this piece</span>
                                </div>
                                <p className="text-[15px] text-muted-foreground leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            {/* Divider */}
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

                            {/* Quantity + Add to cart */}
                            <div className="space-y-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.22em] text-muted-foreground">Quantity</span>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    {/* Quantity selector */}
                                    <div className="flex items-center gap-0 rounded-2xl border border-border bg-muted/50 backdrop-blur-sm overflow-hidden h-14 w-fit">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-14 h-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
                                        >
                                            <Minus className="w-3.5 h-3.5" />
                                        </button>
                                        <div className="w-14 h-full flex items-center justify-center border-x border-border">
                                            <AnimatePresence mode="wait">
                                                <motion.span
                                                    key={quantity}
                                                    initial={{ opacity: 0, y: -8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 8 }}
                                                    transition={{ duration: 0.18 }}
                                                    className="text-base font-black text-foreground tabular-nums"
                                                >
                                                    {quantity}
                                                </motion.span>
                                            </AnimatePresence>
                                        </div>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="w-14 h-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
                                        >
                                            <Plus className="w-3.5 h-3.5" />
                                        </button>
                                    </div>

                                    {/* Add to cart CTA */}
                                    <motion.button
                                        onClick={handleAddToCart}
                                        animate={addedPulse ? { scale: [1, 0.96, 1.02, 1] } : {}}
                                        transition={{ duration: 0.4 }}
                                        className="flex-1 h-14 bg-foreground text-background rounded-2xl font-black text-[11px] uppercase tracking-[0.18em] flex items-center justify-center gap-3 hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group relative overflow-hidden"
                                    >
                                        {/* Shimmer on hover */}
                                        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none" />
                                        <ShoppingCart className="w-4 h-4" />
                                        Add to Collection
                                    </motion.button>
                                </div>
                            </div>

                            {/* Highlights grid */}
                            <div className="grid grid-cols-3 gap-3 pt-2">
                                {[
                                    { label: "Material", value: "Premium Grade" },
                                    { label: "Origin", value: "Handcrafted" },
                                    { label: "Care", value: "Easy Clean" },
                                ].map(({ label, value }) => (
                                    <div key={label} className="rounded-2xl border border-border bg-muted/20 backdrop-blur-sm px-4 py-4 text-center">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1.5">{label}</p>
                                        <p className="text-xs font-bold text-foreground">{value}</p>
                                    </div>
                                ))}
                            </div>

                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}