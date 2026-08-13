import { ALL_PRODUCTS } from "../data/products";
import { INGREDIENTS, getIngredientName } from "../data/ingredients";
import { SHIPPING_POLICY, RETURN_POLICY } from "../data/policies";
import { getAllPosts } from "../../lib/blog";

const BASE_URL = "https://www.tomyamyadomherbals.com";

/** Replace em/en dashes so generated text never contains them. */
function scrubDashes(text) {
  return String(text ?? "")
    .replace(/\u2014/g, ",") // em dash
    .replace(/\u2013/g, ",") // en dash
    .replace(/—/g, ",")
    .replace(/–/g, ",")
    .replace(/\s+,/g, ",")
    .replace(/,\s*,+/g, ",")
    .trim();
}

function buildLlmsTxt() {
  const lines = [];
  const scents = ALL_PRODUCTS.filter((p) => !p.isOil && !p.isBundle);
  const oil = ALL_PRODUCTS.find((p) => p.isOil);
  const bundle = ALL_PRODUCTS.find((p) => p.isBundle);
  const scentPrices = scents.map((p) => p.price);
  const scentPriceMin = Math.min(...scentPrices);
  const scentPriceMax = Math.max(...scentPrices);
  const scentPriceLabel =
    scentPriceMin === scentPriceMax
      ? `USD $${scentPriceMin} each`
      : `USD $${scentPriceMin} to $${scentPriceMax} each`;
  const returnShipping = RETURN_POLICY.merchantCoversReturn
    ? "free return shipping"
    : "return shipping not covered";

  lines.push("# Tom Yam Yadom");
  lines.push("");
  lines.push(
    "> Handcrafted organic Thai herbal inhalers (yadom), rooted in Koh Samui, Thailand tradition. The Smiling Tiger line offers 7 scents plus a concentrated Crown Blend oil, used for focus, breathing clarity, sensory grounding, and as a natural hand-to-mouth alternative to smoking. Currently shipping within the United States.",
  );
  lines.push("");
  lines.push("Key facts:");
  lines.push("");
  lines.push(
    `- Products: ${scents.length} herbal inhaler scents (${scentPriceLabel}), Crown Blend concentrated oil (USD $${oil.price}), Complete Ritual Set with all ${scents.length} scents + Crown Blend oil (USD $${bundle.price})`,
  );
  lines.push(
    "- Ingredients: organic botanicals including menthol, camphor, borneol, cloves, cardamom, Thai ginger, makrut lime, jasmine",
  );
  lines.push(
    "- Yadom is a traditional Thai herbal nasal inhaler with centuries of history. It is not a medicine and makes no therapeutic claims",
  );
  lines.push(
    "- Common use cases: focus while working, pre-training rituals in Muay Thai, festivals, quitting smoking (nicotine-free hand-to-mouth ritual), grounding when overwhelmed",
  );
  lines.push(
    `- Shipping: United States only. USD $${SHIPPING_POLICY.standard.price} flat rate, free shipping on orders over USD $${SHIPPING_POLICY.freeThreshold}`,
  );
  lines.push(
    `- Returns: ${RETURN_POLICY.windowDays}-day returns on any item, ${returnShipping}, refunds within ${RETURN_POLICY.refundDays} days`,
  );
  lines.push(
    "- Contact: info@tomyamyadomherbals.com. Wholesale program available",
  );
  lines.push("");

  lines.push("## Products");
  lines.push("");
  lines.push(
    `- [Shop all products](${BASE_URL}/shop): Full catalog of Smiling Tiger inhalers and oils`,
  );
  for (const product of ALL_PRODUCTS) {
    lines.push(
      `- [${scrubDashes(product.name)}](${BASE_URL}/products/${product.slug}): ${scrubDashes(product.tagline)} (USD $${product.price})`,
    );
  }
  lines.push("");

  lines.push("## Guides");
  lines.push("");
  const posts = getAllPosts();
  for (const post of posts) {
    const title = scrubDashes(post.title);
    const description = scrubDashes(post.description || "");
    const suffix = description ? `: ${description}` : "";
    lines.push(`- [${title}](${BASE_URL}/blog/${post.slug})${suffix}`);
  }
  lines.push(`- [All articles](${BASE_URL}/blog): Full blog index`);
  lines.push("");

  lines.push("## Ingredients");
  lines.push("");
  lines.push(
    `- [Ingredient library](${BASE_URL}/ingredients): All botanicals used across the Smiling Tiger line`,
  );
  for (const ingredient of INGREDIENTS) {
    const name = scrubDashes(getIngredientName(ingredient.title));
    lines.push(`- [${name}](${BASE_URL}/ingredients/${ingredient.slug})`);
  }
  lines.push("");

  lines.push("## Company");
  lines.push("");
  lines.push(
    `- [Our story](${BASE_URL}/story): Why we handcraft in Koh Samui and how we source botanicals`,
  );
  lines.push(
    `- [Wholesale](${BASE_URL}/wholesale): Wholesale tiers for retailers, gyms, and studios`,
  );
  lines.push(
    `- [Shipping](${BASE_URL}/shipping): Shipping, returns, and delivery information`,
  );
  lines.push("");

  lines.push("## Optional");
  lines.push("");
  lines.push(`- [Privacy policy](${BASE_URL}/privacy)`);
  lines.push(`- [Terms of service](${BASE_URL}/terms)`);
  lines.push("");

  return lines.join("\n");
}

export const dynamic = "force-static";

export function GET() {
  const body = buildLlmsTxt();
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
