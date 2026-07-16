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
    "Scent rituals, breathing techniques, and natural herbal tools that help you find deep focus and flow state at work, in study, and in training.",
  "combat-sports":
    "How Thai herbal inhalers are used in Muay Thai, MMA, and boxing: pre-fight focus rituals, recovery routines, and the tradition behind them.",
  "festival":
    "Festival guides and stories: how yadom keeps you grounded, refreshed, and present through long days of music, crowds, and shared energy.",
  "quit-smoking":
    "Guides for replacing cigarettes with herbal aromatherapy: keeping the hand-to-mouth ritual and the deep breath, without the smoke and nicotine.",
  "thai-tradition":
    "The deep roots of yadom in Thai herbal medicine: ingredient histories, cultural practice, and a thousand years of aromatic tradition from Thailand.",
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
