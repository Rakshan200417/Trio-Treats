"use client";

import { useEffect, useState } from "react";

export default function AmbientParticles() {
  const [particles, setParticles] = useState<
    Array<{ id: number; left: number; top: number; size: number; duration: number; delay: number; color: string }>
  >([]);

  useEffect(() => {
    // Generate gentle patisserie sprinkles (rose, cocoa, pistachio, vanilla cream)
    const colors = ["#C4666F", "#4A2A20", "#9BB068", "#FCEBEF", "#D4AF37"];
    const items = Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      left: Math.random() * 98,
      top: Math.random() * 95,
      size: Math.random() * 6 + 4,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 5,
      color: colors[i % colors.length],
    }));
    setParticles(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size * 1.6}px`,
            backgroundColor: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
          className="absolute rounded-full opacity-25 animate-float blur-[0.4px]"
        />
      ))}
    </div>
  );
}

