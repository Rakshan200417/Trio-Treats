import { site } from "@/data/site";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const defaultMessage = encodeURIComponent(
    "Hi Trio Treats, I'd like to order a fresh treat!"
  );
  const waUrl = `https://wa.me/${site.whatsapp}?text=${defaultMessage}`;

  return (
    <aside aria-label="Direct WhatsApp Contact" className="fixed bottom-6 right-6 z-50">
      {/* Ambient Pulsing Wave Rings */}
      <div className="absolute inset-0 rounded-full bg-[#2F5D3A] animate-ping opacity-25 pointer-events-none" />
      <div className="absolute -inset-1 rounded-full bg-[#2F5D3A] animate-pulse opacity-30 pointer-events-none" />

      {/* Pure Icon Button (No Text) */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 bg-[#2F5D3A] text-white rounded-full shadow-2xl hover:bg-[#254b2e] transition-all transform hover:scale-110 active:scale-95 animate-whatsapp-pulse focus:outline-none focus:ring-4 focus:ring-[#2F5D3A]/40"
        aria-label="Direct chat on WhatsApp with the baker"
      >
        <MessageCircle className="w-7 h-7 fill-current text-white" />
      </a>
    </aside>
  );
}
