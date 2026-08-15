import { NextResponse } from "next/server";
import Stripe from "stripe";
import { ALL_PRODUCTS, getProductImageUrl } from "../../data/products";
import { SHIPPING_POLICY } from "../../data/policies";

const BASE_URL = "https://www.tomyamyadomherbals.com";

const productBySlug = new Map(ALL_PRODUCTS.map((product) => [product.slug, product]));

const FREE_SHIPPING_THRESHOLD_CENTS = Math.round(
  SHIPPING_POLICY.freeThreshold * 100,
);
const STANDARD_SHIPPING_CENTS = Math.round(SHIPPING_POLICY.standard.price * 100);
const EXPEDITED_SHIPPING_CENTS = Math.round(
  SHIPPING_POLICY.expedited.price * 100,
);

function toAbsoluteImageUrl(image) {
  if (!image || typeof image !== "string") return null;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  return `${BASE_URL}${image.startsWith("/") ? image : `/${image}`}`;
}

export async function POST(request) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        { error: "Stripe is not configured." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const items = Array.isArray(body) ? body : null;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
    }

    const lineItems = [];
    let subtotalCents = 0;

    for (const item of items) {
      if (!item?.slug || typeof item.quantity !== "number") {
        return NextResponse.json(
          { error: "Invalid cart item." },
          { status: 400 }
        );
      }

      const product = productBySlug.get(item.slug);
      if (!product) {
        return NextResponse.json(
          { error: `Unknown product: ${item.slug}` },
          { status: 400 }
        );
      }

      const quantity = Math.max(1, Math.floor(item.quantity));
      const unitAmountCents = Math.round(product.price * 100);
      subtotalCents += unitAmountCents * quantity;
      const imageUrl =
        getProductImageUrl(product.slug) ||
        toAbsoluteImageUrl(product.image ?? item.image);

      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            metadata: {
              slug: product.slug,
            },
            ...(imageUrl ? { images: [imageUrl] } : {}),
          },
          unit_amount: unitAmountCents,
        },
        quantity,
      });
    }

    const qualifiesForFreeShipping =
      subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS;
    const standardTransitDays = SHIPPING_POLICY.standard.transitDays;
    const expeditedTransitMin = SHIPPING_POLICY.expedited.transitDaysMin;
    const expeditedTransitMax = SHIPPING_POLICY.expedited.transitDaysMax;

    const shippingOptions = [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: qualifiesForFreeShipping ? 0 : STANDARD_SHIPPING_CENTS,
            currency: "usd",
          },
          display_name: qualifiesForFreeShipping
            ? `Free Standard Shipping (${standardTransitDays} business days)`
            : `Standard Shipping (${standardTransitDays} business days)`,
          delivery_estimate: {
            minimum: { unit: "business_day", value: standardTransitDays },
            maximum: { unit: "business_day", value: standardTransitDays },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: EXPEDITED_SHIPPING_CENTS,
            currency: "usd",
          },
          display_name: `Expedited Shipping (${expeditedTransitMin}-${expeditedTransitMax} business days)`,
          delivery_estimate: {
            minimum: { unit: "business_day", value: expeditedTransitMin },
            maximum: { unit: "business_day", value: expeditedTransitMax },
          },
        },
      },
    ];

    const stripe = new Stripe(secretKey);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      allow_promotion_codes: true,
      success_url: `${BASE_URL}/order-confirmed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/cart`,
      shipping_options: shippingOptions,
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      billing_address_collection: "auto",
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Could not create checkout session." },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Checkout failed. Please try again." },
      { status: 500 }
    );
  }
}
