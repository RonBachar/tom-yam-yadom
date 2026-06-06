import { NextResponse } from "next/server";
import Stripe from "stripe";
import { ALL_PRODUCTS } from "../../data/products";

const BASE_URL = "https://www.tomyamyadomherbals.com";

const productBySlug = new Map(ALL_PRODUCTS.map((product) => [product.slug, product]));

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
      const imageUrl = toAbsoluteImageUrl(product.image ?? item.image);

      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            ...(imageUrl ? { images: [imageUrl] } : {}),
          },
          unit_amount: unitAmountCents,
        },
        quantity,
      });
    }

    const FREE_SHIPPING_THRESHOLD_CENTS = 5000;
    const qualifiesForFreeShipping = subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS;

    const shippingOptions = [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: qualifiesForFreeShipping ? 0 : 599,
            currency: "usd",
          },
          display_name: qualifiesForFreeShipping
            ? "Free Standard Shipping (5-7 business days)"
            : "Standard Shipping (5-7 business days)",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 5 },
            maximum: { unit: "business_day", value: 7 },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1199,
            currency: "usd",
          },
          display_name: "Expedited Shipping (1-3 business days)",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 1 },
            maximum: { unit: "business_day", value: 3 },
          },
        },
      },
    ];

    const stripe = new Stripe(secretKey);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${BASE_URL}/order-confirmed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/cart`,
      shipping_options: shippingOptions,
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
