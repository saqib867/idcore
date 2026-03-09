"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useProducts } from "@/hooks/api/useProducts"

export function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const [direction, setDirection] = useState(1)
    const progressRef = useRef<NodeJS.Timeout | null>(null)
    const { data } = useProducts()

    const lastThreeProducts = data ? data.slice(-3) : []
    const sideProducts = data ? data.slice(3, 5) : []

    const goToSlide = useCallback((index: number) => {
        setDirection(index > currentSlide ? 1 : -1)
        setCurrentSlide(index)
    }, [currentSlide])

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
        enter: (dir: number) => ({
            x: dir > 0 ? 60 : -60,
            opacity: 0,
        }),
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
        enter: (dir: number) => ({
            x: dir > 0 ? 80 : -80,
            opacity: 0,
            scale: 0.92,
        }),
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
        <section className="bg-neutral-50 dark:bg-neutral-950 py-6 lg:py-10 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">

                    {/* ── Main Carousel ──────────────────────────────── */}
                    <div className="lg:col-span-2 relative h-[420px] md:h-[520px] bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-sm border border-neutral-100 dark:border-neutral-800 transition-colors duration-300 group">

                        {/* Subtle grid texture overlay */}
                        <div
                            className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.04]"
                            style={{
                                backgroundImage: `linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)`,
                                backgroundSize: "40px 40px",
                            }}
                        />

                        {/* Ambient circle behind image */}
                        <div className="absolute right-0 top-0 w-[55%] h-full pointer-events-none">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-[380px] h-[380px] rounded-full bg-neutral-100 dark:bg-neutral-800 opacity-60 blur-3xl transition-colors duration-300" />
                            </div>
                        </div>

                        {/* Slide counter */}
                        <div className="absolute top-7 right-8 z-20 flex items-center gap-2">
                            <span className="text-xs font-bold tabular-nums text-neutral-900 dark:text-white transition-colors">
                                {String(currentSlide + 1).padStart(2, "0")}
                            </span>
                            <span className="w-8 h-px bg-neutral-300 dark:bg-neutral-600" />
                            <span className="text-xs font-medium tabular-nums text-neutral-400 dark:text-neutral-500 transition-colors">
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
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1, duration: 0.4 }}
                                        className="inline-block text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 mb-4 transition-colors"
                                    >
                                        Decoration
                                    </motion.span>

                                    <motion.h1
                                        initial={{ opacity: 0, y: 14 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.18, duration: 0.45 }}
                                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-4 tracking-tight leading-[1.05] transition-colors"
                                    >
                                        {data && lastThreeProducts[currentSlide]?.name}
                                    </motion.h1>

                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.26, duration: 0.4 }}
                                        className="text-neutral-400 dark:text-neutral-500 text-sm uppercase tracking-widest mb-10 transition-colors"
                                    >
                                        {data && lastThreeProducts[currentSlide]?.categories?.name}
                                    </motion.p>

                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.33, duration: 0.4 }}
                                    >
                                        <Link
                                            href="/shop"
                                            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-neutral-900 dark:text-white group/link transition-colors"
                                        >
                                            <span className="border-b-2 border-neutral-900 dark:border-white pb-0.5 group-hover/link:border-neutral-400 dark:group-hover/link:border-neutral-500 transition-colors">
                                                Shop Now
                                            </span>
                                            <ArrowRight className="w-3.5 h-3.5 -translate-x-1 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200" />
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
                                    className="flex-1 h-full w-full relative flex items-center justify-center"
                                >
                                    <img
                                        src={data && lastThreeProducts[currentSlide]?.image_url!}
                                        alt={data && lastThreeProducts[currentSlide]?.name}
                                        className="w-full h-full object-contain p-6 drop-shadow-xl group-hover:scale-[1.03] transition-transform duration-700"
                                    />
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Progress bar dots */}
                        <div className="absolute bottom-7 left-8 flex items-center gap-3 z-20">
                            {lastThreeProducts.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        goToSlide(index)
                                        setIsAutoPlaying(false)
                                    }}
                                    className="relative flex items-center"
                                    aria-label={`Go to slide ${index + 1}`}
                                >
                                    <span
                                        className={`block h-[3px] rounded-full transition-all duration-400 ${currentSlide === index
                                            ? "w-10 bg-neutral-900 dark:bg-white"
                                            : "w-4 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── Side Cards ─────────────────────────────────── */}
                    <div className="flex flex-col gap-4 lg:gap-6">
                        {sideProducts.map((product, i) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                                className="flex-1 bg-white dark:bg-neutral-900 rounded-2xl px-7 py-6 shadow-sm border border-neutral-100 dark:border-neutral-800 flex items-center justify-between group overflow-hidden relative transition-colors duration-300 cursor-pointer"
                            >
                                {/* Ambient blob */}
                                <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-28 h-28 rounded-full bg-neutral-100 dark:bg-neutral-800 opacity-70 blur-2xl transition-colors duration-300" />
                                    </div>
                                </div>

                                <div className="z-10 flex flex-col gap-1">
                                    <span className="text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500 transition-colors">
                                        Decoration
                                    </span>
                                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white leading-tight transition-colors">
                                        {product.name}
                                    </h3>
                                    <div className="mt-3">
                                        <Link
                                            href="/shop"
                                            className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-neutral-900 dark:text-white group/link transition-colors"
                                        >
                                            <span className="border-b-2 border-neutral-900 dark:border-white pb-0.5 group-hover/link:border-neutral-400 dark:group-hover/link:border-neutral-500 transition-colors">
                                                {product.categories?.name}
                                            </span>
                                            <ArrowRight className="w-3 h-3 -translate-x-1 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200" />
                                        </Link>
                                    </div>
                                </div>

                                <div className="w-[42%] h-28 relative z-10 flex-shrink-0">
                                    <img
                                        src={product.image_url!}
                                        alt={product.name}
                                        className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-500"
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