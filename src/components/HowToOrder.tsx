import { site } from "@/data/site";
import { Send, PhoneCall, Gift, AlertCircle } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function HowToOrder() {
  const steps = [
    {
      num: "01",
      icon: Send,
      title: "Send Your Booking",
      desc: `Choose your favourite cake or treats, select your pickup date (at least ${site.rules.noticeDays} days ahead), and submit your request.`,
    },
    {
      num: "02",
      icon: PhoneCall,
      title: "We Confirm on WhatsApp or Call",
      desc: "The baker confirms your booking details directly, provides exact guidance, and arranges 50% advance for orders above Rs. 1,000.",
    },
    {
      num: "03",
      icon: Gift,
      title: "Pick Up and Enjoy",
      desc: "Collect your fresh, beautifully boxed treats from our home bakery in Valaichenai between 9 AM and 9 PM on your date.",
    },
  ];

  return (
    <section id="how-to-order" className="py-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-16">
        <Reveal direction="down" className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#C4666F]">
            Simple &amp; Personal
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#321B14]">
            How to Order in 3 Simple Steps
          </h2>
          <p className="text-[#6B4E45]">
            Booking is quick, convenient, and personal. We take care of every detail so your celebration is sweet and worry-free.
          </p>
        </Reveal>

        {/* 3 Step Cards popping in with spring stagger */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal key={i} direction="pop" delay={i * 0.18}>
                <div className="relative p-8 rounded-[24px] bg-white border border-[#FFE1E6]/70 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-[#C4666F]/40 transition-all duration-300 space-y-4 group">
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-4xl font-bold text-[#C4666F]/25 group-hover:text-[#C4666F]/60 transition-colors">
                      {step.num}
                    </span>
                    <div className="w-11 h-11 rounded-full bg-[#FFE1E6] group-hover:bg-[#C4666F] group-hover:text-white flex items-center justify-center text-[#C4666F] transition-all duration-300">
                      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-[#321B14] group-hover:text-[#C4666F] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#6B4E45] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Rules Chips sliding from bottom */}
        <Reveal direction="up" delay={0.3}>
          <div className="p-6 rounded-[24px] bg-[#FFE1E6]/40 border border-[#C4666F]/20 flex flex-wrap items-center justify-around gap-4 text-xs font-medium text-[#6B4E45] shadow-sm">
            <div className="flex items-center gap-2 hover:text-[#321B14] transition-colors">
              <AlertCircle className="w-4 h-4 text-[#C4666F]" />
              <span>Pickup only · No delivery service</span>
            </div>
            <div className="flex items-center gap-2 hover:text-[#321B14] transition-colors">
              <AlertCircle className="w-4 h-4 text-[#C4666F]" />
              <span>50% advance for orders above Rs. 1,000</span>
            </div>
            <div className="flex items-center gap-2 hover:text-[#321B14] transition-colors">
              <AlertCircle className="w-4 h-4 text-[#C4666F]" />
              <span>Cancellations permitted within 12 hours</span>
            </div>
            <div className="flex items-center gap-2 hover:text-[#321B14] transition-colors">
              <AlertCircle className="w-4 h-4 text-[#C4666F]" />
              <span>Pickup hours: 9 AM to 9 PM</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
