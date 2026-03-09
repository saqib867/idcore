"use client"

import React from "react"

interface Category {
    id: string
    name: string
}

interface ShopSidebarProps {
    categories: Category[]
    selectedCategoryId: string
    setSelectedCategoryId: (id: string) => void
    sortBy: string
    setSortBy: (sort: string) => void
}

export function ShopSidebar({
    categories,
    selectedCategoryId,
    setSelectedCategoryId,
    sortBy,
    setSortBy,
}: ShopSidebarProps) {
    return (
        <aside className="hidden lg:block space-y-8">
            {/* Categories */}
            <div>
                <h3 className="font-bold mb-4 uppercase text-xs tracking-widest">Categories</h3>
                <div className="flex flex-col gap-2">
                    <button
                        onClick={() => setSelectedCategoryId("All")}
                        className={`text-left px-4 py-2 rounded-lg text-sm transition-all ${selectedCategoryId === "All"
                                ? "bg-primary text-primary-foreground font-bold"
                                : "text-muted-foreground hover:bg-accent"
                            }`}
                    >
                        All
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategoryId(cat.id)}
                            className={`text-left px-4 py-2 rounded-lg text-sm transition-all ${selectedCategoryId === cat.id
                                    ? "bg-primary text-primary-foreground font-bold"
                                    : "text-muted-foreground hover:bg-accent"
                                }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Sort By */}
            <div>
                <h3 className="font-bold mb-4 uppercase text-xs tracking-widest">Sort By</h3>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                </select>
            </div>
        </aside>
    )
}
