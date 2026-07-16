import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Smartlook from "./components/Smartlook";
import Clarity from "./components/Clarity";
import { CartProvider } from "./context/CartContext";
import { DEFAULT_OG_IMAGE } from "./data/siteMeta";

const BASE_URL = "https://www.tomyamyadomherbals.com";

const barlow = Barlow({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const metadata = {
  title: "Tom Yam Yadom | Smiling Tiger Thai Herbal Inhaler",
  description:
    "Handcrafted organic Thai herbal inhalers from Koh Samui. 7 scents for focus, breathing clarity, and sensory ritual. A natural alternative to smoking.",
  keywords: [
    "Thai herbal inhaler",
    "organic yadom",
    "natural focus inhaler",
    "herbal nasal inhaler",
    "smoking alternative",
    "Muay Thai",
    "festival inhaler",
    "aromatherapy inhaler",
    "yadom",
    "Koh Samui",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Tom Yam Yadom | Smiling Tiger Thai Herbal Inhaler",
    description:
      "Handcrafted organic Thai herbal inhalers from Koh Samui. 7 scents for focus, breathing clarity, and sensory ritual. A natural alternative to smoking.",
    url: `${BASE_URL}/`,
    siteName: "Tom Yam Yadom",
    locale: "en_US",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [DEFAULT_OG_IMAGE.url],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Tom Yam Yadom",
  url: "https://www.tomyamyadomherbals.com",
  logo: "https://www.tomyamyadomherbals.com/images/logos/logo.jpg",
  description:
    "Premium handcrafted Thai herbal inhalers made in Koh Samui.",
  email: "info@tomyamyadomherbals.com",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-tiger-bg text-tiger-cream">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Smartlook />
        <Clarity />
        <CartProvider>
          <Navbar />
          <main className="flex-1 w-full min-w-0">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
