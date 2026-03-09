"use client"

import * as React from "react"
import Link from "next/link"
import { Search, ShoppingCart, User, Menu } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import { motion } from "framer-motion"
import { useCart } from "@/context/CartContext"
import { CartDrawer } from "./CartDrawer"

const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Collection", href: "#collection" },
    { name: "About", href: "#about" },
]

export function Navbar() {
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [isCartOpen, setIsCartOpen] = React.useState(false)
    const { totalItems } = useCart()

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
                    ? "bg-white/80 dark:bg-neutral-950/80 backdrop-blur-lg border-b border-neutral-100 dark:border-neutral-800 shadow-sm"
                    : "bg-neutral-50 dark:bg-neutral-950 border-b border-transparent"
                    }`}
            >
                <nav className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tighter">
                            <span className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-lg italic">D</span>
                            <span className="text-gradient">DecorCore</span>
                        </Link>

                        <div className="hidden md:flex items-center gap-6">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-3">
                            <button className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-accent transition-colors">
                                <Search className="h-4 w-4" />
                            </button>
                            <button className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-accent transition-colors">
                                <User className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative h-9 w-9 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-all premium-shadow"
                            >
                                <ShoppingCart className="h-4 w-4" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center rounded-full ring-2 ring-background">
                                        {totalItems}
                                    </span>
                                )}
                            </button>
                        </div>
                        <div className="h-6 w-px bg-border mx-1" />
                        <ModeToggle />
                        <button className="md:hidden h-9 w-9 flex items-center justify-center rounded-full hover:bg-accent">
                            <Menu className="h-5 w-5" />
                        </button>
                    </div>
                </nav>
            </motion.header>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    )
}
