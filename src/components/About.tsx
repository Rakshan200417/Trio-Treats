"use client";

import Image from "next/image";
import { Sparkles, Heart, Leaf } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function About() {
  const cards = [
    {
      icon: Sparkles,
      title: "Fresh to Order",
      desc: "Every order is baked right from scratch after your booking is confirmed, never frozen or pre-stored.",
    },
    {
      icon: Heart,
      title: "Made with Love",
      desc: "Crafted with pure butter, rich cocoa, and premium toppings with genuine patisserie care.",
    },
    {
      icon: Leaf,
      title: "Eggless Options",
      desc: "Delicious, moist eggless cakes and treats made upon request with zero compromise on taste.",
    },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 bg-[#FCEBEF]/40 relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Overlapping Photos popping smoothly from the left */}
          <Reveal direction="left" duration={0.8} className="relative flex justify-center items-center py-6 min-h-[380px]">
            <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-[24px] overflow-hidden shadow-xl -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-500 border-4 border-white bg-white group cursor-pointer">
              <Image
                src="/images/about-baking.jpg"
                alt="Artisan cake preparation"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 640px) 250px, 300px"
              />
            </div>
            <div className="absolute top-8 right-2 sm:right-6 w-52 h-64 sm:w-60 sm:h-76 rounded-[24px] overflow-hidden shadow-2xl rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-500 border-4 border-white bg-white group cursor-pointer">
              <Image
                src="/images/extra-slices.jpg"
                alt="Handcrafted brownies and cakes"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 640px) 200px, 240px"
              />
            </div>
          </Reveal>

          {/* About Copy sliding from the right */}
          <Reveal direction="right" duration={0.8} delay={0.15} className="space-y-6">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#C4666F]">
              Our Story
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#321B14] leading-tight">
              Small Batch Patisserie with a Big Heart.
            </h2>
            <p className="text-[#6B4E45] leading-relaxed text-base sm:text-lg">
              Trio Treats began in a home kitchen in Valaichenai with one simple idea: every celebration deserves something made just for it. Each brownie, cupcake and cake is baked fresh to order, with real ingredients and no shortcuts. Birthday, surprise or just a craving, we bake it with love and serve it with joy.
            </p>
          </Reveal>
        </div>

        {/* 3 Value Cards with staggered spring pop-in */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <Reveal key={i} direction="pop" delay={i * 0.15}>
                <div className="p-8 rounded-[24px] bg-white shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-[#C4666F]/30 transition-all duration-300 border border-[#FCEBEF] space-y-4 group cursor-default">
                  <div className="w-12 h-12 rounded-full bg-[#FCEBEF] group-hover:bg-[#C4666F] group-hover:text-white flex items-center justify-center text-[#C4666F] transition-colors duration-300">
                    <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-[#321B14] group-hover:text-[#C4666F] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#6B4E45] leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
