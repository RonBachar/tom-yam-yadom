import Link from "next/link";
import Image from "next/image";
import { CATEGORIES, formatDate } from "../../../lib/blog";

export default function PostCard({ post }) {
  const categoryLabel = CATEGORIES[post.category] ?? post.category;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl border border-tiger-border bg-tiger-surface hover:border-tiger-gold/40 transition-all duration-200 overflow-hidden cursor-pointer"
    >
      {/* Cover image */}
      {post.coverImage ? (
        <div className="relative w-full overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt || post.title}
            width={post.coverImageWidth ?? 1200}
            height={post.coverImageHeight ?? 675}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            className="w-full h-auto max-w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div
          className="w-full aspect-video flex items-center justify-center"
          style={{ background: "rgba(201,148,10,0.05)", borderBottom: "1px solid rgba(201,148,10,0.08)" }}
        >
          <span
            className="font-heading font-bold text-tiger-gold/20 select-none"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
            aria-hidden="true"
          >
            TYY
          </span>
        </div>
      )}

      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Category + date */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-heading font-bold tracking-[0.1em] uppercase text-tiger-gold/80">
            {categoryLabel}
          </span>
          {post.publishedAt && (
            <span className="text-xs font-sans text-tiger-muted/60">
              {formatDate(post.publishedAt)}
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="font-heading font-bold text-tiger-cream text-lg leading-snug group-hover:text-tiger-gold transition-colors duration-200">
          {post.title}
        </h2>

        {/* Excerpt */}
        {post.description && (
          <p className="text-tiger-muted text-sm font-sans leading-relaxed line-clamp-3 flex-1">
            {post.description}
          </p>
        )}

        {/* Read link */}
        <span className="text-tiger-gold text-xs font-heading font-bold tracking-[0.1em] uppercase mt-auto pt-1">
          Read &rarr;
        </span>
      </div>
    </Link>
  );
}
