"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Our Treats", href: "#showcase" },
    { label: "About", href: "#about" },
    { label: "How to Order", href: "#how-to-order" },
    { label: "Visit", href: "#visit" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "glass-nav shadow-md py-1 border-b border-[#FCEBEF]"
          : "bg-transparent py-2"
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-sm flex items-center justify-center transition-transform group-hover:scale-105">
            <Image
              src="/images/logo.png"
              alt="Trio Treats Logo"
              width={48}
              height={48}
              className="w-full h-full object-contain rounded-full"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-xl tracking-tight text-[#321B14]">
              {site.name}
            </span>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#C4666F]">
              Home Bakery
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[#6B4E45] hover:text-[#C4666F] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#booking"
            className="px-6 py-2.5 rounded-full bg-[#321B14] hover:bg-[#4a281e] text-white text-sm font-medium shadow-sm transition-transform hover:-translate-y-0.5"
          >
            Book Now
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 md:hidden text-[#321B14]"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-nav border-b border-[#FCEBEF] px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#321B14] py-2"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#booking"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center w-full px-5 py-3 rounded-full bg-[#321B14] text-white font-medium"
          >
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
}
