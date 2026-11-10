"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { site } from "@/data/site";
import { Sparkles, Calendar, HeartHandshake, Compass } from "lucide-react";
import Reveal from "@/components/Reveal";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
});

export default function Hero() {
  const quickLinks = [
    { label: "Our Treats", href: "#showcase" },
    { label: "Our Story", href: "#about" },
    { label: "How to Order", href: "#how-to-order" },
    { label: "Visit & Pickup", href: "#visit" },
  ];

  return (
    <section className="relative min-h-[96vh] flex items-center pt-28 pb-16 px-4 sm:px-6 overflow-hidden">
      {/* Background warm blush ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#FCE8EC]/90 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Column: Copy & Actions with Spring Entrance */}
        <Reveal direction="left" duration={0.8} className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FCE8EC] border border-[#C45B67]/25 text-[#C45B67] text-xs font-semibold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C45B67]" />
            Home bakery · Valaichenai
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-[#2B1610]">
            Baked with{" "}
            <span className="font-script text-5xl sm:text-6xl lg:text-7xl text-[#C45B67] inline-block -rotate-2">
              love
            </span>
            , <br />
            Served with Joy.
          </h1>

          <p className="max-w-lg text-[#66463D] text-lg leading-relaxed">
            Freshly crafted artisan celebration cakes, fudgy chocolate brownies, and gourmet cupcakes baked just for your special celebrations in Valaichenai.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
            <Link
              href="#booking"
              className="px-8 py-3.5 rounded-full bg-[#2B1610] hover:bg-[#43231a] text-white font-medium text-center shadow-md transition-all hover:scale-105 active:scale-95"
            >
              Book your cake
            </Link>
            <Link
              href="#showcase"
              className="px-8 py-3.5 rounded-full border border-[#66463D]/30 hover:border-[#2B1610] text-[#2B1610] font-medium text-center transition-all hover:bg-black/[0.02]"
            >
              See our treats
            </Link>
          </div>

          {/* In-Hero Section Navigation Pills */}
          <div className="pt-2 w-full">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-2.5 text-xs font-semibold uppercase tracking-wider text-[#C45B67]">
              <Compass className="w-3.5 h-3.5" />
              <span>Explore sections</span>
            </div>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              {quickLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-4 py-2 rounded-full bg-white/90 hover:bg-white text-xs font-medium text-[#2B1610] border border-[#FCE8EC] shadow-sm hover:shadow hover:-translate-y-0.5 transition-all"
                >
                  {item.label} →
                </Link>
              ))}
            </div>
          </div>

          {/* Guarantee Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-medium text-[#66463D]">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8FA657]" />
              Pickup only
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#C45B67]" />
              {site.rules.noticeDays} days&apos; notice
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5">
              <HeartHandshake className="w-3.5 h-3.5 text-[#C45B67]" />
              Eggless available
            </span>
          </div>
        </Reveal>

        {/* Right Column: Seamless 3D Cake with Floating Controls & Sparkles */}
        <Reveal direction="scale" duration={0.9} delay={0.2} className="relative w-full h-full min-h-[460px] lg:min-h-[580px] flex items-center justify-center">
          <HeroScene />
        </Reveal>
      </div>
    </section>
  );
}
