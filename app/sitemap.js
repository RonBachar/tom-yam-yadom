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
  ];

  const productRoutes = PRODUCT_SLUGS.map((slug) => ({
    url: `${BASE_URL}/products/${slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
