"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react"
import { useCart } from "@/context/CartContext"

interface CartDrawerProps {
    isOpen: boolean
    onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart()

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-background shadow-2xl z-[101] flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-border">
                            <div className="flex items-center gap-2">
                                <ShoppingBag className="h-5 w-5" />
                                <h2 className="text-xl font-bold">Your Cart ({totalItems})</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-accent transition-colors"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                                    <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center">
                                        <ShoppingBag className="h-10 w-10" />
                                    </div>
                                    <p className="text-lg font-medium">Your cart is empty</p>
                                    <button
                                        onClick={onClose}
                                        className="text-sm text-primary font-bold hover:underline"
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.id} className="flex gap-4 group">
                                        <div className="h-24 w-24 rounded-2xl overflow-hidden bg-secondary flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-semibold text-sm line-clamp-1">{item.name}</h3>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-muted-foreground hover:text-destructive transition-colors"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                                <p className="text-xs text-muted-foreground mt-0.5">{item.category}</p>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 border border-border rounded-lg p-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="h-6 w-6 flex items-center justify-center hover:bg-accent rounded"
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </button>
                                                    <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="h-6 w-6 flex items-center justify-center hover:bg-accent rounded"
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </button>
                                                </div>
                                                <p className="font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-6 border-t border-border space-y-4 bg-secondary/20">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="font-bold">${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span className="font-bold text-primary">Calculated at checkout</span>
                                </div>
                                <div className="border-t border-border/50 pt-4 flex justify-between">
                                    <span className="font-bold">Total</span>
                                    <span className="font-bold text-xl">${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <Link
                                        href="/cart"
                                        onClick={onClose}
                                        className="flex items-center justify-center gap-2 py-4 border border-border rounded-2xl font-bold hover:bg-accent transition-all"
                                    >
                                        View Cart
                                    </Link>
                                    <Link
                                        href="/checkout"
                                        onClick={onClose}
                                        className="flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all premium-shadow"
                                    >
                                        Checkout <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
