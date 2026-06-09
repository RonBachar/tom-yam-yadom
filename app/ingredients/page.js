import Link from "next/link";
import Image from "next/image";
import {
  getIngredientImageAlt,
  getIngredientName,
  getIngredientsByCategory,
} from "../data/ingredients";
import CategoryBar from "./CategoryBar";
import { categoryToId } from "./categoryToId";

const BASE_URL = "https://www.tomyamyadomherbals.com";

export const metadata = {
  title: "The Apothecary: Thai Herbal Ingredients | Tom Yam Yadom",
  description:
    "Browse the Tom Yam Yadom Apothecary — a dictionary of Thai herbs, spices, and botanicals behind every Smiling Tiger blend, with aroma profiles and history.",
  alternates: { canonical: `${BASE_URL}/ingredients` },
  openGraph: {
    title: "The Apothecary: Thai Herbal Ingredients | Tom Yam Yadom",
    description:
      "Browse the Tom Yam Yadom Apothecary — a dictionary of Thai herbs, spices, and botanicals behind every Smiling Tiger blend, with aroma profiles and history.",
    url: `${BASE_URL}/ingredients`,
    siteName: "Tom Yam Yadom",
    locale: "en_US",
    type: "website",
  },
};

export default function IngredientsPage() {
  const categoryGroups = getIngredientsByCategory();
  const categories = categoryGroups.map(({ category }) => ({
    id: categoryToId(category),
    label: category,
  }));

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <p className="text-tiger-gold text-xs font-heading font-bold tracking-[0.2em] uppercase mb-3">
            The Apothecary
          </p>
          <h1
            className="font-heading font-bold text-tiger-cream leading-tight mb-4"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)" }}
          >
            Ingredients &amp; Origins
          </h1>
          <p className="text-tiger-muted font-sans max-w-xl">
            Every Smiling Tiger blend is built from botanicals with centuries of
            history. Explore the aromas, traditions, and stories behind each
            one.
          </p>
        </div>

        <CategoryBar categories={categories} />

        <div className="space-y-16">
          {categoryGroups.map(({ category, ingredients }) => {
            const sectionId = categoryToId(category);
            return (
              <section key={category} aria-labelledby={sectionId}>
                <h2
                  id={sectionId}
                  className="font-heading font-bold text-tiger-cream text-2xl uppercase tracking-wide mb-6 scroll-mt-[100px]"
                >
                  {category}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {ingredients.map((ingredient) => {
                    const name = getIngredientName(ingredient.title);
                    return (
                      <Link
                        key={`${category}-${ingredient.slug}`}
                        href={`/ingredients/${ingredient.slug}`}
                        className="block rounded-2xl border border-tiger-border hover:border-tiger-gold/40 bg-tiger-surface transition-all duration-200 overflow-hidden cursor-pointer group"
                      >
                        <div className="relative w-full aspect-square overflow-hidden">
                          <Image
                            src={
                              ingredient.image ||
                              `/images/ingredients/${ingredient.slug}.jpg`
                            }
                            alt={getIngredientImageAlt(ingredient.slug, name)}
                            fill
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-5">
                          <h3 className="font-heading font-bold text-xl text-tiger-cream uppercase tracking-wide group-hover:text-tiger-gold transition-colors duration-200 mb-3">
                            {name}
                          </h3>
                          <p className="text-tiger-muted text-sm font-sans leading-relaxed mb-3 line-clamp-2">
                            {ingredient.aromaProfile}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {ingredient.categories.map((cat) => (
                              <span
                                key={cat}
                                className="text-xs font-heading font-bold tracking-[0.08em] px-2 py-0.5 rounded-full border border-tiger-gold/25 bg-tiger-cream/20 text-tiger-cream"
                              >
                                {cat}
                              </span>
                            ))}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
