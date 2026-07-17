import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ALL_PRODUCTS, SCENTS, YADOM_OIL } from "../../data/products";
import {
  getIngredientBySlug,
  getIngredientName,
  INGREDIENT_CATEGORIES,
} from "../../data/ingredients";
import AddToCartButton from "../../components/AddToCartButton";
import ScentCard from "../../components/ScentCard";
import { SHIPPING_POLICY, RETURN_POLICY } from "@/app/data/policies";

export function generateStaticParams() {
  return ALL_PRODUCTS.map((p) => ({ slug: p.slug }));
}

const BASE_URL = "https://www.tomyamyadomherbals.com";

const PRODUCT_IMAGE_ALT = {
  compassion:
    "Compassion herbal inhaler, rose hips, peach blossom, and pink peppercorn",
  vitality: "Vitality herbal inhaler, Thai ginger, cinnamon, and fuji pear",
  radiance:
    "Radiance herbal inhaler, kaffir lime, tangerine zest, and orange blossom",
  balance: "Balance herbal inhaler, traditional samunprai Thai herbal blend",
  power: "Power herbal inhaler, Thai royal basil, cinnamon oil, and peppermint",
  clarity: "Clarity herbal inhaler, borneol, camphor, and cooling compounds",
  serenity:
    "Serenity herbal inhaler, jasmine, white peppercorn, and calming botanicals",
  "crown-blend":
    "Crown Blend herbal oil, premium concentrated Thai herbal ritual oil",
  "complete-ritual-set":
    "Complete Ritual Set containing all seven Tom Yam Yadom herbal inhalers and Crown Blend oil",
};

/* Crown Blend first, then 7 scents. Fills 4x2 desktop / 2x4 mobile. */
const BUNDLE_GRID_SLUGS = [
  "crown-blend",
  "compassion",
  "vitality",
  "radiance",
  "balance",
  "power",
  "clarity",
  "serenity",
];

const SET_PRODUCTS = [...SCENTS, YADOM_OIL];
const BUNDLE_LIST_PRICE = 175;
const BUNDLE_SAVINGS = 25;

function groupIngredientsByCategory(ingredientSlugs) {
  const groups = INGREDIENT_CATEGORIES.map((category) => ({
    category,
    ingredients: [],
  }));

  for (const slug of ingredientSlugs) {
    const ingredient = getIngredientBySlug(slug);
    if (!ingredient) continue;
    const category = ingredient.categories?.[0];
    const group = groups.find((g) => g.category === category);
    if (group) {
      group.ingredients.push({
        slug,
        name:
          slug === "fuji-pear-tea"
            ? "Fuji Pear Tea"
            : getIngredientName(ingredient.title),
        isLink: slug !== "fuji-pear-tea",
      });
    }
  }

  return groups.filter((g) => g.ingredients.length > 0);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = ALL_PRODUCTS.find((p) => p.slug === slug);
  if (!product) return {};
  const url = `${BASE_URL}/products/${slug}`;
  const imageUrl = product.isBundle
    ? `${BASE_URL}/images/product/crown-blend.jpg`
    : `${BASE_URL}/images/product/${slug}.jpg`;
  const pageTitle =
    slug === "complete-ritual-set"
      ? "Complete Ritual Set: 7 Scents + Crown Blend | Tom Yam Yadom"
      : product.isBundle
        ? `${product.name} | Tom Yam Yadom`
        : `${product.name} Thai Herbal Inhaler | Tom Yam Yadom`;
  const ogTitle =
    slug === "complete-ritual-set"
      ? "Complete Ritual Set: 7 Scents + Crown Blend | Tom Yam Yadom"
      : product.isBundle
        ? `${product.name} | Tom Yam Yadom`
        : `${product.name} | Tom Yam Yadom Thai Herbal Inhaler`;
  return {
    title: pageTitle,
    description: product.description,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description: product.description,
      url,
      siteName: "Tom Yam Yadom",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: product.isBundle
            ? PRODUCT_IMAGE_ALT["complete-ritual-set"]
            : `${product.name} Thai herbal inhaler by Tom Yam Yadom`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [imageUrl],
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = ALL_PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const eligibleScents = SCENTS.filter((p) => !p.isOil && !p.isBundle);
  const currentIndex = eligibleScents.findIndex((p) => p.slug === product.slug);
  const related =
    currentIndex === -1
      ? eligibleScents.slice(0, 3)
      : Array.from(
          { length: 3 },
          (_, i) =>
            eligibleScents[(currentIndex + 1 + i) % eligibleScents.length],
        );

  const ingredientGroups = product.isBundle
    ? groupIngredientsByCategory(product.ingredientSlugs)
    : null;

  const priceValidUntil = new Date();
  priceValidUntil.setFullYear(priceValidUntil.getFullYear() + 1);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `${BASE_URL}/images/product/${product.slug}.jpg`,
    brand: { "@type": "Brand", name: "Tom Yam Yadom" },
    category: "Herbal Inhaler",
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${BASE_URL}/products/${product.slug}`,
      priceValidUntil: priceValidUntil.toISOString().split("T")[0],
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: SHIPPING_POLICY.standard.price.toFixed(2),
          currency: SHIPPING_POLICY.standard.currency,
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: SHIPPING_POLICY.shipsFrom,
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: SHIPPING_POLICY.handlingDaysMin,
            maxValue: SHIPPING_POLICY.handlingDaysMax,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: SHIPPING_POLICY.standard.transitDays,
            maxValue: SHIPPING_POLICY.standard.transitDays,
            unitCode: "DAY",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: SHIPPING_POLICY.shipsFrom,
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: RETURN_POLICY.windowDays,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
        refundType: "https://schema.org/FullRefund",
      },
    },
  };

  return (
    <div className="pt-32 pb-24 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
          {/* Product image */}
          <div
            className="relative aspect-[4/5] rounded-3xl overflow-hidden"
            style={{
              border: `1px solid ${product.accentColor}50`,
              backgroundColor: "#1a1a1a",
            }}
          >
            {product.isBundle ? (
              <div
                className="absolute inset-0 grid grid-cols-2 grid-rows-4 md:grid-cols-4 md:grid-rows-2 gap-1 p-1.5"
                style={{ backgroundColor: "#0D0B08" }}
                role="img"
                aria-label={PRODUCT_IMAGE_ALT["complete-ritual-set"]}
              >
                {BUNDLE_GRID_SLUGS.map((imageSlug) => {
                  const isHero = imageSlug === "crown-blend";

                  return (
                    <div
                      key={imageSlug}
                      className={`relative min-h-0 overflow-hidden rounded-xl ${
                        isHero ? "z-10" : ""
                      }`}
                      style={{
                        border: isHero
                          ? "1px solid rgba(201,148,10,0.55)"
                          : "1px solid rgba(201,148,10,0.22)",
                        boxShadow: isHero
                          ? "0 0 20px rgba(201,148,10,0.22)"
                          : undefined,
                      }}
                    >
                      <Image
                        src={`/images/product/${imageSlug}.png`}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover"
                        priority={isHero}
                        aria-hidden
                      />
                      {isHero && (
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(to top, rgba(13,11,8,0.45) 0%, transparent 55%)",
                          }}
                          aria-hidden
                        />
                      )}
                    </div>
                  );
                })}

                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, transparent 35%, rgba(13,11,8,0.5) 100%)",
                    boxShadow: "inset 0 0 40px rgba(201,148,10,0.08)",
                  }}
                  aria-hidden
                />
              </div>
            ) : (
              <Image
                src={`/images/product/${product.slug}.png`}
                alt={
                  PRODUCT_IMAGE_ALT[product.slug] ??
                  `${product.name} Thai herbal inhaler`
                }
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            )}
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
                fontSize: product.isBundle
                  ? "clamp(1.75rem, 4vw, 2.75rem)"
                  : "clamp(2.5rem, 5vw, 4rem)",
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
            {product.isBundle ? (
              <div className="mb-8">
                <h2 className="font-heading font-bold text-tiger-cream text-sm tracking-[0.14em] uppercase mb-5">
                  What&apos;s Inside
                </h2>
                <div className="space-y-5">
                  {ingredientGroups.map(({ category, ingredients }) => (
                    <div key={category}>
                      <h3
                        className="font-heading font-semibold text-xs tracking-[0.16em] uppercase mb-2"
                        style={{ color: "#C9940A" }}
                      >
                        {category}
                      </h3>
                      <ul className="flex flex-wrap gap-x-3 gap-y-1.5 list-none p-0 m-0">
                        {ingredients.map((ing) => (
                          <li key={ing.slug}>
                            {ing.isLink ? (
                              <Link
                                href={`/ingredients/${ing.slug}`}
                                className="text-sm font-sans text-tiger-muted hover:text-tiger-gold transition-colors duration-200 cursor-pointer"
                              >
                                {ing.name}
                              </Link>
                            ) : (
                              <span className="text-sm font-sans text-tiger-muted">
                                {ing.name}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-tiger-muted text-sm font-sans mb-8">
                <span
                  className="font-semibold"
                  style={{ color: "rgba(242,230,196,0.5)" }}
                >
                  Ingredients:{" "}
                </span>
                {product.ingredientSlugs.map((ingredientSlug, i) => {
                  const ingredient = getIngredientBySlug(ingredientSlug);
                  const displayName =
                    ingredientSlug === "fuji-pear-tea"
                      ? "Fuji Pear Tea"
                      : ingredient
                        ? getIngredientName(ingredient.title)
                        : ingredientSlug;
                  const isLink =
                    ingredient && ingredientSlug !== "fuji-pear-tea";
                  return (
                    <span key={ingredientSlug}>
                      {i > 0 && ", "}
                      {isLink ? (
                        <Link
                          href={`/ingredients/${ingredientSlug}`}
                          className="hover:text-tiger-gold transition-colors duration-200 cursor-pointer"
                        >
                          {displayName}
                        </Link>
                      ) : (
                        displayName
                      )}
                    </span>
                  );
                })}
              </p>
            )}

            {/* Price + CTA */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              {product.isBundle && (
                <>
                  <span className="font-heading text-tiger-muted text-xl line-through decoration-tiger-muted/60">
                    ${BUNDLE_LIST_PRICE}
                  </span>
                  <span className="font-heading font-bold text-tiger-gold text-4xl">
                    ${product.price}
                  </span>
                  <span
                    className="inline-block text-xs font-heading font-bold tracking-[0.12em] uppercase px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: "rgba(201,148,10,0.15)",
                      color: "#C9940A",
                      border: "1px solid rgba(201,148,10,0.35)",
                    }}
                  >
                    Save ${BUNDLE_SAVINGS}
                  </span>
                </>
              )}
              {!product.isBundle && (
                <span className="font-heading font-bold text-tiger-gold text-4xl">
                  ${product.price}
                </span>
              )}
              <AddToCartButton
                product={product}
                className="flex-1 min-w-[140px] font-heading font-bold text-sm tracking-[0.14em] uppercase py-4 rounded-full transition-all duration-200 cursor-pointer active:scale-95"
                style={{
                  backgroundColor: product.accentColor,
                  color: "#0D0B08",
                }}
                aria-label={`Add ${product.name} to cart, $${product.price}`}
              >
                Add to Cart
              </AddToCartButton>
            </div>

            {/* Trust badges */}
            <div className="w-full">
              <p className="hidden md:flex flex-wrap items-center justify-start gap-x-2 text-xs font-sans text-tiger-muted tracking-wide">
                <span>Free shipping over $50</span>
                <span style={{ color: "#C9940A" }} aria-hidden="true">
                  ·
                </span>
                <span>12+ month shelf life</span>
                <span style={{ color: "#C9940A" }} aria-hidden="true">
                  ·
                </span>
                <span>Thai-sourced ingredients</span>
              </p>
              <ul className="flex md:hidden flex-col gap-1.5 list-none p-0 m-0 text-xs font-sans text-tiger-muted tracking-wide">
                <li className="flex items-start gap-2">
                  <span style={{ color: "#C9940A" }} aria-hidden="true">
                    ✦
                  </span>
                  <span>Free shipping over $50</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "#C9940A" }} aria-hidden="true">
                    ✦
                  </span>
                  <span>12+ month shelf life</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "#C9940A" }} aria-hidden="true">
                    ✦
                  </span>
                  <span>Thai-sourced ingredients</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bundle: everything in the set */}
        {product.isBundle && (
          <section aria-labelledby="set-contents-heading" className="mb-16">
            <h2
              id="set-contents-heading"
              className="font-heading font-bold text-tiger-cream text-2xl uppercase tracking-wide mb-8"
            >
              Everything in the Set
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {SET_PRODUCTS.map((item) => (
                <Link
                  key={item.slug}
                  href={`/products/${item.slug}`}
                  className="group block rounded-2xl border bg-tiger-surface overflow-hidden transition-all duration-200 cursor-pointer hover:border-tiger-gold/50"
                  style={{ borderColor: `${item.accentColor}40` }}
                >
                  <div className="relative aspect-square bg-[#141210]">
                    <Image
                      src={`/images/product/${item.slug}.png`}
                      alt={`${item.name} Thai herbal inhaler`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-200"
                    />
                  </div>
                  <div className="p-3.5">
                    <h3 className="font-heading font-bold text-sm text-tiger-cream uppercase tracking-wide group-hover:text-tiger-gold transition-colors duration-200 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-tiger-muted text-xs font-sans leading-snug line-clamp-2">
                      {item.tagline}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <p className="text-center">
              <Link
                href="/shop"
                className="text-sm font-sans text-tiger-gold hover:text-tiger-gold-light transition-colors duration-200 cursor-pointer"
              >
                Prefer to try a single scent? Explore individual inhalers
              </Link>
            </p>
          </section>
        )}

        {/* Related scents (non-bundle only) */}
        {!product.isBundle && related.length > 0 && (
          <section aria-labelledby="related-heading">
            <h2
              id="related-heading"
              className="font-heading font-bold text-tiger-cream text-2xl uppercase tracking-wide mb-8"
            >
              Explore More Scents
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((r) => (
                <ScentCard key={r.slug} scent={r} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
