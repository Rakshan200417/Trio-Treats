"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import Reveal from "@/components/Reveal";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How do I place an order and how much notice is required?",
    answer:
      "All our treats are baked fresh from scratch to order. We require at least 2 days' notice before your desired pickup date. You can submit your order using the booking form above or message us directly on WhatsApp.",
  },
  {
    question: "Do you offer delivery to my address?",
    answer:
      "Trio Treats is strictly pickup only. You can collect your fresh order from our home kitchen at 2nd Cross, Kannakipuram, Valaichenai. Pickup hours are 9 AM to 9 PM, and the exact time is agreed with the baker after confirmation.",
  },
  {
    question: "How does payment and the 50% advance work?",
    answer:
      "For orders above Rs. 1,000, a 50% advance payment is required after the baker personally confirms your order details. Advance can be paid via bank transfer or cash at the pickup address. The remaining balance is paid on pickup. We never show bank details on the public site.",
  },
  {
    question: "Can I customize the cake design, theme, and message?",
    answer:
      "Yes! You can request custom white chocolate lettering, personal celebration messages, theme colors, and special toppings. Just include your preferences in the booking form description or share photo references with us on WhatsApp.",
  },
  {
    question: "Are eggless cakes and treats available?",
    answer:
      "Yes! We prepare delicious, soft eggless cakes and pastries with zero compromise on taste or texture. Simply tick the 'Make this order Eggless' box in the form.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Cancellations are permitted within 12 hours of submitting your order. Because ingredients are prepared fresh specifically for your order, cancellations after 12 hours may forfeit the advance.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FCE8EC]/25 to-[#FFFDF9]">
      <div className="max-w-4xl mx-auto space-y-12">
        <Reveal direction="down" className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FCE8EC] border border-[#C45B67]/20 text-[#C45B67] text-xs font-semibold uppercase tracking-wider shadow-sm">
            <HelpCircle className="w-3.5 h-3.5" />
            Clear &amp; Transparent
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B1610]">
            Frequently Asked Questions
          </h2>
          <p className="text-[#66463D] max-w-lg mx-auto text-sm sm:text-base">
            Everything you need to know about ordering, customized cakes, advance payments, and pickup in Valaichenai.
          </p>
        </Reveal>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={i} direction="up" delay={i * 0.08}>
                <div
                  className={`rounded-[22px] border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "bg-white border-[#C45B67]/35 shadow-md"
                      : "bg-white/80 border-[#FCE8EC] hover:border-[#C45B67]/25 hover:bg-white"
                  }`}
                >
                  <button
                    onClick={() => toggle(i)}
                    className="w-full py-5 px-6 sm:px-8 flex items-center justify-between text-left focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-heading font-semibold text-lg sm:text-xl text-[#2B1610] pr-4">
                      {faq.question}
                    </span>
                    <span
                      className={`p-2 rounded-full transition-transform duration-300 shrink-0 ${
                        isOpen
                          ? "bg-[#FCE8EC] text-[#C45B67] rotate-180"
                          : "bg-[#FFFDF9] text-[#66463D]"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 sm:px-8 pb-6 pt-1 text-sm sm:text-base text-[#66463D] leading-relaxed animate-fadeIn">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

