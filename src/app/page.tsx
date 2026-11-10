"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ChocolateMeltDivider from "@/components/ChocolateMeltDivider";
import Showcase from "@/components/Showcase";
import About from "@/components/About";
import HowToOrder from "@/components/HowToOrder";
import BookingForm from "@/components/BookingForm";
import FAQ from "@/components/FAQ";
import Visit from "@/components/Visit";
import WhatsAppButton from "@/components/WhatsAppButton";
import AmbientParticles from "@/components/AmbientParticles";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative selection:bg-[#FFE1E6] selection:text-[#3A1F17]">
      {/* Full-screen ambient patisserie sprinkle particle drifts */}
      <AmbientParticles />

      {/* Permanently sticky glass navbar */}
      <Navbar />

      {/* Main page content sections */}
      <main className="flex-1 relative z-10">
        <Hero />
        <ChocolateMeltDivider />
        <Showcase />
        <About />
        <HowToOrder />
        <BookingForm />
        <FAQ />
        <Visit />
      </main>

      {/* Always-on floating WhatsApp button with ambient wave rings */}
      <WhatsAppButton />
    </div>
  );
}
