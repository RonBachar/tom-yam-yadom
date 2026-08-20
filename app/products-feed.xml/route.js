import { ALL_PRODUCTS, getProductImageSrc } from "../data/products";
import { SHIPPING_POLICY } from "../data/policies";

const BASE_URL = "https://www.tomyamyadomherbals.com";

/** Google product taxonomy ID: Health & Beauty > Personal Care. */
const GOOGLE_PRODUCT_CATEGORY = "2915";

const PRODUCT_TYPE_INHALER = "Personal Care > Aromatherapy Inhalers";
const PRODUCT_TYPE_OIL = "Personal Care > Aromatherapy Oils";

/**
 * Escape text for XML element content and attribute-safe values.
 * Also strips HTML tags so descriptions stay plain text.
 */
function escapeXml(text) {
  return String(text ?? "")
    .replace(/<[^>]*>/g, "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatPriceUsd(amount) {
  return `${Number(amount).toFixed(2)} USD`;
}

function productTitle(product) {
  if (product.isOil) {
    return `${product.name} Herbal Oil`;
  }
  return `${product.name} Thai Herbal Inhaler`;
}

function productType(product) {
  return product.isOil ? PRODUCT_TYPE_OIL : PRODUCT_TYPE_INHALER;
}

function buildFeed() {
  const skipped = [];
  const items = [];

  const shippingPrice = formatPriceUsd(SHIPPING_POLICY.standard.price);

  for (const product of ALL_PRODUCTS) {
    if (product.isBundle) {
      skipped.push({
        slug: product.slug,
        reason: "isBundle true (excluded from Merchant Center single-product feed)",
      });
      continue;
    }

    const imageSrc = getProductImageSrc(product.slug);
    if (!imageSrc) {
      skipped.push({
        slug: product.slug,
        reason: "missing image",
      });
      continue;
    }

    const title = escapeXml(productTitle(product));
    const description = escapeXml(product.description);
    const link = `${BASE_URL}/products/${product.slug}`;
    const imageLink = `${BASE_URL}${imageSrc}`;

    items.push(`    <item>
      <g:id>${escapeXml(product.slug)}</g:id>
      <g:title>${title}</g:title>
      <g:description>${description}</g:description>
      <g:link>${escapeXml(link)}</g:link>
      <g:image_link>${escapeXml(imageLink)}</g:image_link>
      <g:availability>in stock</g:availability>
      <g:price>${formatPriceUsd(product.price)}</g:price>
      <g:brand>Tom Yam Yadom</g:brand>
      <g:condition>new</g:condition>
      <g:google_product_category>${GOOGLE_PRODUCT_CATEGORY}</g:google_product_category>
      <g:product_type>${escapeXml(productType(product))}</g:product_type>
      <g:shipping>
        <g:country>US</g:country>
        <g:service>Standard</g:service>
        <g:price>${shippingPrice}</g:price>
      </g:shipping>
    </item>`);
  }

  if (skipped.length > 0) {
    console.warn(
      "[products-feed.xml] Skipped products:",
      skipped.map((s) => `${s.slug} (${s.reason})`).join("; "),
    );
  }

  const channelDescription = escapeXml(
    "Product feed for Tom Yam Yadom Thai herbal inhalers and Crown Blend oil. United States shipping only.",
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Tom Yam Yadom Product Feed</title>
    <link>${BASE_URL}</link>
    <description>${channelDescription}</description>
${items.join("\n")}
  </channel>
</rss>
`;
}

export const dynamic = "force-static";

export function GET() {
  const body = buildFeed();
  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
