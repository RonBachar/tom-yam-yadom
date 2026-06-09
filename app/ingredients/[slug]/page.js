import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ALL_PRODUCTS } from "../../data/products";
import {
  INGREDIENTS,
  getIngredientBySlug,
  getIngredientName,
  ingredientMetaDescription,
} from "../../data/ingredients";

const BASE_URL = "https://www.tomyamyadomherbals.com";

const DISCLAIMER =
  "The historical and traditional information presented on this page is for educational and cultural interest only. Tom Yam Yadom products are not intended to diagnose, treat, cure, or prevent any disease or medical condition. Ingredient histories reflect traditional and cultural uses across various societies and are not claims about the properties of our products.";

export function generateStaticParams() {
  return INGREDIENTS.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const ingredient = getIngredientBySlug(slug);
  if (!ingredient) return {};

  const name = getIngredientName(ingredient.title);
  const description = ingredientMetaDescription(ingredient);
  const url = `${BASE_URL}/ingredients/${slug}`;

  return {
    title: `${name}: Aroma, History & Uses | Tom Yam Yadom`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${name}: Aroma, History & Uses | Tom Yam Yadom`,
      description,
      url,
      siteName: "Tom Yam Yadom",
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${name}: Aroma, History & Uses | Tom Yam Yadom`,
      description,
    },
  };
}

export default async function IngredientPage({ params }) {
  const { slug } = await params;
  const ingredient = getIngredientBySlug(slug);
  if (!ingredient) notFound();

  const name = getIngredientName(ingredient.title);

  const foundInProducts = ingredient.foundIn
    .map((productSlug) => ALL_PRODUCTS.find((p) => p.slug === productSlug))
    .filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name,
    description: [
      ingredient.aromaProfile,
      ingredient.historicalUses,
      ingredient.modernUses,
    ]
      .filter(Boolean)
      .join(" "),
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Tom Yam Yadom Apothecary",
      url: `${BASE_URL}/ingredients`,
    },
    ...(ingredient.image ? { image: ingredient.image } : {}),
  };

  return (
    <div className="pt-32 pb-24 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto">
        <nav
          className="flex items-center gap-2 text-xs font-sans text-tiger-muted mb-10"
          aria-label="Breadcrumb"
        >
          <Link
            href="/ingredients"
            className="hover:text-tiger-cream transition-colors cursor-pointer"
          >
            The Apothecary
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-tiger-cream">{name}</span>
        </nav>

        <h1
          className="font-heading font-bold text-tiger-cream uppercase leading-tight mb-5"
          style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}
        >
          {name}
        </h1>

        <div className="flex flex-wrap gap-2 mb-10">
          {ingredient.categories.map((cat) => (
            <span
              key={cat}
              className="text-sm font-heading font-bold tracking-[0.1em] px-3 py-1.5 rounded-full border border-tiger-gold/25 bg-tiger-cream/20 text-tiger-cream"
            >
              {cat}
            </span>
          ))}
        </div>

        {ingredient.image ? (
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-12">
            <Image
              src={ingredient.image}
              alt={`${name} ingredient used in Tom Yam Yadom herbal inhalers`}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <div className="relative aspect-[4/5] rounded-2xl border border-tiger-border bg-tiger-surface overflow-hidden mb-12 flex items-center justify-center">
            <p className="text-tiger-muted font-heading text-sm uppercase tracking-[0.15em]">
              Coming Soon
            </p>
          </div>
        )}

        <div className="space-y-10 mb-12">
          <section aria-labelledby="aroma-heading">
            <h2
              id="aroma-heading"
              className="font-heading font-bold text-tiger-gold text-lg uppercase tracking-wide mb-3"
            >
              Aroma Profile
            </h2>
            <p className="text-tiger-muted font-sans text-base leading-relaxed">
              {ingredient.aromaProfile}
            </p>
          </section>

          <section aria-labelledby="historical-heading">
            <h2
              id="historical-heading"
              className="font-heading font-bold text-tiger-gold text-lg uppercase tracking-wide mb-3"
            >
              Historical Uses
            </h2>
            <p className="text-tiger-muted font-sans text-base leading-relaxed">
              {ingredient.historicalUses}
            </p>
          </section>

          <section aria-labelledby="modern-heading">
            <h2
              id="modern-heading"
              className="font-heading font-bold text-tiger-gold text-lg uppercase tracking-wide mb-3"
            >
              Modern Uses
            </h2>
            <p className="text-tiger-muted font-sans text-base leading-relaxed">
              {ingredient.modernUses}
            </p>
          </section>
        </div>

        {foundInProducts.length > 0 && (
          <section aria-labelledby="found-in-heading" className="mb-12">
            <h2
              id="found-in-heading"
              className="font-heading font-bold text-tiger-cream text-xl uppercase tracking-wide mb-4"
            >
              Found In
            </h2>
            <ul className="space-y-2">
              {foundInProducts.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="text-tiger-muted hover:text-tiger-gold font-sans text-base transition-colors duration-200 cursor-pointer"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="text-tiger-muted/70 font-sans text-xs leading-relaxed border-t border-tiger-border pt-8">
          {DISCLAIMER}
        </p>
      </div>
    </div>
  );
}
