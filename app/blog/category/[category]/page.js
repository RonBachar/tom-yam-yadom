import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getPostsByCategory,
  CATEGORIES,
  CATEGORY_DESCRIPTIONS,
} from "../../../../lib/blog";
import PostCard from "../../../components/blog/PostCard";

const BASE_URL = "https://www.tomyamyadomherbals.com";

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({ category }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  if (!CATEGORIES[category]) return {};

  const label = CATEGORIES[category];
  const description = CATEGORY_DESCRIPTIONS[category] ?? `Articles about ${label} from Tom Yam Yadom.`;
  const url = `${BASE_URL}/blog/category/${category}`;

  return {
    title: `${label} | The Journal | Tom Yam Yadom`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${label} | Tom Yam Yadom Journal`,
      description,
      url,
      siteName: "Tom Yam Yadom",
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  if (!CATEGORIES[category]) notFound();

  const label = CATEGORIES[category];
  const description = CATEGORY_DESCRIPTIONS[category];
  const posts = getPostsByCategory(category);

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-xs font-sans text-tiger-muted mb-10"
          aria-label="Breadcrumb"
        >
          <Link href="/blog" className="hover:text-tiger-cream transition-colors cursor-pointer">
            The Journal
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-tiger-cream">{label}</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <p className="text-tiger-gold text-xs font-heading font-bold tracking-[0.2em] uppercase mb-3">
            Category
          </p>
          <h1
            className="font-heading font-bold text-tiger-cream leading-tight mb-4"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 4rem)" }}
          >
            {label}
          </h1>
          {description && (
            <p className="text-tiger-muted font-sans max-w-xl">{description}</p>
          )}
        </div>

        {/* Other categories */}
        <nav
          className="flex flex-wrap gap-2 mb-12"
          aria-label="Other categories"
        >
          {Object.entries(CATEGORIES)
            .filter(([slug]) => slug !== category)
            .map(([slug, lbl]) => (
              <Link
                key={slug}
                href={`/blog/category/${slug}`}
                className="text-xs font-heading font-bold tracking-[0.1em] uppercase px-4 py-2 rounded-full border border-tiger-border text-tiger-muted hover:border-tiger-gold/50 hover:text-tiger-gold transition-all duration-200 cursor-pointer"
              >
                {lbl}
              </Link>
            ))}
        </nav>

        {/* Post grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-tiger-muted font-sans">
              No articles in this category yet. Check back soon.
            </p>
            <Link
              href="/blog"
              className="inline-block mt-6 text-tiger-gold text-sm font-heading font-bold tracking-[0.1em] uppercase hover:text-tiger-gold-light transition-colors cursor-pointer"
            >
              Browse all articles &rarr;
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
