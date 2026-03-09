"use client"

import React, { useState, useEffect } from "react"
import { Search } from "lucide-react"

interface ShopSearchProps {
    searchQuery: string
    setSearchQuery: (query: string) => void
}

export function ShopSearch({ searchQuery, setSearchQuery }: ShopSearchProps) {
    const [localQuery, setLocalQuery] = useState(searchQuery)

    // Sync external prop if it changes outside (e.g. clear filters)
    useEffect(() => {
        setLocalQuery(searchQuery)
    }, [searchQuery])

    // Debounce the actual query update to the parent
    useEffect(() => {
        const timer = setTimeout(() => {
            if (localQuery !== searchQuery) {
                setSearchQuery(localQuery)
            }
        }, 500) // 500ms debounce

        return () => clearTimeout(timer)
    }, [localQuery, setSearchQuery, searchQuery])

    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
                type="text"
                placeholder="Search products..."
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-secondary/50 border border-border rounded-xl text-sm w-full md:w-64 focus:outline-none focus:ring-1 focus:ring-primary"
            />
        </div>
    )
}
