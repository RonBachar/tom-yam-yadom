import Link from "next/link";
import Image from "next/image";
import ScentSelector from "./components/ScentSelector";
import AnimateIn from "./components/AnimateIn";
import TigerMark from "./components/TigerMark";
import AddToCartButton from "./components/AddToCartButton";
import { YADOM_OIL } from "./data/products";

/* ─────────────────────────────────────────────────────────
   Home page — cold-traffic conversion engine
   ───────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href={HERO_IMAGE}
        fetchPriority="high"
      />
      <HeroSection />
      <DifferenceStrip />
      <ScentSelectorSection />
      <TraditionSection />
      <FounderSection />
      <UseCaseBand />
      <SocialProofSection />
      <WholesaleTeaser />
    </>
  );
}

const HERO_IMAGE = "/images/hero/hero.webp";
const HERO_WIDTH = 1672;
const HERO_HEIGHT = 941;

/* ── 1. HERO ─────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="relative overflow-hidden" aria-label="Hero">
      {/* LCP: block-level img with intrinsic dimensions — not fill/absolute */}
      <Image
        src={HERO_IMAGE}
        alt="Tom Yam Yadom Thai herbal inhaler, Koh Samui botanicals and Muay Thai tradition"
        width={HERO_WIDTH}
        height={HERO_HEIGHT}
        priority
        unoptimized
        sizes="100vw"
        className="block w-full h-[100svh] min-h-[480px] max-h-[100svh] object-cover object-center"
      />

      {/* Overlays + content sit above the LCP image */}
      <div className="absolute inset-0 flex flex-col overflow-hidden">
      {/* Subtle top edge only — nav blend, center stays clear */}
      <div
        className="absolute inset-x-0 top-0 h-28 md:h-32 pointer-events-none z-[1]"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to bottom, rgba(13,11,8,0.82) 0%, rgba(13,11,8,0.35) 55%, transparent 100%)",
        }}
      />

      {/* Corner frame brackets */}
      <div
        className="absolute inset-6 md:inset-12 pointer-events-none z-10"
        aria-hidden="true"
      >
        {/* Top-left */}
        <span
          className="absolute top-0 left-0 block w-8 h-8"
          style={{
            borderTop: "1.5px solid rgba(201,148,10,0.45)",
            borderLeft: "1.5px solid rgba(201,148,10,0.45)",
          }}
        />
        {/* Top-right */}
        <span
          className="absolute top-0 right-0 block w-8 h-8"
          style={{
            borderTop: "1.5px solid rgba(201,148,10,0.45)",
            borderRight: "1.5px solid rgba(201,148,10,0.45)",
          }}
        />
        {/* Bottom-left */}
        <span
          className="absolute bottom-0 left-0 block w-8 h-8"
          style={{
            borderBottom: "1.5px solid rgba(201,148,10,0.45)",
            borderLeft: "1.5px solid rgba(201,148,10,0.45)",
          }}
        />
        {/* Bottom-right */}
        <span
          className="absolute bottom-0 right-0 block w-8 h-8"
          style={{
            borderBottom: "1.5px solid rgba(201,148,10,0.45)",
            borderRight: "1.5px solid rgba(201,148,10,0.45)",
          }}
        />
      </div>

      {/* Content — fits in viewport below fixed nav */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex-1 flex flex-col items-center justify-center gap-2.5 sm:gap-3.5 text-center min-h-0 pt-[7.5rem] pb-5 sm:pt-28 sm:pb-6">
        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border shrink-0"
          style={{
            borderColor: "rgba(201,148,10,0.35)",
            backgroundColor: "rgba(201,148,10,0.08)",
          }}
        >
          <TigerMark size={16} />
          <span className="text-tiger-gold text-[10px] sm:text-xs font-heading font-bold tracking-[0.16em] uppercase">
            Handcrafted in Koh Samui · Small-Batch
          </span>
        </div>

        {/* Main headline */}
        <h1
          className="font-heading font-bold uppercase leading-[0.92] shrink-0"
          style={{
            fontSize: "clamp(2.56rem, 7.2vw, 6rem)",
            letterSpacing: "-0.01em",
          }}
        >
          <span className="text-tiger-cream block">Ancient</span>
          <span className="block text-tiger-gold">Thai Ritual.</span>
          <span className="text-tiger-cream block">Pocket-Sized.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-tiger-cream-dim text-base sm:text-lg font-sans max-w-2xl mx-auto leading-snug sm:leading-relaxed shrink min-h-0">
          Premium yadom inhalers, handcrafted in Koh Samui from traditional Thai
          botanics. Inspired by the breathing rituals of Muay Thai fighters and
          designed for focus, wherever your day takes you.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center shrink-0">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 bg-tiger-gold hover:bg-tiger-gold-light text-tiger-bg font-heading font-bold text-sm tracking-[0.14em] uppercase px-7 py-3 sm:px-8 sm:py-3.5 rounded-full transition-colors duration-200 cursor-pointer"
          >
            Shop Smiling Tiger
            <ArrowIcon />
          </Link>
          <Link
            href="#scents"
            className="inline-flex items-center justify-center gap-2 border border-tiger-border hover:border-tiger-gold text-tiger-cream font-heading font-semibold text-sm tracking-[0.12em] uppercase px-7 py-3 sm:px-8 sm:py-3.5 rounded-full transition-all duration-200 cursor-pointer hover:bg-tiger-surface"
          >
            Find Your Scent
          </Link>
        </div>
      </div>
      </div>
    </section>
  );
}

/* ── 2. DIFFERENCE STRIP ─────────────────────────────────── */
function DifferenceStrip() {
  const trustItems = [
    { icon: <LeafIcon />, text: "100% Organic" },
    { icon: <FlagIcon />, text: "Thai-Sourced" },
    { icon: <StarIcon />, text: "Small-Batch Koh Samui" },
  ];

  const stats = [
    {
      value: "12+",
      unit: "months",
      label: "Shelf life",
      sub: "vs ~30 days for Vicks & Boom Boom",
      icon: <CalendarIcon />,
    },
    {
      value: "100%",
      unit: "organic",
      label: "Thai ingredients",
      sub: "No synthetic carriers, no artificial fragrance",
      icon: <LeafIcon />,
    },
    {
      value: "7",
      unit: "blends",
      label: "Handcrafted scents",
      sub: "Each one a mood, a ritual, an identity",
      icon: <StarIcon />,
    },
  ];

  return (
    <section
      className="border-y border-tiger-border bg-tiger-surface/50 py-0"
      aria-label="Why Smiling Tiger"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Trust items (moved from hero) */}
        <AnimateIn className="py-6 border-b border-tiger-border">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {trustItems.map(({ icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2.5 text-tiger-muted text-sm font-sans"
              >
                <span className="text-tiger-gold">{icon}</span>
                <span className="font-heading font-bold text-tiger-cream text-xs tracking-[0.1em] uppercase">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </AnimateIn>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-tiger-border">
          {stats.map((s, i) => (
            <AnimateIn key={s.label} delay={i * 120} className="py-10 px-8 md:px-10">
              <div className="flex items-start gap-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1"
                  style={{ backgroundColor: "rgba(201,148,10,0.12)" }}
                >
                  <span className="text-tiger-gold">{s.icon}</span>
                </div>
                <div>
                  <div className="flex items-baseline gap-1.5 mb-0.5">
                    <span className="font-heading font-bold text-tiger-gold-light text-4xl leading-none">
                      {s.value}
                    </span>
                    <span className="font-heading font-semibold text-tiger-muted text-lg uppercase tracking-wide">
                      {s.unit}
                    </span>
                  </div>
                  <p className="font-heading font-bold text-tiger-cream text-base uppercase tracking-wide mb-1">
                    {s.label}
                  </p>
                  <p className="text-tiger-muted text-xs font-sans leading-relaxed">
                    {s.sub}
                  </p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 3. SCENT SELECTOR ───────────────────────────────────── */
function ScentSelectorSection() {
  return (
    <section
      id="scents"
      className="py-24 px-6"
      aria-labelledby="scents-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <AnimateIn className="text-center mb-14">
          <span className="inline-block text-tiger-orange text-xs font-heading font-bold tracking-[0.2em] uppercase mb-4">
            The 7 Smiling Tiger Blends
          </span>
          <h2
            id="scents-heading"
            className="font-heading font-bold uppercase text-tiger-cream leading-none mb-5"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)", letterSpacing: "-0.01em" }}
          >
            Find Your Scent.
          </h2>
          <p className="text-tiger-muted text-lg font-sans max-w-xl mx-auto leading-relaxed">
            Every inhaler is an identity. Tap a scent to explore the mood,
            function, and ingredients. Tap a card to add to cart.
          </p>
        </AnimateIn>

        {/* Interactive grid */}
        <ScentSelector />

        {/* Crown Blend feature card */}
        <AnimateIn delay={200} className="mt-8">
          <YadomOilCard />
        </AnimateIn>
      </div>
    </section>
  );
}

/* Crown Blend premium feature */
function YadomOilCard() {
  return (
    <div
      className="relative rounded-2xl border p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 cursor-pointer transition-all duration-300 hover:scale-[1.01] group"
      style={{
        borderColor: "rgba(201,148,10,0.5)",
        background:
          "linear-gradient(135deg, rgba(201,148,10,0.10) 0%, rgba(13,11,8,0.95) 50%)",
        boxShadow: "0 0 40px 2px rgba(201,148,10,0.12)",
      }}
    >
      <Link
        href="/products/crown-blend"
        className="absolute inset-0 z-[1] rounded-2xl"
        aria-label="View Crown Blend"
      />

      <div
        className="relative z-[2] pointer-events-none w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: "rgba(201,148,10,0.15)" }}
      >
        <FlameIcon className="text-tiger-gold w-7 h-7" />
      </div>
      <div className="relative z-[2] pointer-events-none flex-1">
        <div className="flex items-center gap-3 mb-1.5">
          <h3 className="font-heading font-bold text-2xl text-tiger-cream uppercase tracking-wide">
            Crown Blend
          </h3>
          <span
            className="text-xs font-heading font-bold tracking-[0.12em] uppercase px-3 py-1 rounded-full"
            style={{ backgroundColor: "rgba(201,148,10,0.2)", color: "#C9940A" }}
          >
            Premium
          </span>
        </div>
        <p className="text-tiger-muted font-sans text-sm leading-relaxed mb-0">
          The concentrated form of the Smiling Tiger ritual. Stronger absorption,
          deeper effect. The premium aromatherapy inhaler oil for serious practitioners.
        </p>
      </div>
      <div className="relative z-[2] flex items-center gap-4 flex-shrink-0">
        <span className="pointer-events-none font-heading font-bold text-tiger-gold text-2xl">
          $35
        </span>
        <AddToCartButton
          product={YADOM_OIL}
          stopPropagation
          className="relative z-10 pointer-events-auto bg-tiger-gold hover:bg-tiger-gold-light text-tiger-bg font-heading font-bold text-xs tracking-[0.14em] uppercase px-6 py-3 rounded-full transition-colors duration-200 cursor-pointer whitespace-nowrap"
          aria-label="Add Crown Blend to cart, $35"
        >
          Add to Cart
        </AddToCartButton>
      </div>
    </div>
  );
}

/* ── 4. TRADITION HOOK ───────────────────────────────────── */
function TraditionSection() {
  return (
    <section
      className="py-24 px-6 bg-tiger-surface/40 border-y border-tiger-border"
      aria-label="Thai yadom tradition"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Stat side */}
        <AnimateIn>
          <div className="relative">
            <div
              className="font-heading font-bold text-tiger-gold leading-none mb-3"
              style={{ fontSize: "clamp(5rem, 14vw, 10rem)" }}
            >
              72M
            </div>
            <p className="font-heading font-bold text-tiger-cream text-2xl md:text-3xl uppercase tracking-wide mb-6">
              People. Every day.
            </p>
            <div
              className="w-16 h-0.5 mb-6"
              style={{ backgroundColor: "#C9940A" }}
            />
            <p className="text-tiger-muted font-sans text-base leading-relaxed">
              Yadom is the daily breath ritual of Thailand. Used by ~72 million
              people every single day, in temples, street markets, gyms, and
              offices across the country.
            </p>
          </div>
        </AnimateIn>

        {/* Narrative side */}
        <AnimateIn delay={200}>
          <span className="inline-block text-tiger-orange text-xs font-heading font-bold tracking-[0.2em] uppercase mb-6">
            A Thousand-Year Ritual
          </span>
          <h2 className="font-heading font-bold text-tiger-cream uppercase leading-tight mb-6"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
            Thailand&rsquo;s oldest breathing practice, rebuilt for modern life.
          </h2>
          <div className="space-y-4 text-tiger-muted font-sans text-base leading-relaxed">
            <p>
              The <strong className="text-tiger-cream font-medium">Thai herbal inhaler</strong>, known as{" "}
              <em className="text-tiger-cream">ya-dom</em>, is a compressed blend
              of aromatic herbs carried in a small tube. It has been used for
              respiratory clarity, focus, and ritual grounding for over a
              thousand years.
            </p>
            <p>
              Smiling Tiger is not a Western reinterpretation. It is an authentic,
              Thai-formulated{" "}
              <strong className="text-tiger-cream font-medium">
                herbal nasal inhaler
              </strong>{" "}
              made in Koh Samui, the same island where the tradition is still
              lived every day.
            </p>
            <p>
              Organic. Small-batch. Long shelf life. The{" "}
              <strong className="text-tiger-cream font-medium">
                aromatherapy inhaler
              </strong>{" "}
              that earns its place in your daily carry.
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

/* ── 5. FOUNDER TEASER ───────────────────────────────────── */
function FounderSection() {
  return (
    <section
      className="py-24 px-6"
      aria-label="About the founder"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Fight-card graphic */}
        <AnimateIn className="order-last lg:order-first">
          <div
            className="relative rounded-2xl overflow-hidden aspect-square max-w-sm mx-auto lg:mx-0"
            style={{ border: "1px solid rgba(201,148,10,0.25)" }}
          >
            {/* Decorative fight-card background */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,148,10,0.15) 0%, transparent 65%)",
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
              <TigerMark size={64} />
              <div
                className="w-10 h-0.5"
                style={{ backgroundColor: "#C9940A" }}
              />
              <p className="font-heading font-bold text-tiger-cream uppercase text-xl tracking-widest">
                Tyler
              </p>
              <p className="text-tiger-muted text-xs font-sans tracking-wide text-center leading-relaxed">
                Professional Muay Thai Fighter<br />
                Koh Samui × United States
              </p>
              {/* Decorative corner marks */}
              <div className="absolute top-4 left-4 w-5 h-5" style={{ borderTop: "1px solid rgba(201,148,10,0.5)", borderLeft: "1px solid rgba(201,148,10,0.5)" }} />
              <div className="absolute top-4 right-4 w-5 h-5" style={{ borderTop: "1px solid rgba(201,148,10,0.5)", borderRight: "1px solid rgba(201,148,10,0.5)" }} />
              <div className="absolute bottom-4 left-4 w-5 h-5" style={{ borderBottom: "1px solid rgba(201,148,10,0.5)", borderLeft: "1px solid rgba(201,148,10,0.5)" }} />
              <div className="absolute bottom-4 right-4 w-5 h-5" style={{ borderBottom: "1px solid rgba(201,148,10,0.5)", borderRight: "1px solid rgba(201,148,10,0.5)" }} />
            </div>
          </div>
        </AnimateIn>

        {/* Text */}
        <AnimateIn delay={150}>
          <span className="inline-block text-tiger-orange text-xs font-heading font-bold tracking-[0.2em] uppercase mb-6">
            The Founder
          </span>
          <h2
            className="font-heading font-bold text-tiger-cream uppercase leading-tight mb-6"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)" }}
          >
            Built in the Ring.<br />Rooted in Thailand.
          </h2>
          <div className="space-y-4 text-tiger-muted font-sans text-base leading-relaxed mb-8">
            <p>
              Tyler is a professional Muay Thai fighter who has lived and trained
              between Thailand and the United States for years. He started
              Smiling Tiger because he was tired of what was on the market:
              short shelf life, synthetic fragrances, no cultural connection.
            </p>
            <p>
              Every Smiling Tiger inhaler is formulated the way Thai fighters
              and healers have always done it: organic herbs, sourced in Thailand,
              blended by hand in Koh Samui.
            </p>
          </div>

          <Link
            href="/story"
            className="inline-flex items-center gap-2 text-tiger-gold hover:text-tiger-gold-light font-heading font-bold text-sm tracking-[0.12em] uppercase transition-colors duration-200 cursor-pointer"
          >
            Read Our Story
            <ArrowIcon />
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}

/* ── 6. USE-CASE BAND ────────────────────────────────────── */
function UseCaseBand() {
  const cases = [
    {
      icon: <MusicIcon />,
      title: "Festival",
      copy: "Keep it in your pocket. Pull it out at the peak. 12+ months, no maintenance.",
    },
    {
      icon: <FistIcon />,
      title: "Combat Sports",
      copy: "Power and Clarity were built for the ring. Pre-fight, post-fight, or in the cut.",
    },
    {
      icon: <NoSmoke />,
      title: "Quit Smoking",
      copy: "Oral fixation met with ritual. 600+ users have made the switch.",
    },
    {
      icon: <BrainIcon />,
      title: "Focus & Work",
      copy: "Clarity's Borneol cuts through the noise. One breath. Back in.",
    },
  ];

  return (
    <section
      className="py-20 px-6 bg-tiger-surface/30 border-y border-tiger-border"
      aria-label="Who Smiling Tiger is for"
    >
      <div className="max-w-6xl mx-auto">
        <AnimateIn className="text-center mb-12">
          <span className="text-tiger-orange text-xs font-heading font-bold tracking-[0.2em] uppercase">
            For every moment
          </span>
        </AnimateIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cases.map((c, i) => (
            <AnimateIn key={c.title} delay={i * 100}>
              <div
                className="p-6 rounded-2xl h-full transition-all duration-200 cursor-default"
                style={{
                  backgroundColor: "rgba(28,22,16,0.7)",
                  border: "1px solid rgba(58,42,24,0.8)",
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: "rgba(201,148,10,0.1)" }}
                >
                  <span className="text-tiger-gold">{c.icon}</span>
                </div>
                <h3 className="font-heading font-bold text-tiger-cream text-xl uppercase tracking-wide mb-2">
                  {c.title}
                </h3>
                <p className="text-tiger-muted text-sm font-sans leading-relaxed">
                  {c.copy}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 7. SOCIAL PROOF ─────────────────────────────────────── */
function SocialProofSection() {
  const testimonials = [
    {
      quote:
        "Took it to Coachella. Best thing in my festival kit. Breathed better for three days straight.",
      name: "Jake M.",
      title: "Festival-goer, Austin TX",
    },
    {
      quote:
        "Use Clarity every morning before sparring. Borneol cuts straight through. Game changer for focus.",
      name: "Nong T.",
      title: "Muay Thai instructor, Chiang Mai",
    },
    {
      quote:
        "Switched from Vicks when I was quitting smoking. Still carrying Serenity six months later.",
      name: "Sarah K.",
      title: "Wellness coach, LA",
    },
  ];

  return (
    <section
      className="py-24 px-6"
      aria-label="Social proof"
    >
      <div className="max-w-6xl mx-auto">
        {/* Counter */}
        <AnimateIn className="text-center mb-16">
          <div
            className="font-heading font-bold text-tiger-gold leading-none mb-2"
            style={{ fontSize: "clamp(3.5rem, 10vw, 7rem)" }}
          >
            600+
          </div>
          <p className="font-heading font-bold text-tiger-cream text-xl uppercase tracking-widest">
            Smiling Tiger Inhalers Sold
          </p>
          <p className="text-tiger-muted text-sm font-sans mt-2">
            From Koh Samui to Coachella, and still counting.
          </p>
        </AnimateIn>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t, i) => (
            <AnimateIn key={t.name} delay={i * 120}>
              <figure
                className="p-6 rounded-2xl h-full flex flex-col justify-between"
                style={{
                  backgroundColor: "rgba(28,22,16,0.9)",
                  border: "1px solid rgba(58,42,24,0.8)",
                }}
              >
                <blockquote className="text-tiger-cream font-sans text-sm leading-relaxed mb-5 flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption>
                  <p className="text-tiger-cream font-heading font-bold text-sm uppercase tracking-wide">
                    {t.name}
                  </p>
                  <p className="text-tiger-muted text-xs font-sans">{t.title}</p>
                </figcaption>
              </figure>
            </AnimateIn>
          ))}
        </div>

        {/* Trust badges */}
        <AnimateIn>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Handcrafted in Thailand",
              "Thai-Sourced Ingredients",
              "No Artificial Additives",
              "12+ Month Shelf Life",
            ].map((badge) => (
              <div
                key={badge}
                className="flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-heading font-semibold tracking-wide text-tiger-muted"
                style={{ borderColor: "rgba(58,42,24,0.9)" }}
              >
                <CheckIcon />
                {badge}
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

/* ── 8. WHOLESALE TEASER ─────────────────────────────────── */
function WholesaleTeaser() {
  return (
    <section
      className="py-16 px-6 bg-tiger-surface/40 border-y border-tiger-border"
      aria-label="Wholesale"
    >
      <div className="max-w-4xl mx-auto">
        <AnimateIn>
          <div
            className="rounded-2xl p-8 md:p-12 text-center"
            style={{
              border: "1px solid rgba(201,148,10,0.3)",
              background:
                "linear-gradient(135deg, rgba(201,148,10,0.06) 0%, transparent 60%)",
            }}
          >
            <span className="inline-block text-tiger-orange text-xs font-heading font-bold tracking-[0.2em] uppercase mb-5">
              For Retailers &amp; Gyms
            </span>
            <h2
              className="font-heading font-bold text-tiger-cream uppercase leading-tight mb-5"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
            >
              Stocking a gym?<br />Running a wellness shop?
            </h2>
            <p className="text-tiger-muted font-sans text-base leading-relaxed mb-8 max-w-xl mx-auto">
              Four-tier wholesale program for gyms, smoke shops, wellness retailers,
              and lifestyle stores. Low minimums. High margin. A product your
              customers will come back for.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/wholesale"
                className="inline-flex items-center justify-center gap-2 bg-tiger-gold hover:bg-tiger-gold-light text-tiger-bg font-heading font-bold text-sm tracking-[0.14em] uppercase px-8 py-4 rounded-full transition-colors duration-200 cursor-pointer"
              >
                Wholesale Inquiry
                <ArrowIcon />
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 border border-tiger-border hover:border-tiger-gold text-tiger-cream font-heading font-semibold text-sm tracking-[0.12em] uppercase px-8 py-4 rounded-full transition-all duration-200 cursor-pointer hover:bg-tiger-surface"
              >
                Shop Retail
              </Link>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   Inline SVG icon helpers (no emoji, WCAG-compliant)
   ───────────────────────────────────────────────────────── */
function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  );
}

function HeartIcon({ className = "" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function MusicIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

function FistIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 11.5V9a2 2 0 0 0-2-2h0a2 2 0 0 0-2 2v1.4" />
      <path d="M14 10V8a2 2 0 0 0-2-2h0a2 2 0 0 0-2 2v2" />
      <path d="M10 9.9V9a2 2 0 0 0-2-2h0a2 2 0 0 0-2 2v5" />
      <path d="M6 14v0a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h12l1-1 1-4H9l-1-1H6v1Z" />
    </svg>
  );
}

function NoSmoke() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="2" y1="2" x2="22" y2="22" />
      <path d="M12 12H3v2h7" />
      <path d="M18 12h3v2h-1" />
      <path d="M18 8c0-2-2-4-4-4" />
      <path d="M22 12c0-2.67-1.33-4-4-4" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.07-4.58A3 3 0 0 1 4.5 9.5a2.5 2.5 0 0 1 5-1.5v0" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.07-4.58A3 3 0 0 0 19.5 9.5a2.5 2.5 0 0 0-5-1.5v0" />
    </svg>
  );
}

function FlameIcon({ className = "" }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
