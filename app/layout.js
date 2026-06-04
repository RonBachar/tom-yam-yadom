import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";

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
    "Handcrafted organic Thai herbal inhalers from Koh Samui. 7 scents for focus, breathing clarity, and sensory ritual. Natural focus inhaler, aromatherapy inhaler, and smoking alternative.",
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
  openGraph: {
    title: "Tom Yam Yadom | Smiling Tiger Thai Herbal Inhaler",
    description:
      "Premium handcrafted yadom from Koh Samui. 7 scents. Organic ingredients. 12+ month shelf life.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-tiger-bg text-tiger-cream">
        <CartProvider>
          <Navbar />
          <main className="flex-1 w-full min-w-0">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
