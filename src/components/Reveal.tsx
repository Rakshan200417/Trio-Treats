"use client";

import { motion, type Variants } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "scale" | "pop";
  delay?: number;
  duration?: number;
  className?: string;
}

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.65,
  className = "",
}: RevealProps) {
  const getVariants = (): Variants => {
    switch (direction) {
      case "left":
        return {
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 },
        };
      case "right":
        return {
          hidden: { opacity: 0, x: 50 },
          visible: { opacity: 1, x: 0 },
        };
      case "down":
        return {
          hidden: { opacity: 0, y: -40 },
          visible: { opacity: 1, y: 0 },
        };
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.88 },
          visible: { opacity: 1, scale: 1 },
        };
      case "pop":
        return {
          hidden: { opacity: 0, scale: 0.8, y: 30 },
          visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
              type: "spring" as const,
              damping: 18,
              stiffness: 140,
              delay,
            },
          },
        };
      case "up":
      default:
        return {
          hidden: { opacity: 0, y: 35 },
          visible: { opacity: 1, y: 0 },
        };
    }
  };

  return (
    <motion.div
      variants={getVariants()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Custom boutique cubic-bezier for smooth pop/glide
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

