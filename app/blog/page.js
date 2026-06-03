import Link from "next/link";
import { getAllPosts, CATEGORIES } from "../../lib/blog";
import PostCard from "../components/blog/PostCard";

const BASE_URL = "https://www.tomyamyadomherbals.com";

export const metadata = {
  title: "The Journal | Tom Yam Yadom",
  description:
    "Guides on focus rituals, Muay Thai breathing, Thai herbal tradition, and the culture behind yadom. Under 160 characters.",
  alternates: { canonical: `${BASE_URL}/blog` },
  openGraph: {
    title: "The Journal | Tom Yam Yadom",
    description:
      "Guides on focus rituals, Muay Thai breathing, Thai herbal tradition, and the culture behind yadom.",
    url: `${BASE_URL}/blog`,
    siteName: "Tom Yam Yadom",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <p className="text-tiger-gold text-xs font-heading font-bold tracking-[0.2em] uppercase mb-3">
            The Journal
          </p>
          <h1
            className="font-heading font-bold text-tiger-cream leading-tight mb-4"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)" }}
          >
            Thai Herbal Wisdom
          </h1>
          <p className="text-tiger-muted font-sans max-w-xl">
            Focus rituals, breathing techniques, the history of yadom, and
            guides for getting the most out of every inhale.
          </p>
        </div>

        {/* Category navigation */}
        <nav
          className="flex flex-wrap gap-2 mb-12"
          aria-label="Browse by category"
        >
          {Object.entries(CATEGORIES).map(([slug, label]) => (
            <Link
              key={slug}
              href={`/blog/category/${slug}`}
              className="text-xs font-heading font-bold tracking-[0.1em] uppercase px-4 py-2 rounded-full border border-tiger-border text-tiger-muted hover:border-tiger-gold/50 hover:text-tiger-gold transition-all duration-200 cursor-pointer"
            >
              {label}
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
          <div className="py-24 text-center">
            <p className="text-tiger-muted font-sans">
              The first articles are being prepared. Check back soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
