import Link from "next/link";
import TigerMark from "../components/TigerMark";

export const metadata = {
  title: "Our Story | Tom Yam Yadom, Smiling Tiger",
  description:
    "Tyler's story: a professional Muay Thai fighter who built a premium Thai herbal inhaler from Koh Samui. 10% of every sale goes to Jackie Gym youth Muay Thai.",
};

export default function StoryPage() {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <TigerMark size={56} className="mx-auto mb-6" />
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
        <div className="space-y-12 text-tiger-muted font-sans text-lg leading-relaxed">
          <section>
            <h2 className="font-heading font-bold text-tiger-cream text-2xl uppercase tracking-wide mb-4">
              The Founder
            </h2>
            <p>
              Tyler is a professional Muay Thai fighter who has lived and trained between Thailand and the United States for over a decade. He found yadom, the compressed Thai herbal inhaler, on his first trip to Koh Samui, and it never left his fight kit.
            </p>
            <p className="mt-4">
              He got tired of what was on the market: mass-produced inhalers with 30-day shelf lives, synthetic fragrance, and zero cultural connection. So he built his own.
            </p>
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

          <section>
            <h2 className="font-heading font-bold text-tiger-cream text-2xl uppercase tracking-wide mb-4">
              Jackie Gym Giveback
            </h2>
            <p>
              10% of every sale goes directly to youth Muay Thai training at Jackie Gym, Koh Samui. The gym trains the next generation of fighters, kids who might not otherwise have access to the discipline, mentorship, and physical practice that Muay Thai provides.
            </p>
            <div
              className="mt-6 p-5 rounded-xl"
              style={{ backgroundColor: "rgba(201,148,10,0.08)", border: "1px solid rgba(201,148,10,0.25)" }}
            >
              <p className="text-tiger-gold font-heading font-bold text-lg uppercase tracking-wide">
                10% of every Smiling Tiger sale → Jackie Gym
              </p>
            </div>
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
