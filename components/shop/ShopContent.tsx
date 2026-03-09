"use client"
import { useEffect, useState } from "react"
import { Footer } from "../Footer"
import { Navbar } from "../Navbar"
import { ShopProductGrid } from "./ShopProductGrid"
import { ShopSearch } from "./ShopSearch"
import { ShopSidebar } from "./ShopSidebar"
import { useCategories } from "@/hooks/api/useCategories"
import { useProducts } from "@/hooks/api/useProducts"
import { useSearchParams } from "next/navigation"

export default function ShopContent() {
    const searchParams = useSearchParams()

    // UI State
    const [selectedCategoryId, setSelectedCategoryId] = useState("All")
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState("featured")
    const params = useSearchParams();
    const category = params.get("category");

    // Data Fetching
    const { data: categories = [], isLoading: isCategoriesLoading } = useCategories({ category: category! })
    const { data: products = [], isLoading: isProductsLoading } = useProducts({
        categoryId: selectedCategoryId,
        searchQuery,
        sortBy
    })

    // Init from URL parameter
    useEffect(() => {
        const catId = searchParams.get("category")
        if (catId) {
            setSelectedCategoryId(catId)
        }
    }, [searchParams])

    const handleClearFilters = () => {
        setSelectedCategoryId("All")
        setSearchQuery("")
        setSortBy("featured")
    }

    return (

        <main className="min-h-screen bg-background">
            <Navbar />

            <section className="pt-16 pb-20">
                <div className="container px-4 mx-auto">
                    {/* Header line + Search */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                        <div>
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                                Shop <span className="text-gradient italic">Collection</span>
                            </h1>
                            <p className="text-muted-foreground text-lg max-w-xl">
                                Browse our complete catalog of premium decoration items,
                                carefully selected for the modern home.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            <ShopSearch
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                            />
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-4 gap-12">
                        {/* Sidebar */}
                        <ShopSidebar
                            categories={categories}
                            selectedCategoryId={selectedCategoryId}
                            setSelectedCategoryId={setSelectedCategoryId}
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                        />

                        {/* Product Grid */}
                        <div className="lg:col-span-3">
                            <ShopProductGrid
                                products={products}
                                isLoading={isProductsLoading || isCategoriesLoading}
                                clearFilters={handleClearFilters}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}