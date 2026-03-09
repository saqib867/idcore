import ShopContent from "@/components/shop/ShopContent";
import { Suspense } from "react";




export default function ShopPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary" />
            </div>
        }>
            <ShopContent />
        </Suspense>
    )
}
