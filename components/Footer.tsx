"use client"

import React from "react"
import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-secondary/30 border-t border-border pt-20 pb-10">
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tighter">
                            <span className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-xl italic">D</span>
                            <span className="text-gradient">DecorCore</span>
                        </Link>
                        <p className="text-muted-foreground leading-relaxed">
                            Elevating everyday living through curated excellence.
                            Our mission is to bring premium design to every home.
                        </p>
                        <div className="flex items-center gap-4">
                            <button className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                                <Instagram className="h-5 w-5" />
                            </button>
                            <button className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                                <Facebook className="h-5 w-5" />
                            </button>
                            <button className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                                <Twitter className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">Shop All</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Latest Collection</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Our Story</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Sustainability</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6">Customer Care</h4>
                        <ul className="space-y-4 text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">FAQs</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6">Newsletter</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                            Subscribe to get special offers and first look at new arrivals.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="bg-background border border-border rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                                Join
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                    <p>© 2024 DecorCore. All rights reserved.</p>
                    <div className="flex items-center gap-8">
                        <span>Visa</span>
                        <span>Mastercard</span>
                        <span>Stripe</span>
                        <span>Apple Pay</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
