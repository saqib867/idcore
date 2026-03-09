"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export interface CartPayload {
    id: string
    name: string
    price: number
    category: string
    image: string
}

export interface CartItem extends CartPayload {
    quantity: number
}

interface CartContextType {
    cart: CartItem[]
    addToCart: (product: CartPayload) => void
    removeFromCart: (productId: string) => void
    updateQuantity: (productId: string, delta: number) => void
    clearCart: () => void
    totalItems: number
    totalPrice: number
    notification: string | null
    showNotification: (msg: string) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([])
    const [notification, setNotification] = useState<string | null>(null)

    // Load cart from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("decorcore-cart")
        if (saved) setCart(JSON.parse(saved))
    }, [])

    // Save cart to localStorage
    useEffect(() => {
        localStorage.setItem("decorcore-cart", JSON.stringify(cart))
    }, [cart])

    const addToCart = (product: CartPayload) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id)
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            }
            return [...prev, { ...product, quantity: 1 }]
        })
        showNotification(`Added ${product.name} to cart!`)
    }

    const removeFromCart = (productId: string) => {
        setCart((prev) => prev.filter((item) => item.id !== productId))
    }

    const updateQuantity = (productId: string, delta: number) => {
        setCart((prev) =>
            prev.map((item) => {
                if (item.id === productId) {
                    const newQty = Math.max(1, item.quantity + delta)
                    return { ...item, quantity: newQty }
                }
                return item
            })
        )
    }

    const clearCart = () => setCart([])

    const showNotification = (msg: string) => {
        setNotification(msg)
        setTimeout(() => setNotification(null), 3000)
    }

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalItems,
                totalPrice,
                notification,
                showNotification,
            }}
        >
            {children}

            {/* Custom Notification UI */}
            {notification && (
                <div className="fixed bottom-8 right-8 z-[100] bg-primary text-primary-foreground px-6 py-4 rounded-2xl premium-shadow animate-in slide-in-from-right-10 duration-300 flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                    <span className="font-semibold text-sm">{notification}</span>
                </div>
            )}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) throw new Error("useCart must be used within a CartProvider")
    return context
}
