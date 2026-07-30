import { ALL_PRODUCTS } from "../data/products";
import { DEFAULT_OG_IMAGE } from "../data/siteMeta";
import ScentCard from "../components/ScentCard";

const BASE_URL = "https://www.tomyamyadomherbals.com";

export const metadata = {
  title: "Shop | Tom Yam Yadom | Thai Herbal Inhaler",
  description:
    "Shop all 7 Smiling Tiger Thai herbal inhaler scents, Crown Blend oil, and the Complete Ritual Set. Organic yadom handcrafted in Koh Samui, Thailand.",
  openGraph: {
    title: "Shop | Tom Yam Yadom | Thai Herbal Inhaler",
    description:
      "Shop all 7 Smiling Tiger Thai herbal inhaler scents, Crown Blend oil, and the Complete Ritual Set. Organic yadom handcrafted in Koh Samui, Thailand.",
    url: `${BASE_URL}/shop`,
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

export default function ShopPage() {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <span className="inline-block text-tiger-orange text-xs font-heading font-bold tracking-[0.2em] uppercase mb-4">
            All Products
          </span>
          <h1
            className="font-heading font-bold text-tiger-cream uppercase leading-none mb-4"
            style={{
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
              letterSpacing: "-0.01em",
            }}
          >
            Shop Smiling Tiger
          </h1>
          <p className="text-tiger-muted font-sans text-lg max-w-xl">
            7 handcrafted Thai herbal inhalers + Crown Blend. Find your scent.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-stretch">
          {ALL_PRODUCTS.map((product) => (
            <ScentCard key={product.slug} scent={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
