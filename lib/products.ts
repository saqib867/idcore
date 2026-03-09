export interface Product {
    id: string
    name: string
    price: number
    category: string
    image: string
    description: string
    isNew?: boolean
    features?: string[]
}

export const PRODUCTS: Product[] = [
    {
        id: "1",
        name: "Artisan Ceramic Lamp",
        price: 189.00,
        category: "Lamps",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800",
        description: "Handcrafted ceramic lamp with a unique texture. Perfect for bedside or living room side tables.",
        isNew: true,
        features: ["Handcrafted", "Textured Ceramic", "Warm LED Included"]
    },
    {
        id: "2",
        name: "Brass Side Table Light",
        price: 124.00,
        category: "Side Table Lights",
        image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=800",
        description: "Elegant brass light designed specifically for compact side tables. Provides a focused glow for reading.",
        features: ["Solid Brass", "Compact Design", "Adjustable Neck"]
    },
    {
        id: "3",
        name: "Nordic Pendant Light",
        price: 156.00,
        category: "Ceiling Lights",
        image: "https://images.unsplash.com/photo-1543013309-0d1f4edeb868?auto=format&fit=crop&q=80&w=800",
        description: "Scandinavian inspired ceiling light. Minimalist design that fits perfectly in modern dining rooms.",
        isNew: true,
        features: ["Natural Wood", "Minimalist Style", "Dimmable"]
    },
    {
        id: "4",
        name: "Industrial Wall Sconce",
        price: 85.00,
        category: "Wall Lights",
        image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&q=80&w=800",
        description: "Tough industrial wall light with exposed bulb design. Adds character to corridors and bedrooms.",
        features: ["Industrial Iron", "Exposed Bulb", "Easy Installation"]
    },
    {
        id: "5",
        name: "Modern Floor Lamp",
        price: 245.00,
        category: "Floor Lamps",
        image: "https://images.unsplash.com/photo-1513506491745-c4591993a778?auto=format&fit=crop&q=80&w=800",
        description: "Statuesque floor lamp with a slim profile and powerful illumination. Great for lighting up dark corners.",
        features: ["Slim Steel Frame", "Foot Switch", "360 Degree Light"]
    },
    {
        id: "6",
        name: "Crystal Desk Lamp",
        price: 195.00,
        category: "Lamps",
        image: "https://images.unsplash.com/photo-1513506491745-c4591993a778?auto=format&fit=crop&q=80&w=800",
        description: "A luxury desk lamp with crystal accents that refract light beautifully across your workspace.",
        features: ["Crystal Glass", "Chrome Base", "LED Compatibility"]
    },
    {
        id: "7",
        name: "Neon Smart Light",
        price: 145.00,
        category: "Smart Lights",
        image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=800",
        description: "App-controlled smart light with millions of colors. Sets the perfect mood for any occasion.",
        features: ["App Control", "RGB Colors", "Voice Activation"]
    }
]
