"use client"
import AboutUs from "@/components/AboutCom";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";


export default function AboutPage() {
    return (
        <div>
            <Navbar />
            <AboutUs />
            <Footer />
        </div>
    );
}