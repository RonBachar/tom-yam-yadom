import { notFound } from "next/navigation";
import Link from "next/link";
import { ALL_PRODUCTS } from "../../data/products";

export function generateStaticParams() {
  return ALL_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = ALL_PRODUCTS.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: `${product.name} — Tom Yam Yadom`,
    description: product.description,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = ALL_PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = ALL_PRODUCTS.filter(
    (p) => p.slug !== product.slug && !p.isOil
  ).slice(0, 3);

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-xs font-sans text-tiger-muted mb-10"
          aria-label="Breadcrumb"
        >
          <Link
            href="/shop"
            className="hover:text-tiger-cream transition-colors cursor-pointer"
          >
            Shop
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-tiger-cream">{product.name}</span>
        </nav>

        {/* Product main */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Visual placeholder */}
          <div
            className="aspect-square rounded-3xl flex items-center justify-center"
            style={{
              border: `1px solid ${product.accentColor}50`,
              background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${product.accentColor}18 0%, transparent 70%)`,
            }}
          >
            <div className="text-center p-8">
              <div
                className="font-heading font-bold leading-none mb-4 select-none"
                style={{
                  fontSize: "clamp(6rem, 18vw, 10rem)",
                  color: product.accentColor,
                  opacity: 0.2,
                }}
              >
                {product.name.slice(0, 1)}
              </div>
              <p className="font-heading font-bold text-tiger-cream text-2xl uppercase tracking-widest">
                {product.name}
              </p>
            </div>
          </div>

          {/* Buy box */}
          <div className="flex flex-col justify-center">
            {product.badge && (
              <span
                className="inline-block self-start text-xs font-heading font-bold tracking-[0.12em] uppercase px-3 py-1 rounded-full mb-5"
                style={{
                  backgroundColor: `${product.accentColor}22`,
                  color: product.accentColor,
                }}
              >
                {product.badge}
              </span>
            )}

            <h1
              className="font-heading font-bold uppercase leading-tight mb-2"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                color: product.accentColor,
              }}
            >
              {product.name}
            </h1>

            <p className="text-tiger-muted font-sans text-base italic mb-6">
              {product.tagline}
            </p>

            <div
              className="w-12 h-0.5 mb-6"
              style={{ backgroundColor: product.accentColor }}
            />

            <p className="text-tiger-muted font-sans text-base leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Functions */}
            <div className="flex flex-wrap gap-2 mb-6">
              {product.functions.map((fn) => (
                <span
                  key={fn}
                  className="text-xs px-3 py-1.5 rounded-full font-sans font-medium text-tiger-cream"
                  style={{
                    backgroundColor: `${product.accentColor}18`,
                    border: `1px solid ${product.accentColor}30`,
                  }}
                >
                  {fn}
                </span>
              ))}
            </div>

            {/* Ingredients */}
            <p className="text-tiger-muted text-sm font-sans mb-8">
              <span className="font-semibold" style={{ color: "rgba(242,230,196,0.5)" }}>
                Ingredients:{" "}
              </span>
              {product.ingredients.join(", ")}
            </p>

            {/* Price + CTA */}
            <div className="flex items-center gap-5 mb-4">
              <span className="font-heading font-bold text-tiger-gold text-4xl">
                ${product.price}
              </span>
              <button
                className="flex-1 font-heading font-bold text-sm tracking-[0.14em] uppercase py-4 rounded-full transition-all duration-200 cursor-pointer active:scale-95"
                style={{ backgroundColor: product.accentColor, color: "#0D0B08" }}
                aria-label={`Add ${product.name} to cart — $${product.price}`}
              >
                Add to Cart
              </button>
            </div>

            {/* Trust note */}
            <p className="text-tiger-muted text-xs font-sans">
              Handcrafted in Koh Samui &middot; 12+ month shelf life &middot; 10%
              to Jackie Gym
            </p>
          </div>
        </div>

        {/* Related scents */}
        {related.length > 0 && (
          <section aria-labelledby="related-heading">
            <h2
              id="related-heading"
              className="font-heading font-bold text-tiger-cream text-2xl uppercase tracking-wide mb-8"
            >
              Explore More Scents
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/products/${r.slug}`}
                  className="block rounded-2xl border border-tiger-border hover:border-tiger-gold/40 bg-tiger-surface p-5 transition-all duration-200 cursor-pointer group overflow-hidden"
                >
                  <div
                    className="h-0.5 w-full mb-4 rounded"
                    style={{ backgroundColor: r.accentColor, opacity: 0.5 }}
                  />
                  <h3 className="font-heading font-bold text-xl text-tiger-cream uppercase tracking-wide group-hover:text-tiger-gold transition-colors duration-200 mb-1">
                    {r.name}
                  </h3>
                  <p className="text-tiger-muted text-xs font-sans">
                    {r.tagline}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
