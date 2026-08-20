import Link from "next/link";
import Image from "next/image";
import { DEFAULT_OG_IMAGE } from "../data/siteMeta";

const BASE_URL = "https://www.tomyamyadomherbals.com";

export const metadata = {
  title: "Our Story | Tom Yam Yadom, Smiling Tiger",
  description:
    "Tyler's story: a professional Muay Thai fighter who built a premium Thai herbal inhaler from Koh Samui. Organic ingredients, small-batch, Thai-sourced.",
  alternates: { canonical: `${BASE_URL}/story` },
  openGraph: {
    title: "Our Story | Tom Yam Yadom, Smiling Tiger",
    description:
      "Tyler's story: a professional Muay Thai fighter who built a premium Thai herbal inhaler from Koh Samui. Organic ingredients, small-batch, Thai-sourced.",
    url: `${BASE_URL}/story`,
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

export default function StoryPage() {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="inline-block text-tiger-orange text-xs font-heading font-bold tracking-[0.2em] uppercase mb-5">
            Our Story
          </span>
          <h1
            className="font-heading font-bold text-tiger-cream uppercase leading-none mb-6"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", letterSpacing: "-0.01em" }}
          >
            Built in the Ring.<br />
            <span className="text-tiger-gold">Rooted in Thailand.</span>
          </h1>
        </div>

        {/* Story content */}
        <div className="space-y-12 text-tiger-cream-dim font-sans text-lg leading-relaxed">
          <section>
            <h2 className="font-heading font-bold text-tiger-cream text-2xl uppercase tracking-wide mb-6">
              The Founder
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-8 md:gap-10 items-start">
              <div className="relative w-full rounded-2xl overflow-hidden border border-tiger-border">
                <Image
                  src="/images/about/tyler.webp"
                  alt="Tyler, co-founder of Tom Yam Yadom, Muay Thai fighter"
                  width={640}
                  height={640}
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
              <div>
                <p>
                  Tyler is a professional Muay Thai fighter who has lived and trained between Thailand and the United States for over a decade. He found yadom, the compressed Thai herbal inhaler, on his first trip to Koh Samui, and it never left his fight kit.
                </p>
                <p className="mt-4">
                  He got tired of what was on the market: mass-produced inhalers with 30-day shelf lives, synthetic fragrance, and zero cultural connection. So he built his own.
                </p>
              </div>
            </div>
          </section>

          <div
            className="border-l-2 pl-8 py-2"
            style={{ borderColor: "#C9940A" }}
          >
            <p className="text-tiger-cream text-xl italic font-sans">
              &ldquo;I wanted something that earned its place in the kit bag. Organic. Long shelf life. Made the way Thai people actually make it.&rdquo;
            </p>
            <p className="text-tiger-muted text-sm mt-3">Tyler, Founder</p>
          </div>

          <section>
            <h2 className="font-heading font-bold text-tiger-cream text-2xl uppercase tracking-wide mb-4">
              Koh Samui Sourcing
            </h2>
            <p>
              Every Smiling Tiger inhaler is formulated and hand-assembled in Koh Samui using Thai-sourced organic ingredients. No outsourcing, no synthetic carriers, no shortcuts. The shelf life exceeds 12 months, compared to the 30-day window of most mass-market inhalers.
            </p>
          </section>

        </div>

        <div className="mt-16 flex flex-col sm:flex-row gap-4">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 bg-tiger-gold hover:bg-tiger-gold-light text-tiger-bg font-heading font-bold text-sm tracking-[0.14em] uppercase px-8 py-4 rounded-full transition-colors duration-200 cursor-pointer"
          >
            Shop the Collection
          </Link>
          <Link
            href="/wholesale"
            className="inline-flex items-center justify-center gap-2 border border-tiger-border hover:border-tiger-gold text-tiger-cream font-heading font-semibold text-sm tracking-[0.12em] uppercase px-8 py-4 rounded-full transition-all duration-200 cursor-pointer hover:bg-tiger-surface"
          >
            Wholesale Inquiries
          </Link>
        </div>
      </div>
    </div>
  );
}
