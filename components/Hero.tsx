"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useProducts } from "@/hooks/api/useProducts"
import image1 from "@/public/1.jpg"
import image2 from "@/public/2.jpg"
import image3 from "@/public/3.jpg"
import image4 from "@/public/4.png"

// ── Resolve Next.js static image imports to plain strings ─────────────────────
const toSrc = (img: { src: string } | string): string =>
    typeof img === "string" ? img : img.src

// ── Fallback data (used when hook returns < 5 items) ─────────────────────────
const FALLBACK_PRODUCTS = [
    {
        id: "fallback-1",
        name: "Aura Silk Dress",
        image_url: toSrc(image1),
        categories: { name: "Electronics" },
    },
    {
        id: "fallback-2",
        name: "Obsidian Coat",
        image_url: toSrc(image2),
        categories: { name: "Electronics" },
    },
    {
        id: "fallback-3",
        name: "Marble Sneaker",
        image_url: toSrc(image3),
        categories: { name: "Electronics" },
    },
    {
        id: "fallback-4",
        name: "Linen Blazer",
        image_url: toSrc(image4),
        categories: { name: "Electronics" },
    },
    {
        id: "fallback-5",
        name: "Velvet Tote",
        image_url: toSrc(image1),
        categories: { name: "Electronics" },
    },
]

export function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const [direction, setDirection] = useState(1)
    const progressRef = useRef<NodeJS.Timeout | null>(null)
    const { data } = useProducts()

    // ── Merge: use hook data if it has ≥ 5 items, otherwise pad with fallback ──
    const resolvedProducts = (() => {
        const hookData = data ?? []
        if (hookData.length >= 4) return hookData

        const hookIds = new Set(hookData.map((p) => p.id))
        const extra = FALLBACK_PRODUCTS.filter((p) => !hookIds.has(p.id))
        return [...hookData, ...extra].slice(0, Math.max(4, hookData.length))
    })()

    const lastThreeProducts = resolvedProducts.slice(-3)
    const sideProducts = resolvedProducts.slice(2, 4)

    const goToSlide = useCallback(
        (index: number) => {
            setDirection(index > currentSlide ? 1 : -1)
            setCurrentSlide(index)
        },
        [currentSlide]
    )

    const nextSlide = useCallback(() => {
        setDirection(1)
        setCurrentSlide((prev) => (prev + 1) % 3)
    }, [])

    useEffect(() => {
        if (!isAutoPlaying) return
        progressRef.current = setInterval(nextSlide, 5000)
        return () => {
            if (progressRef.current) clearInterval(progressRef.current)
        }
    }, [nextSlide, isAutoPlaying])

    const slideVariants = {
        enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
        center: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.55, ease: [0.32, 0.72, 0, 1] },
        },
        exit: (dir: number) => ({
            x: dir > 0 ? -60 : 60,
            opacity: 0,
            transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] },
        }),
    }

    const imageVariants = {
        enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0, scale: 0.92 }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: { duration: 0.65, ease: [0.32, 0.72, 0, 1] },
        },
        exit: (dir: number) => ({
            x: dir > 0 ? -40 : 40,
            opacity: 0,
            scale: 0.96,
            transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] },
        }),
    }

    return (
        <section className="relative overflow-hidden bg-background py-10 lg:py-16 transition-colors duration-300">
            {/* ── Background Elements ──────────────────────────────── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-[120px] animate-pulse" />
                <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[100px]" />
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3C%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

                    {/* ── Main Carousel ──────────────────────────────── */}
                    <div className="lg:col-span-2 relative h-[480px] md:h-[580px] bg-muted/40 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-lg border border-border/50 transition-all duration-500 group">

                        {/* Slide counter */}
                        <div className="absolute top-10 right-10 z-20 flex items-center gap-3">
                            <span className="text-xs font-black tabular-nums text-foreground transition-colors tracking-widest">
                                {String(currentSlide + 1).padStart(2, "0")}
                            </span>
                            <span className="w-12 h-px bg-border" />
                            <span className="text-xs font-medium tabular-nums text-muted-foreground transition-colors uppercase">
                                {String(lastThreeProducts.length).padStart(2, "0")}
                            </span>
                        </div>

                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={currentSlide}
                                custom={direction}
                                variants={slideVariants as any}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="absolute inset-0 flex flex-col md:flex-row items-center px-8 md:px-14"
                            >
                                {/* Text */}
                                <div className="flex-1 text-center md:text-left pt-10 md:pt-0 z-10 pr-4">
                                    <motion.span
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2, duration: 0.6 }}
                                        className="inline-block text-[11px] font-black uppercase tracking-[0.3em] text-primary mb-5 transition-colors"
                                    >
                                        New Arrival
                                    </motion.span>

                                    <motion.h1
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.7 }}
                                        className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight leading-[0.95] transition-colors"
                                    >
                                        {lastThreeProducts[currentSlide]?.name}
                                    </motion.h1>

                                    <motion.p
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4, duration: 0.6 }}
                                        className="text-muted-foreground text-sm font-medium uppercase tracking-[0.2em] mb-12 transition-colors max-w-sm"
                                    >
                                        Exclusively curated pieces for your{" "}
                                        {lastThreeProducts[currentSlide]?.categories?.name} collection.
                                    </motion.p>

                                    <motion.div
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5, duration: 0.6 }}
                                    >
                                        <Link
                                            href={`/product/${lastThreeProducts[currentSlide]?.id}`}
                                            className="inline-flex items-center group/btn"
                                        >
                                            <div className="px-8 py-4 bg-foreground text-background rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 group-hover/btn:pr-12 relative overflow-hidden">
                                                <span className="relative z-10">Explore Now</span>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover/btn:opacity-100 transition-all duration-300 translate-x-4 group-hover/btn:translate-x-0">
                                                    <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                </div>

                                {/* Image */}
                                <motion.div
                                    custom={direction}
                                    variants={imageVariants as any}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className="flex-1 h-full w-full relative flex items-center justify-center p-4 md:p-8"
                                >
                                    <div className="absolute inset-0 bg-linear-to-tr from-primary/10 to-transparent rounded-full blur-[80px] opacity-30 transform scale-75 animate-pulse" />
                                    <img
                                        src={lastThreeProducts[currentSlide]?.image_url ?? ""}
                                        alt={lastThreeProducts[currentSlide]?.name}
                                        className="w-[85%] h-[85%] object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.15)] group-hover:scale-[1.05] group-hover:-rotate-3 transition-all duration-1000 ease-out z-10"
                                    />
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Progress dots */}
                        <div className="absolute bottom-10 left-10 flex items-center gap-4 z-20">
                            {lastThreeProducts.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        goToSlide(index)
                                        setIsAutoPlaying(false)
                                    }}
                                    className="relative h-6 flex items-center group/dot"
                                    aria-label={`Go to slide ${index + 1}`}
                                >
                                    <div
                                        className={`h-0.5 rounded-full transition-all duration-500 origin-left ${currentSlide === index
                                            ? "w-12 bg-foreground"
                                            : "w-4 bg-muted-foreground/30 group-hover/dot:w-12 group-hover/dot:bg-muted-foreground"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── Side Cards ─────────────────────────────────── */}
                    <div className="flex flex-col gap-6 lg:gap-8">
                        {sideProducts.map((product, i) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 + i * 0.1, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                                className="flex-1 bg-muted/40 backdrop-blur-xl rounded-3xl px-8 py-7 shadow-sm border border-border/50 flex items-center justify-between group overflow-hidden relative transition-all duration-500 cursor-pointer hover:shadow-2xl hover:-translate-y-1"
                            >
                                <div className="z-10 flex flex-col gap-1.5">
                                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-primary transition-colors">
                                        Collection
                                    </span>
                                    <h3 className="text-xl font-bold text-foreground leading-tight transition-colors">
                                        {product.name}
                                    </h3>
                                    <div className="mt-4">
                                        <Link
                                            href={`/product/${product.id}`}
                                            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-foreground group/btn"
                                        >
                                            <span className="border-b-2 border-border group-hover/btn:border-primary transition-all duration-300 pb-0.5">
                                                View Piece
                                            </span>
                                            <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300" />
                                        </Link>
                                    </div>
                                </div>

                                <div className="w-[45%] h-32 relative z-10 flex-shrink-0 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />
                                    <img
                                        src={product.image_url ?? ""}
                                        alt={product.name}
                                        className="w-full h-full object-contain drop-shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-all duration-700 ease-out"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    )
}