"use client";

import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, BookingFormData } from "@/lib/booking-schema";
import { site } from "@/data/site";
import { menu } from "@/data/menu";
import { CheckCircle2, MessageCircle, AlertCircle, Send, Calculator } from "lucide-react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

export default function BookingForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<BookingFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [minDateString, setMinDateString] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    const minDateObj = new Date(today);
    minDateObj.setDate(minDateObj.getDate() + site.rules.noticeDays);
    setMinDateString(minDateObj.toISOString().split("T")[0]);
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      whatsapp: "",
      callNumber: "",
      email: "",
      variety: "Vanilla Cake",
      itemsCount: 1,
      customerBudget: "",
      sizeWeight: "",
      pickupDate: "",
      preferredTime: "",
      eggless: false,
      description: "",
      honeypot: "",
    },
  });

  const selectedVariety = watch("variety");
  const selectedCount = watch("itemsCount") || 1;

  // Options for Cake Variety dropdown without prices and without ×6 quantities
  const varietyOptions = [
    { label: "Vanilla Cake", value: "Vanilla Cake" },
    { label: "Chocolate Cake", value: "Chocolate Cake" },
    { label: "Cupcakes", value: "Cupcakes" },
    { label: "Brownies", value: "Brownies" },
    { label: "Blondies", value: "Blondies" },
    { label: "Brownie Cake", value: "Brownie Cake" },
    { label: "Custom order / other", value: "Custom order / other" },
  ];

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      // 1. Try sending directly from frontend via EmailJS if configured
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

      if (serviceId && templateId && publicKey) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            to_email: "sulakshayohenran@icloud.com",
            customer_name: data.name,
            customer_whatsapp: data.whatsapp,
            customer_call: data.callNumber || "Same as WhatsApp",
            customer_email: data.email,
            cake_variety: data.variety,
            items_count: data.itemsCount || 1,
            customer_budget: data.customerBudget || "Not specified",
            size_weight: data.sizeWeight || "Not specified",
            pickup_date: data.pickupDate,
            preferred_time: data.preferredTime || "Flexible (9 AM - 9 PM)",
            eggless: data.eggless ? "Yes (Eggless)" : "Standard recipe",
            notes: data.description || "No special message",
          },
          publicKey
        );
      } else {
        // Fallback to internal API route if EmailJS keys not yet provided
        const res = await fetch("/api/booking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const json = await res.json();
        if (!res.ok) {
          throw new Error(json.error || "Submission failed");
        }
      }

      // Celebratory patisserie confetti burst!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ["#C45B67", "#FCE8EC", "#E6B86A", "#8FA657", "#2B1610"],
      });

      setSuccessData(data);
      reset();
    } catch (err: any) {
      console.error("Booking error:", err);
      const detail = err?.text || err?.message || JSON.stringify(err);
      setServerError(detail || "An error occurred. Please try again or reach out on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateWhatsAppOrderLink = (data: BookingFormData) => {
    const text = `Hi Trio Treats! I would like to book an order:%0A• Name: ${data.name}%0A• Treat: ${data.variety}%0A• Items: ${data.itemsCount || 1}${data.customerBudget ? `%0A• My Budget: ${data.customerBudget}` : ""}%0A• Pickup Date: ${data.pickupDate}%0A• Eggless: ${data.eggless ? "Yes" : "No"}${data.sizeWeight ? `%0A• Size/Weight: ${data.sizeWeight}` : ""}${data.description ? `%0A• Notes: ${data.description}` : ""}`;
    return `https://wa.me/${site.whatsapp}?text=${text}`;
  };

  return (
    <section id="booking" className="py-24 px-4 sm:px-6 relative overflow-hidden bg-[#FFF8F3]">
      {/* Artisan Background Image (clearly visible chocolate blocks, cocoa dusting, vanilla beans & flowers) */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-95"
        style={{ backgroundImage: `url('/images/booking-artisan-bg.jpg')` }}
      />
      {/* Subtle radial vignette only behind the center text for readability without hiding the perimeter art */}
      <div className="absolute inset-0 z-0 bg-radial-gradient from-white/70 via-white/30 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 110,
            duration: 0.75,
          }}
          className="text-center space-y-3"
        >
          <span className="text-xs font-bold tracking-widest uppercase text-[#C45B67]">
            Book with us
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B1610]">
            Order Your Custom Celebration Cake
          </h2>
          <p className="text-[#66463D] max-w-lg mx-auto text-base sm:text-lg">
            Fill in your preferences below. We will contact you via WhatsApp or phone call to finalize your cake design and arrange pickup.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            type: "spring",
            damping: 22,
            stiffness: 100,
            duration: 0.85,
            delay: 0.15,
          }}
          className="bg-white rounded-[32px] p-8 sm:p-12 shadow-2xl border border-[#FCE8EC]"
        >
          {successData ? (
            /* Celebratory Success State */
            <div className="py-12 text-center space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#8FA657]/20 text-[#276337] mx-auto flex items-center justify-center shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#2B1610]">
                  Thank you, {successData.name}! 🎉
                </h3>
                <p className="text-[#66463D] max-w-md mx-auto text-base">
                  We received your booking request for <strong className="text-[#2B1610]">{successData.variety}</strong> on <strong className="text-[#2B1610]">{successData.pickupDate}</strong>.
                </p>
                <p className="text-sm text-[#66463D]">
                  We will reach out to your WhatsApp ({successData.whatsapp}) to confirm your booking and details shortly.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={generateWhatsAppOrderLink(successData)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#276337] hover:bg-[#1f502c] text-white font-medium shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Also message on WhatsApp</span>
                </a>
                <button
                  onClick={() => setSuccessData(null)}
                  className="px-7 py-3.5 rounded-full border border-[#66463D]/30 hover:border-[#2B1610] text-[#2B1610] text-sm font-medium transition-colors"
                >
                  Place another booking
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} autoComplete="off" />

              {serverError && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <p>{serverError}</p>
                    <a
                      href={`https://wa.me/${site.whatsapp}?text=Hi%20Trio%20Treats,%20I'd%20like%20to%20order`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline font-semibold mt-1 inline-block text-xs"
                    >
                      Click here to message on WhatsApp directly →
                    </a>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* 1. Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#2B1610]">
                    Name *
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    placeholder="Your Full Name"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#FFFDF9] border border-[#FCE8EC] text-[#2B1610] placeholder:text-[#66463D]/50 focus:outline-none focus:ring-2 focus:ring-[#C45B67] focus:border-transparent text-sm font-medium transition-all shadow-sm"
                  />
                  {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                </div>

                {/* 2. WhatsApp Number */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#2B1610]">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    {...register("whatsapp")}
                    placeholder="+94 7X XXX XXXX"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#FFFDF9] border border-[#FCE8EC] text-[#2B1610] placeholder:text-[#66463D]/50 focus:outline-none focus:ring-2 focus:ring-[#C45B67] focus:border-transparent text-sm font-medium transition-all shadow-sm"
                  />
                  {errors.whatsapp && <p className="text-xs text-red-500">{errors.whatsapp.message}</p>}
                </div>

                {/* 3. Call Number */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#2B1610]">
                    Call Number <span className="text-[11px] font-normal lowercase text-[#66463D]">(optional / if different)</span>
                  </label>
                  <input
                    type="tel"
                    {...register("callNumber")}
                    placeholder="Phone number for voice call"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#FFFDF9] border border-[#FCE8EC] text-[#2B1610] placeholder:text-[#66463D]/50 focus:outline-none focus:ring-2 focus:ring-[#C45B67] focus:border-transparent text-sm font-medium transition-all shadow-sm"
                  />
                </div>

                {/* 4. Email */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#2B1610]">
                    Email *
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#FFFDF9] border border-[#FCE8EC] text-[#2B1610] placeholder:text-[#66463D]/50 focus:outline-none focus:ring-2 focus:ring-[#C45B67] focus:border-transparent text-sm font-medium transition-all shadow-sm"
                  />
                  {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                </div>

                {/* 5. Cake Variety (without prices and without ×6) */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#2B1610]">
                    Cake Variety *
                  </label>
                  <select
                    id="variety-select"
                    {...register("variety")}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#FFFDF9] border border-[#FCE8EC] text-[#2B1610] focus:outline-none focus:ring-2 focus:ring-[#C45B67] focus:border-transparent text-sm font-semibold transition-all shadow-sm"
                  >
                    {varietyOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors.variety && <p className="text-xs text-red-500">{errors.variety.message}</p>}
                </div>

                {/* 6. Number of items */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#2B1610]">
                    Number of items <span className="text-[11px] font-normal lowercase text-[#66463D]">(optional)</span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    {...register("itemsCount", { valueAsNumber: true })}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#FFFDF9] border border-[#FCE8EC] text-[#2B1610] focus:outline-none focus:ring-2 focus:ring-[#C45B67] focus:border-transparent text-sm font-medium transition-all shadow-sm"
                  />
                </div>

                {/* 7. Customer Budget */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#2B1610]">
                    Your Budget <span className="text-[11px] font-normal lowercase text-[#66463D]">(optional / for discussion)</span>
                  </label>
                  <input
                    type="text"
                    {...register("customerBudget")}
                    placeholder="e.g. Rs. 2,000 – 3,500"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#FFFDF9] border border-[#FCE8EC] text-[#2B1610] placeholder:text-[#66463D]/50 focus:outline-none focus:ring-2 focus:ring-[#C45B67] focus:border-transparent text-sm font-medium transition-all shadow-sm"
                  />
                </div>

                {/* 8. Size or weight */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#2B1610]">
                    Size or weight <span className="text-[11px] font-normal lowercase text-[#66463D]">(optional)</span>
                  </label>
                  <input
                    type="text"
                    {...register("sizeWeight")}
                    placeholder="e.g. 1 kg, serves 10, or 2 boxes"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#FFFDF9] border border-[#FCE8EC] text-[#2B1610] placeholder:text-[#66463D]/50 focus:outline-none focus:ring-2 focus:ring-[#C45B67] focus:border-transparent text-sm font-medium transition-all shadow-sm"
                  />
                </div>

                {/* 9. Pickup Date */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#2B1610]">
                    Pickup Date * <span className="text-[11px] font-normal lowercase text-[#66463D]">(at least 2 days notice)</span>
                  </label>
                  <input
                    type="date"
                    min={minDateString}
                    {...register("pickupDate")}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#FFFDF9] border border-[#FCE8EC] text-[#2B1610] focus:outline-none focus:ring-2 focus:ring-[#C45B67] focus:border-transparent text-sm font-semibold transition-all shadow-sm"
                  />
                  {errors.pickupDate && <p className="text-xs text-red-500">{errors.pickupDate.message}</p>}
                </div>

                {/* 10. Preferred Time */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#2B1610]">
                    Preferred Time <span className="text-[11px] font-normal lowercase text-[#66463D]">(optional / 09:00 to 21:00)</span>
                  </label>
                  <input
                    type="time"
                    min="09:00"
                    max="21:00"
                    {...register("preferredTime")}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#FFFDF9] border border-[#FCE8EC] text-[#2B1610] focus:outline-none focus:ring-2 focus:ring-[#C45B67] focus:border-transparent text-sm font-medium transition-all shadow-sm"
                  />
                </div>

                {/* 11. Eggless Checkbox */}
                <div className="flex items-center gap-3 pt-6 sm:col-span-2">
                  <input
                    type="checkbox"
                    id="eggless-box"
                    {...register("eggless")}
                    className="w-5 h-5 rounded border-[#C45B67]/40 text-[#C45B67] focus:ring-[#C45B67] cursor-pointer"
                  />
                  <label htmlFor="eggless-box" className="text-sm font-semibold text-[#2B1610] cursor-pointer select-none">
                    Make this order <strong className="text-[#C45B67]">Eggless</strong> (Zero eggs, pure indulgence)
                  </label>
                </div>

                {/* 12. Description / Custom notes */}
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#2B1610]">
                    Description &amp; Custom Message <span className="text-[11px] font-normal lowercase text-[#66463D]">(optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    {...register("description")}
                    placeholder="Message written on cake, theme colors, allergen details, or special requests..."
                    className="w-full px-4 py-3.5 rounded-xl bg-[#FFFDF9] border border-[#FCE8EC] text-[#2B1610] placeholder:text-[#66463D]/50 focus:outline-none focus:ring-2 focus:ring-[#C45B67] focus:border-transparent text-sm font-medium transition-all shadow-sm"
                  />
                </div>
              </div>

              {/* Advance and Pickup Notice Card */}
              <div className="p-4 rounded-2xl bg-[#FCE8EC]/60 border border-[#C45B67]/20 text-xs text-[#66463D] leading-relaxed">
                Orders above Rs. 1,000 need a <strong className="text-[#2B1610]">50% advance</strong> after we confirm (bank transfer or cash at pickup). Pickup only, 9 AM to 9 PM at 2nd Cross, Kannakipuram, Valaichenai.
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full bg-[#2B1610] hover:bg-[#43231a] text-white font-semibold text-base shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Sending Booking...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Booking Request</span>
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
