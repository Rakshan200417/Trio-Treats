import type { Metadata } from "next";
import { Playfair_Display, Poppins, Dancing_Script } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["600", "700"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600"],
  display: "swap",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  weight: ["600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://triotreats.lk"),
  title: "Trio Treats | Home Bakery in Valaichenai, Sri Lanka",
  description:
    "Baked with love, served with joy. Bespoke cakes, fudge brownies, and gourmet cupcakes baked fresh to order in Valaichenai, Sri Lanka.",
  openGraph: {
    title: "Trio Treats — Home Bakery",
    description: "Baked with love, served with joy. Pickup only in Valaichenai.",
    url: "https://triotreats.lk",
    siteName: "Trio Treats",
    images: [
      {
        url: "/images/hero-cake.jpg",
        width: 1200,
        height: 630,
        alt: "Trio Treats Chocolate Drip Celebration Cake",
      },
    ],
    locale: "en_LK",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: "Trio Treats",
    image: "https://triotreats.lk/images/hero-cake.jpg",
    telephone: "+94758924614",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2nd Cross, Kannakipuram",
      addressLocality: "Valaichenai",
      addressRegion: "Eastern Province",
      addressCountry: "LK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "7.925",
      longitude: "81.535",
    },
    url: "https://triotreats.lk",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "21:00",
      },
    ],
    priceRange: "$$",
  };

  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable} ${dancing.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen selection:bg-[#FFE1E6] selection:text-[#3A1F17]">
        {children}
      </body>
    </html>
  );
}
