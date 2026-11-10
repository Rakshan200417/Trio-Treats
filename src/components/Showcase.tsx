"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { menu } from "@/data/menu";
import { Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function Showcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const accumulatedDeltaRef = useRef<number>(0);
  const lastStepTimeRef = useRef<number>(0);

  // Big deliberate scroll requirement per cake:
  // Requires user to scroll a substantial delta threshold (~450px) before switching to the next cake
  useEffect(() => {
    const threshold = 450; // Threshold of accumulated scroll needed for one cake switch
    const stepCooldown = 500; // Minimum delay between steps in ms

    const handleWheel = (e: WheelEvent) => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const inView = rect.top <= 80 && rect.bottom >= window.innerHeight * 0.7;

      if (!inView) {
        accumulatedDeltaRef.current = 0;
        return;
      }

      // If at the beginning and scrolling up, allow natural scroll back to Hero
      if (e.deltaY < 0 && activeIndex === 0) {
        accumulatedDeltaRef.current = 0;
        return;
      }

      // If at the end and scrolling down, allow natural scroll down to About
      if (e.deltaY > 0 && activeIndex === menu.length - 1) {
        accumulatedDeltaRef.current = 0;
        return;
      }

      // Block rapid page scroll and accumulate distance
      e.preventDefault();

      const now = Date.now();
      if (now - lastStepTimeRef.current < stepCooldown) {
        return;
      }

      accumulatedDeltaRef.current += e.deltaY;

      if (accumulatedDeltaRef.current >= threshold) {
        // Move to NEXT cake
        setActiveIndex((prev) => Math.min(prev + 1, menu.length - 1));
        accumulatedDeltaRef.current = 0;
        lastStepTimeRef.current = now;
      } else if (accumulatedDeltaRef.current <= -threshold) {
        // Move to PREVIOUS cake
        setActiveIndex((prev) => Math.max(prev - 1, 0));
        accumulatedDeltaRef.current = 0;
        lastStepTimeRef.current = now;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeIndex]);

  const activeItem = menu[activeIndex];

  const handleSelectTreat = (itemName: string) => {
    const bookingSection = document.getElementById("booking");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
      const selectElement = document.getElementById("variety-select") as HTMLSelectElement | null;
      if (selectElement) {
        selectElement.value = itemName;
        selectElement.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }
  };

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-4 sm:px-6 flex flex-col justify-center overflow-hidden bg-gradient-to-b from-[#FFFBF7] via-[#FCEBEF]/35 to-[#FFFBF7] transition-all duration-700 select-none"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.65 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          type: "spring",
          damping: 22,
          stiffness: 90,
          duration: 0.85,
        }}
        className="max-w-6xl mx-auto w-full space-y-12"
      >
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FCEBEF] border border-[#C4666F]/20 text-[#C4666F] text-xs font-semibold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C4666F]" />
            Deliberate Scroll Showcase
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#321B14]">
            Explore Our Treats
          </h2>
          <p className="text-[#6B4E45] max-w-xl mx-auto text-sm sm:text-base">
            Each deep scroll step transitions to the next treat one-by-one along the half-circle orbit. Once you reach the end, scroll smoothly continues to our story.
          </p>
        </div>

        {/* Half-Circle Orbit Carousel on Left + Detail Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[520px]">
          {/* Left Column: Half-Circle Orbit Track */}
          <div className="lg:col-span-6 relative h-[440px] sm:h-[500px] flex items-center justify-center">
            {/* Dashed Half-Circle Orbit Guide */}
            <div className="absolute left-8 sm:left-14 top-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-full border-2 border-dashed border-[#C4666F]/25 pointer-events-none" />

            {/* Orbiting Cakes positioned on the half-circle */}
            {menu.map((item, idx) => {
              const diff = idx - activeIndex;
              const angleDeg = diff * 45;
              const angleRad = (angleDeg * Math.PI) / 180;
              const radius = 185;

              const x = Math.cos(angleRad) * radius + 45;
              const y = Math.sin(angleRad) * radius;

              const isCurrent = idx === activeIndex;
              const isNearby = Math.abs(diff) <= 2;

              if (!isNearby) return null;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  style={{
                    transform: `translate(${x}px, ${y}px) scale(${isCurrent ? 1.32 : 0.82})`,
                    zIndex: isCurrent ? 30 : 20 - Math.abs(diff),
                    opacity: isCurrent ? 1 : Math.max(0.3, 1 - Math.abs(diff) * 0.35),
                  }}
                  className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out focus:outline-none group cursor-pointer"
                  aria-label={`View ${item.name}`}
                >
                  <div
                    className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-xl transition-all duration-500 ${
                      isCurrent
                        ? "border-4 border-[#C4666F] ring-4 ring-[#C4666F]/25 shadow-2xl scale-105"
                        : "border-2 border-white hover:border-[#C4666F]/50"
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="128px"
                      priority={isCurrent}
                    />
                  </div>

                  {isCurrent && (
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-bold px-3 py-0.5 rounded-full bg-[#321B14] text-white shadow-md">
                      {idx + 1} of {menu.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Cake Details Card */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div
              key={activeItem.id}
              className="p-8 sm:p-12 rounded-[32px] bg-white shadow-xl border border-[#FCEBEF] space-y-6 transition-all duration-500 animate-fadeIn"
            >
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9BB068]/20 text-[#2F5D3A] text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  Eggless Available
                </div>
                <h3 className="font-heading text-3xl sm:text-4xl font-bold text-[#321B14]">
                  {activeItem.name}
                </h3>
                <p className="text-2xl font-bold text-[#C4666F]">
                  {activeItem.priceLabel}
                </p>
              </div>

              <p className="text-[#6B4E45] text-base sm:text-lg leading-relaxed">
                {activeItem.description}
              </p>

              {activeItem.variants && (
                <div className="space-y-2 text-xs text-[#6B4E45]">
                  <p className="font-semibold text-[#321B14] uppercase tracking-wider text-[11px]">
                    Available Options &amp; Flavours:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {activeItem.variants.map((v, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-xl bg-[#FCEBEF] text-[#321B14] font-medium border border-[#C4666F]/15"
                      >
                        {v.label} · Rs. {v.price}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <button
                  onClick={() => handleSelectTreat(activeItem.name)}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#321B14] hover:bg-[#4a281e] text-white font-medium shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  Book this treat
                </button>

                {/* Arrow navigation buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveIndex((prev) => Math.max(prev - 1, 0))}
                    disabled={activeIndex === 0}
                    className="p-3 rounded-full border border-[#FCEBEF] bg-[#FFFBF7] hover:bg-[#FCEBEF] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    aria-label="Previous treat"
                  >
                    <ArrowLeft className="w-4 h-4 text-[#321B14]" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveIndex((prev) => Math.min(prev + 1, menu.length - 1))
                    }
                    disabled={activeIndex === menu.length - 1}
                    className="p-3 rounded-full border border-[#FCEBEF] bg-[#FFFBF7] hover:bg-[#FCEBEF] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    aria-label="Next treat"
                  >
                    <ArrowRight className="w-4 h-4 text-[#321B14]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Pagination indicators */}
            <div className="flex items-center justify-center gap-2.5 mt-6">
              {menu.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    i === activeIndex
                      ? "w-8 bg-[#C4666F]"
                      : "w-2.5 bg-[#C4666F]/25 hover:bg-[#C4666F]/50"
                  }`}
                  aria-label={`Select item ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
