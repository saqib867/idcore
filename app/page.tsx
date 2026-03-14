import { Navbar } from "@/components/Navbar";

import { CategorySection } from "@/components/CategorySection";
import { ProductSection } from "@/components/ProductSection";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Suspense } from "react";
import FeatureBar from "@/components/MidComponent";



export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <div>
        <FeatureBar />
      </div>
      <Suspense fallback={null}>
        <CategorySection />
      </Suspense>



      <ProductSection />
      <Footer />
    </main>
  );
}
