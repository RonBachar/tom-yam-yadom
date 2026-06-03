import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export const CATEGORIES = {
  "focus-rituals":  "Focus Rituals",
  "combat-sports":  "Combat Sports",
  "festival":       "Festival",
  "quit-smoking":   "Quit Smoking",
  "thai-tradition": "Thai Tradition",
};

export const CATEGORY_DESCRIPTIONS = {
  "focus-rituals":
    "Scent rituals, breathing techniques, and herbal tools for deep focus and flow state.",
  "combat-sports":
    "How Thai herbal inhalers are used in Muay Thai, MMA, and combat sports training.",
  "festival":
    "The role of yadom in Thai festivals, nightlife, and shared sensory experience.",
  "quit-smoking":
    "Using herbal aromatherapy as a satisfying, healthier alternative to cigarettes.",
  "thai-tradition":
    "The deep roots of yadom in Thai herbal medicine and a thousand years of cultural practice.",
};

/**
 * Return frontmatter for every post, sorted newest-first.
 * Safe to call at build time (Server Component or generateStaticParams).
 */
export function getAllPosts() {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
      const { data } = matter(raw);
      return {
        ...data,
        slug: data.slug || filename.replace(/\.mdx$/, ""),
      };
    })
    .filter((p) => p.publishedAt)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}

/**
 * Return frontmatter + raw MDX body (without frontmatter) for a single post.
 */
export function getPostBySlug(slug) {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data: frontmatter, content: mdxBody } = matter(raw);

  return {
    frontmatter: {
      ...frontmatter,
      slug: frontmatter.slug || slug,
    },
    mdxBody,
  };
}

export function getPostsByCategory(category) {
  return getAllPosts().filter((p) => p.category === category);
}

export function getAllSlugs() {
  return getAllPosts().map((p) => p.slug);
}

/** ISO date string "YYYY-MM-DD" → human "June 1, 2026" */
export function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    year:  "numeric",
    month: "long",
    day:   "numeric",
    timeZone: "UTC",
  });
}
