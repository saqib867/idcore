"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, ChevronDown, Loader2 } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { useCreateOrder } from "@/hooks/api/useOrders"
import { Navbar } from "@/components/Navbar"

const SHIPPING_OPTIONS = [
    { id: "flat", label: "FLAT Shipping 99 PKR + FBR POS Fee 1 PKR", price: 100 },
    { id: "free", label: "FREE DELIVERY (CARD PAYMENT ONLY)", price: 0 },
]

const PAYMENT_OPTIONS = [
    { id: "cod", label: "Cash on Delivery (COD)", description: "Cash on Delivery" },
]

const BILLING_OPTIONS = [
    { id: "same", label: "Same as shipping address" },
    { id: "different", label: "Use a different billing address" },
]

interface CheckoutForm {
    email: string
    emailOffers: boolean
    country: string
    firstName: string
    lastName: string
    address: string
    city: string
    postalCode: string
    phone: string
    saveInfo: boolean
    shippingMethod: string
    paymentMethod: string
    billingAddress: string
}

export default function CheckoutPage() {
    const router = useRouter()
    const { cart, totalPrice, clearCart } = useCart()
    const createOrder = useCreateOrder()

    const [form, setForm] = useState<CheckoutForm>({
        email: "",
        emailOffers: true,
        country: "Pakistan",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        phone: "",
        saveInfo: false,
        shippingMethod: "flat",
        paymentMethod: "cod",
        billingAddress: "same",
    })

    console.log("payment method => ", form)

    const [errors, setErrors] = useState<Partial<Record<keyof CheckoutForm, string>>>({})
    const [orderSuccess, setOrderSuccess] = useState(false)

    const shippingCost = SHIPPING_OPTIONS.find((s) => s.id === form.shippingMethod)?.price ?? 100
    const grandTotal = totalPrice + shippingCost

    const updateField = (field: keyof CheckoutForm, value: string | boolean) => {
        setForm((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }))
        }
    }

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof CheckoutForm, string>> = {}
        if (!form.email.trim()) newErrors.email = "Email is required"
        if (!form.address.trim()) newErrors.address = "Address is required"
        if (!form.city.trim()) newErrors.city = "City is required"
        if (!form.phone.trim()) newErrors.phone = "Phone is required"
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validate()) return
        if (cart.length === 0) return

        try {
            await createOrder.mutateAsync({
                order: {
                    user_id: null,
                    total_amount: grandTotal,
                    shipping_address: {
                        email: form.email,
                        country: form.country,
                        first_name: form.firstName,
                        last_name: form.lastName,
                        address: form.address,
                        city: form.city,
                        postal_code: form.postalCode,
                        phone: form.phone,
                    },
                },
                items: cart.map((item) => ({
                    product_id: item.id,
                    quantity: item.quantity,
                    unit_price: item.price,
                })),
                payment_method: form.paymentMethod
            })

            clearCart()
            setOrderSuccess(true)
        } catch (err) {
            console.error("Order failed:", err)
        }
    }

    // Success State
    if (orderSuccess) {
        return (
            <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
                <div className="text-center space-y-6 max-w-md">
                    <div className="h-20 w-20 mx-auto rounded-full bg-emerald-500/10 flex items-center justify-center">
                        <svg className="h-10 w-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold">Order Confirmed!</h1>
                    <p className="text-muted-foreground">
                        Thank you for your order. We&apos;ll send you a confirmation email shortly.
                    </p>
                    <Link
                        href="/shop"
                        className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-all"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
                {/* Back Link */}
                <Link
                    href="/cart"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Cart
                </Link>

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                        {/* ===================== LEFT COLUMN ===================== */}
                        <div className="flex-1 space-y-8">
                            {/* --- Contact --- */}
                            <section>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-bold">Contact</h2>
                                    {/* <Link href="#" className="text-sm text-blue-600 hover:underline">Sign in</Link> */}
                                </div>
                                <div className="space-y-3">
                                    <InputField
                                        label="Email"
                                        value={form.email}
                                        onChange={(v) => updateField("email", v)}
                                        error={errors.email}
                                        type="email"
                                    />

                                </div>
                            </section>

                            {/* --- Delivery --- */}
                            <section>
                                <h2 className="text-xl font-bold mb-4">Delivery</h2>
                                <div className="space-y-3">
                                    {/* Country */}
                                    <div className="relative">
                                        <label className="absolute left-3 top-2 text-[11px] text-muted-foreground">Country/Region</label>
                                        <select
                                            value={form.country}
                                            onChange={(e) => updateField("country", e.target.value)}
                                            className="w-full pt-7 pb-2.5 px-3 bg-background border border-border rounded-lg text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        >
                                            <option>Pakistan</option>
                                            <option>India</option>
                                            <option>UAE</option>
                                            <option>Saudi Arabia</option>
                                            <option>United Kingdom</option>
                                            <option>United States</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                                    </div>

                                    {/* Name Row */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <InputField
                                            label="First name (optional)"
                                            value={form.firstName}
                                            onChange={(v) => updateField("firstName", v)}
                                        />
                                        <InputField
                                            label="Last name"
                                            value={form.lastName}
                                            onChange={(v) => updateField("lastName", v)}
                                        />
                                    </div>

                                    <InputField
                                        label="Address"
                                        value={form.address}
                                        onChange={(v) => updateField("address", v)}
                                        error={errors.address}
                                    />

                                    <div className="grid grid-cols-2 gap-3">
                                        <InputField
                                            label="City"
                                            value={form.city}
                                            onChange={(v) => updateField("city", v)}
                                            error={errors.city}
                                        />
                                        <InputField
                                            label="Postal code (optional)"
                                            value={form.postalCode}
                                            onChange={(v) => updateField("postalCode", v)}
                                        />
                                    </div>

                                    <InputField
                                        label="Phone"
                                        value={form.phone}
                                        onChange={(v) => updateField("phone", v)}
                                        error={errors.phone}
                                        type="tel"
                                    />

                                    {/* <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            checked={form.saveInfo}
                                            onChange={(e) => updateField("saveInfo", e.target.checked)}
                                            className="h-4 w-4 rounded border-border"
                                        />
                                        Save this information for next time
                                    </label> */}
                                </div>
                            </section>

                            {/* --- Shipping Method --- */}
                            {/* <section>
                                <h2 className="text-xl font-bold mb-4">Shipping method</h2>
                                <div className="border border-blue-500 rounded-lg overflow-hidden">
                                    {SHIPPING_OPTIONS.map((option, i) => (
                                        <label
                                            key={option.id}
                                            className={`flex items-center justify-between px-4 py-3.5 cursor-pointer transition-colors ${form.shippingMethod === option.id
                                                ? "bg-blue-50 dark:bg-blue-500/10"
                                                : "bg-background"
                                                } ${i > 0 ? "border-t border-blue-500/30" : ""}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    name="shipping"
                                                    checked={form.shippingMethod === option.id}
                                                    onChange={() => updateField("shippingMethod", option.id)}
                                                    className="h-4 w-4 accent-blue-600"
                                                />
                                                <span className="text-sm">{option.label}</span>
                                            </div>
                                            <span className="text-sm font-bold">
                                                {option.price === 0 ? "FREE" : `Rs ${option.price.toFixed(2)}`}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </section> */}

                            {/* --- Payment --- */}
                            {/* <section>
                                <h2 className="text-xl font-bold mb-1">Payment</h2>
                                <p className="text-sm text-muted-foreground mb-4">All transactions are secure and encrypted.</p>
                                <div className="border border-blue-500 rounded-lg overflow-hidden">
                                    {PAYMENT_OPTIONS.map((option) => (
                                        <div key={option.id}>
                                            <label
                                                className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-colors ${form.paymentMethod === option.id
                                                    ? "bg-blue-50 dark:bg-blue-500/10"
                                                    : "bg-background"
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="payment"
                                                    checked={form.paymentMethod === option.id}
                                                    onChange={() => updateField("paymentMethod", option.id)}
                                                    className="h-4 w-4 accent-blue-600"
                                                />
                                                <span className="text-sm font-medium">{option.label}</span>
                                            </label>
                                            {form.paymentMethod === option.id && option.description && (
                                                <div className="px-4 py-3 bg-secondary/40 border-t border-blue-500/30 text-sm text-center text-muted-foreground">
                                                    {option.description}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section> */}

                            {/* --- Billing Address --- */}
                            {/* <section>
                                <h2 className="text-xl font-bold mb-4">Billing address</h2>
                                <div className="border border-blue-500 rounded-lg overflow-hidden">
                                    {BILLING_OPTIONS.map((option, i) => (
                                        <label
                                            key={option.id}
                                            className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-colors ${form.billingAddress === option.id
                                                ? "bg-blue-50 dark:bg-blue-500/10"
                                                : "bg-background"
                                                } ${i > 0 ? "border-t border-blue-500/30" : ""}`}
                                        >
                                            <input
                                                type="radio"
                                                name="billing"
                                                checked={form.billingAddress === option.id}
                                                onChange={() => updateField("billingAddress", option.id)}
                                                className="h-4 w-4 accent-blue-600"
                                            />
                                            <span className="text-sm">{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </section> */}

                            {/* --- Submit Button --- */}
                            <button
                                type="submit"
                                disabled={createOrder.isPending || cart.length === 0}
                                className="w-full sm:w-auto sm:min-w-[340px] py-4 bg-blue-600 text-white rounded-lg font-bold text-base hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                            >
                                {createOrder.isPending ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    "Complete order"
                                )}
                            </button>

                            {createOrder.isError && (
                                <p className="text-sm text-destructive mt-2">
                                    Something went wrong. Please try again.
                                </p>
                            )}
                        </div>

                        {/* ===================== RIGHT COLUMN — ORDER SUMMARY ===================== */}
                        <div className="lg:w-[400px] lg:shrink-0">
                            <div className="lg:sticky lg:top-24 space-y-6">
                                {/* Cart Items */}
                                <div className="space-y-4">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex items-center gap-4">
                                            <div className="relative h-16 w-16 rounded-lg border border-border bg-secondary/30 shrink-0 overflow-hidden">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="h-full w-full object-cover"
                                                />
                                                <span className="absolute -top-1.5 -right-1.5 h-5 w-5 bg-gray-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                                                    {item.quantity}
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold truncate">{item.name}</p>
                                                <p className="text-xs text-muted-foreground">{item.category}</p>
                                            </div>
                                            <p className="text-sm font-bold shrink-0">
                                                Rs {(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Discount Code */}
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Discount code"
                                        className="flex-1 px-3 py-2.5 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    />
                                    <button
                                        type="button"
                                        className="px-5 py-2.5 border border-border rounded-lg text-sm font-medium bg-secondary/50 hover:bg-secondary transition-colors"
                                    >
                                        Apply
                                    </button>
                                </div>

                                {/* Totals */}
                                <div className="space-y-2 pt-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span className="font-medium">Rs {totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span className="font-medium">Rs {shippingCost.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-baseline pt-3 border-t border-border">
                                        <span className="font-bold text-base">Total</span>
                                        <div className="text-right">
                                            <span className="text-xs text-muted-foreground mr-2">PKR</span>
                                            <span className="text-xl font-bold">Rs {grandTotal.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Empty Cart Warning */}
                                {cart.length === 0 && (
                                    <div className="text-center py-6 text-muted-foreground text-sm">
                                        <p>Your cart is empty.</p>
                                        <Link href="/shop" className="text-blue-600 hover:underline font-medium mt-1 inline-block">
                                            Go to Shop
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}

/* ======================== Reusable Input Component ======================== */

function InputField({
    label,
    value,
    onChange,
    error,
    type = "text",
}: {
    label: string
    value: string
    onChange: (value: string) => void
    error?: string
    type?: string
}) {
    const hasValue = value.length > 0

    return (
        <div>
            <div className="relative">
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder=" "
                    className={`peer w-full pt-6 pb-2 px-3 border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${error ? "border-destructive" : "border-border"
                        }`}
                />
                <label
                    className={`absolute left-3 transition-all pointer-events-none text-muted-foreground ${hasValue
                        ? "top-2 text-[11px]"
                        : "top-1/2 -translate-y-1/2 text-sm peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11px]"
                        }`}
                >
                    {label}
                </label>
            </div>
            {error && <p className="text-xs text-destructive mt-1">{error}</p>}
        </div>
    )
}
