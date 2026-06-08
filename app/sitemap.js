import { getAllPosts, CATEGORIES } from "../lib/blog";

const BASE_URL = "https://www.tomyamyadomherbals.com";

const PRODUCT_SLUGS = [
  "compassion",
  "vitality",
  "radiance",
  "balance",
  "power",
  "clarity",
  "serenity",
  "crown-blend",
];

const INGREDIENT_SLUGS = [
  "menthol",
  "cloves",
  "aromatic-curcuma",
  "cardamom",
  "camphor",
  "borneol",
  "lotus-root",
  "peppermint-oil",
  "kaffir-lime-skin",
  "tangerine-zest",
  "orange-blossom",
  "cinnamon",
  "pink-peppercorn",
  "white-peppercorn",
  "thai-ginger",
  "wasabi-extract",
  "rose-hips",
  "jasmine",
  "thai-royal-basil",
];

export default function sitemap() {
  const lastModified = new Date();

  const staticRoutes = [
    {
      url: `${BASE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/shop`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/ingredients`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/story`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/wholesale`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/shipping`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const productRoutes = PRODUCT_SLUGS.map((slug) => ({
    url: `${BASE_URL}/products/${slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const ingredientRoutes = INGREDIENT_SLUGS.map((slug) => ({
    url: `${BASE_URL}/ingredients/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Blog posts — derived from actual files in content/blog/
  const posts = getAllPosts();
  const blogPostRoutes = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Category archive pages — one per defined category
  const categoryRoutes = Object.keys(CATEGORIES).map((category) => ({
    url: `${BASE_URL}/blog/category/${category}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...productRoutes,
    ...ingredientRoutes,
    ...blogPostRoutes,
    ...categoryRoutes,
  ];
}
