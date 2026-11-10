import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { Heart, MessageCircle } from "lucide-react";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="relative bg-[#3A1F17] text-[#FBEEE8] pt-16 pb-12 overflow-hidden">
      {/* Decorative Melt Banner Image */}
      <div className="absolute top-0 left-0 right-0 h-8 opacity-25 overflow-hidden">
        <Image
          src="/images/melt-closeup.jpg"
          alt="Chocolate drip border"
          fill
          className="object-cover"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-white/10 text-center md:text-left">
          {/* Brand Info */}
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20 bg-white">
              <Image
                src="/images/logo.png"
                alt="Trio Treats"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-heading text-2xl font-bold tracking-tight text-white">
                {site.name}
              </p>
              <p className="text-xs text-[#FFE1E6] tracking-wider uppercase font-medium">
                {site.tagline}
              </p>
            </div>
          </div>

          {/* Quick links & contact */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#D3B8AD]">
            <Link href="#showcase" className="hover:text-white transition-colors">
              Treats
            </Link>
            <Link href="#about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link href="#how-to-order" className="hover:text-white transition-colors">
              How to Order
            </Link>
            <Link href="#booking" className="hover:text-white transition-colors">
              Book Cake
            </Link>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#A8BF7B] hover:text-white transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#D3B8AD]/70 gap-4">
          <p>
            © {currentYear} {site.name}. All rights reserved. Pickup only in Valaichenai.
          </p>
          <p className="flex items-center gap-1">
            Baked with <Heart className="w-3.5 h-3.5 text-[#C4666F] fill-current" /> by Trio Treats
          </p>
        </div>
      </div>
    </footer>
  );
}

