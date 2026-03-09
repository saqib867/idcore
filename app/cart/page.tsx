"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
    ShoppingBag,
    ArrowLeft,
    Trash2,
    Minus,
    Plus,
    ChevronRight,
    ShieldCheck,
} from "lucide-react"

import { useCart } from "@/context/CartContext"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

export default function CartPage() {
    const {
        cart,
        removeFromCart,
        updateQuantity,
        totalPrice,
        totalItems,
        clearCart,
    } = useCart()

    return (
        <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Navbar />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
                {/* Header */}
                <div className="flex flex-col mb-12">
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Shop
                    </Link>

                    <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>

                    <p className="text-muted-foreground mt-1">
                        You have {totalItems} items in your bag.
                    </p>
                </div>

                {cart.length === 0 ? (
                    <div className="py-20 text-center flex flex-col items-center justify-center space-y-6">
                        <div className="h-20 w-20 rounded-full bg-secondary/50 flex items-center justify-center border border-border">
                            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-xl font-bold">Your cart is empty</h2>
                            <p className="text-muted-foreground max-w-sm mx-auto">
                                Looks like you haven't added anything to your cart yet.
                            </p>
                        </div>

                        <Link
                            href="/shop"
                            className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-all"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-[1fr_380px] gap-10">
                        {/* Cart Items */}
                        <div className="space-y-4 w-full">
                            {cart.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-4 rounded-2xl bg-secondary/30 border border-border group transition-all"
                                >
                                    {/* Image */}
                                    <div className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 bg-background rounded-xl border border-border flex-shrink-0 flex items-center justify-center p-2 overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-lg truncate">
                                            {item.name}
                                        </h3>

                                        <p className="font-bold mt-1 text-primary">
                                            ${item.price.toFixed(2)}
                                        </p>
                                    </div>

                                    {/* Controls */}
                                    <div className="flex flex-wrap items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                                        {/* Quantity */}
                                        <div className="flex items-center gap-4 bg-background/50 px-3 py-1.5 rounded-xl border border-border">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                                <Minus className="h-4 w-4" />
                                            </button>

                                            <span className="font-bold min-w-[20px] text-center">
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </button>
                                        </div>

                                        {/* Item Total */}
                                        <div className="text-right min-w-[90px]">
                                            <p className="text-lg sm:text-xl font-bold font-mono">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>

                                        {/* Remove */}
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="h-10 w-10 flex items-center justify-center rounded-xl text-destructive hover:bg-destructive/10 transition-all border border-transparent hover:border-destructive/20"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}

                            <button
                                onClick={clearCart}
                                className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-destructive/20 text-destructive font-semibold hover:bg-destructive/5 transition-all ml-auto"
                            >
                                <Trash2 className="h-4 w-4" />
                                Clear Cart
                            </button>
                        </div>

                        {/* Summary */}
                        <div className="w-full lg:sticky lg:top-24 h-fit">
                            <div className="p-6 rounded-2xl bg-secondary/40 space-y-6 premium-shadow">
                                <h3 className="text-xl font-bold border-b border-primary-foreground/10 pb-4">
                                    Summary
                                </h3>

                                <div className="space-y-4 pt-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Subtotal</span>
                                        <span className="font-bold">
                                            ${totalPrice.toFixed(2)}
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span>Shipping</span>
                                        <span className="text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider">
                                            Free
                                        </span>
                                    </div>

                                    <div className="h-px bg-primary-foreground/10 my-4" />

                                    <div className="flex justify-between items-end">
                                        <span className="font-bold">Total Amount</span>

                                        <span className="text-3xl font-bold font-mono">
                                            ${totalPrice.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                <Link
                                    href="/checkout"
                                    className="w-full bg-green-500 py-4 text-white rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                                >
                                    Proceed to Checkout
                                    <ChevronRight className="h-5 w-5" />
                                </Link>

                                <div className="flex items-center justify-center gap-2 text-[10px] pt-2 uppercase tracking-widest font-semibold">
                                    <ShieldCheck className="h-3 w-3" />
                                    SECURE CHECKOUT GUARANTEED
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    )
}