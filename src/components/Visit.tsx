import { site } from "@/data/site";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, MessageCircle, Clock, ExternalLink, Heart } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function Visit() {
  const currentYear = 2026;
  const waChatUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    "Hi Trio Treats, I'd like to get directions or ask a question!"
  )}`;

  return (
    <section id="visit" className="pt-24 pb-12 px-4 sm:px-6 relative bg-[#FFE1E6]/20 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-16">
        <Reveal direction="down" className="text-center space-y-3">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#C4666F]">
            Valaichenai Home Kitchen
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#321B14]">
            Visit Us for Pickup
          </h2>
          <p className="text-[#6B4E45] max-w-xl mx-auto">
            All orders are freshly prepared for in-person pickup. We look forward to meeting you!
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* Left: Pickup Photo sliding from left */}
          <Reveal direction="left" duration={0.8} className="relative rounded-[28px] overflow-hidden shadow-lg border-4 border-white min-h-[300px]">
            <Image
              src="/images/pickup.jpg"
              alt="Trio Treats Pickup Location in Valaichenai"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 500px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="text-xs uppercase font-semibold tracking-wider text-[#FFE1E6]">
                Convenient Local Pickup
              </span>
              <p className="font-heading text-xl font-bold">2nd Cross, Kannakipuram</p>
              <p className="text-sm text-white/80">Valaichenai, Eastern Province, Sri Lanka</p>
            </div>
          </Reveal>

          {/* Right: Address & Direct Contact Cards sliding from right */}
          <div className="space-y-6 flex flex-col justify-between">
            <Reveal direction="right" delay={0.1}>
              <div className="p-8 rounded-[24px] bg-white shadow-sm border border-[#FFE1E6]/60 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#FFE1E6] flex items-center justify-center text-[#C4666F] shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-heading text-xl font-bold text-[#321B14]">
                      Pickup Address
                    </h3>
                    <p className="text-[#6B4E45] text-sm">
                      {site.address}
                    </p>
                  </div>
                </div>
                <a
                  href={site.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFE1E6] hover:bg-[#ffd1da] text-[#321B14] text-xs font-semibold tracking-wide transition-colors"
                >
                  <span>Get directions on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.25}>
              <div className="p-8 rounded-[24px] bg-white shadow-sm border border-[#FFE1E6]/60 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#9BB068]/20 flex items-center justify-center text-[#2F5D3A] shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-bold text-[#321B14]">
                      Pickup Hours
                    </h4>
                    <p className="text-sm text-[#6B4E45]">
                      {site.hours.label} (Exact pickup time agreed via WhatsApp/call)
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <a
                    href={waChatUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#2F5D3A] hover:bg-[#254b2e] text-white text-sm font-medium transition-colors shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Chat</span>
                  </a>
                  <a
                    href={`tel:${site.phoneTel}`}
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-[#6B4E45]/30 hover:border-[#321B14] text-[#321B14] text-sm font-medium transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#C4666F]" />
                    <span>{site.phoneDisplay}</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Integrated Footer content */}
        <Reveal direction="up" delay={0.2}>
          <div className="pt-12 mt-12 border-t border-[#C4666F]/15 flex flex-col md:flex-row items-center justify-between gap-6 text-[#6B4E45] text-sm">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#C4666F]/30 bg-white">
                <Image
                  src="/images/logo.png"
                  alt="Trio Treats"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-heading font-bold text-base text-[#321B14]">
                {site.name}
              </span>
              <span className="text-xs">• {site.tagline}</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium">
              <Link href="#showcase" className="hover:text-[#C4666F] transition-colors">
                Treats
              </Link>
              <Link href="#about" className="hover:text-[#C4666F] transition-colors">
                About
              </Link>
              <Link href="#how-to-order" className="hover:text-[#C4666F] transition-colors">
                How to Order
              </Link>
              <Link href="#booking" className="hover:text-[#C4666F] transition-colors">
                Book Cake
              </Link>
            </div>

            <div className="text-xs text-[#6B4E45]/80 flex items-center gap-1">
              © {currentYear} {site.name} · Baked with <Heart className="w-3.5 h-3.5 text-[#C4666F] fill-current" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
