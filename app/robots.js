const BASE_URL = "https://www.tomyamyadomherbals.com";

export default function robots() {
  return {
    rules: [
      // AI assistants and answer engines — explicitly welcome for GEO
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "ClaudeBot",
          "Claude-Web",
          "anthropic-ai",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
          "cohere-ai",
          "meta-externalagent",
        ],
        allow: "/",
        disallow: ["/cart", "/order-confirmed", "/internal"],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/cart", "/order-confirmed", "/internal"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
