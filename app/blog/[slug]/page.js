import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import {
  getAllSlugs,
  getPostBySlug,
  getPostsByCategory,
  CATEGORIES,
  formatDate,
} from "../../../lib/blog";
import { mdxComponents } from "../../components/blog/MDXComponents";
import PostCard from "../../components/blog/PostCard";

const BASE_URL = "https://www.tomyamyadomherbals.com";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const { frontmatter: fm } = post;
  const url = `${BASE_URL}/blog/${slug}`;
  const metaTitle = fm.metaTitle ?? fm.title;
  const coverImageEntry = fm.coverImage
    ? {
        url: fm.coverImage.startsWith("http")
          ? fm.coverImage
          : `${BASE_URL}${fm.coverImage}`,
        alt: fm.coverImageAlt,
        ...(fm.coverImageWidth ? { width: fm.coverImageWidth } : {}),
        ...(fm.coverImageHeight ? { height: fm.coverImageHeight } : {}),
      }
    : null;

  return {
    title: `${metaTitle} | Tom Yam Yadom`,
    description: fm.description,
    keywords: fm.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: metaTitle,
      description: fm.description,
      url,
      siteName: "Tom Yam Yadom",
      type: "article",
      publishedTime: fm.publishedAt,
      modifiedTime: fm.updatedAt,
      authors: [fm.author ?? "Tom Yam Yadom"],
      ...(coverImageEntry ? { images: [coverImageEntry] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: fm.description,
      ...(coverImageEntry ? { images: [coverImageEntry.url] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { frontmatter: fm, mdxBody } = post;
  const categoryLabel = CATEGORIES[fm.category] ?? fm.category;

  const related = getPostsByCategory(fm.category)
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  // BlogPosting JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: fm.title,
    description: fm.description,
    ...(fm.coverImage ? { image: fm.coverImage } : {}),
    datePublished: fm.publishedAt,
    dateModified: fm.updatedAt ?? fm.publishedAt,
    author: {
      "@type": "Organization",
      name: "Tom Yam Yadom",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Tom Yam Yadom",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logos/logo.jpg`,
      },
    },
    url: `${BASE_URL}/blog/${slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${slug}`,
    },
    keywords: Array.isArray(fm.keywords) ? fm.keywords.join(", ") : fm.keywords,
  };

  const howToJsonLd = fm.howTo
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        ...fm.howTo,
      }
    : null;

  return (
    <div className="pt-32 pb-24 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {howToJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
      )}

      <div className="max-w-2xl mx-auto">

        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-xs font-sans text-tiger-muted mb-10"
          aria-label="Breadcrumb"
        >
          <Link href="/blog" className="hover:text-tiger-cream transition-colors cursor-pointer">
            The Journal
          </Link>
          <span aria-hidden="true">/</span>
          {fm.category && (
            <>
              <Link
                href={`/blog/category/${fm.category}`}
                className="hover:text-tiger-cream transition-colors cursor-pointer"
              >
                {categoryLabel}
              </Link>
              <span aria-hidden="true">/</span>
            </>
          )}
          <span className="text-tiger-cream line-clamp-1">{fm.title}</span>
        </nav>

        {/* Post header */}
        <header className="mb-10">
          {fm.category && (
            <Link
              href={`/blog/category/${fm.category}`}
              className="inline-block text-xs font-heading font-bold tracking-[0.12em] uppercase text-tiger-gold/80 hover:text-tiger-gold transition-colors mb-4 cursor-pointer"
            >
              {categoryLabel}
            </Link>
          )}
          <h1
            className="font-heading font-bold text-tiger-cream leading-tight mb-4"
            style={{ fontSize: "clamp(1.9rem, 5vw, 3.2rem)" }}
          >
            {fm.title}
          </h1>
          {fm.description && (
            <p className="text-tiger-muted font-sans text-lg leading-relaxed mb-6">
              {fm.description}
            </p>
          )}
          <div className="flex items-center gap-4 text-xs font-sans text-tiger-muted/60">
            {fm.author && <span>{fm.author}</span>}
            {fm.publishedAt && (
              <>
                <span aria-hidden="true">·</span>
                <time dateTime={fm.publishedAt}>{formatDate(fm.publishedAt)}</time>
              </>
            )}
            {fm.updatedAt && fm.updatedAt !== fm.publishedAt && (
              <>
                <span aria-hidden="true">·</span>
                <span>Updated {formatDate(fm.updatedAt)}</span>
              </>
            )}
          </div>
        </header>

        {/* Cover image */}
        {fm.coverImage && (
          <div className="relative w-full rounded-2xl overflow-hidden mb-12">
            <Image
              src={fm.coverImage}
              alt={fm.coverImageAlt || fm.title}
              width={fm.coverImageWidth ?? 1200}
              height={fm.coverImageHeight ?? 675}
              sizes="(max-width: 768px) 100vw, 672px"
              className="w-full h-auto max-w-full object-cover"
              priority
            />
          </div>
        )}

        {/* Divider */}
        <div
          className="w-12 h-0.5 mb-10"
          style={{ backgroundColor: "rgba(201,148,10,0.4)" }}
        />

        {/* MDX content */}
        <article className="min-w-0">
          <MDXRemote
            source={mdxBody}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />
        </article>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-tiger-border">
          <Link
            href="/blog"
            className="text-tiger-gold text-sm font-heading font-bold tracking-[0.1em] uppercase hover:text-tiger-gold-light transition-colors cursor-pointer"
          >
            &larr; Back to The Journal
          </Link>
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div className="max-w-5xl mx-auto mt-20">
          <h2 className="font-heading font-bold text-tiger-cream text-2xl uppercase tracking-wide mb-8">
            More in {categoryLabel}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
