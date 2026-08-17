import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import {
  ORDER_CONFIRMATION_FROM,
  buildOrderSummary,
  formatUsd,
  mapLineItems,
  orderConfirmationHtml,
} from "../../../lib/orderConfirmationEmail";

export const runtime = "nodejs";

const FROM = ORDER_CONFIRMATION_FROM;
const INTERNAL_TO = "info@tomyamyadomherbals.com";

function fulfillmentEmailText(order) {
  const items = order.items
    .map(
      (item) =>
        `- ${item.name} x${item.quantity} (${formatUsd(item.amountCents)})`
    )
    .join("\n");

  const address = order.addressLines.length
    ? order.addressLines.join("\n")
    : "No shipping address on the session.";

  return [
    "New order received. This order needs to be fulfilled and shipped.",
    "",
    `Customer: ${order.customerName}`,
    `Email: ${order.customerEmail || "Not provided"}`,
    "",
    "Shipping address:",
    address,
    "",
    "Items:",
    items || "- No line items found",
    "",
    `Shipping method: ${order.shippingMethod}`,
    `Shipping cost: ${order.shippingCents === 0 ? "Free" : formatUsd(order.shippingCents)}`,
    `Total paid: ${formatUsd(order.totalCents)}`,
    "",
    `Stripe payment ID: ${order.paymentId}`,
    `Checkout session ID: ${order.sessionId}`,
  ].join("\n");
}

function logOrderForFollowUp(order, extra) {
  console.error("[stripe-webhook] Order details for manual follow-up:", {
    sessionId: order.sessionId,
    paymentId: order.paymentId,
    customerName: order.customerName,
    customerEmail: order.customerEmail,
    items: order.items,
    shippingMethod: order.shippingMethod,
    shippingCents: order.shippingCents,
    totalCents: order.totalCents,
    addressLines: order.addressLines,
    ...extra,
  });
}

async function sendResendEmail(resend, label, payload) {
  console.log(`[stripe-webhook] Sending ${label} to:`, payload.to);

  const { data, error } = await resend.emails.send(payload);

  if (error) {
    console.error(`[stripe-webhook] ${label} failed:`, error);
    throw new Error(error.message || `Failed to send ${label}`);
  }

  console.log(`[stripe-webhook] ${label} sent successfully:`, data?.id ?? data);
  return data;
}

async function handleCheckoutCompleted(stripe, sessionFromEvent) {
  const session = await stripe.checkout.sessions.retrieve(sessionFromEvent.id, {
    expand: [
      "line_items",
      "line_items.data.price.product",
      "shipping_cost.shipping_rate",
      "discounts.promotion_code",
    ],
  });

  let rawLineItems = session.line_items?.data ?? [];
  if (rawLineItems.length === 0) {
    const listed = await stripe.checkout.sessions.listLineItems(session.id, {
      limit: 100,
      expand: ["data.price.product"],
    });
    rawLineItems = listed.data ?? [];
  }

  const order = buildOrderSummary(session, mapLineItems(rawLineItems));

  console.log("[stripe-webhook] checkout.session.completed", {
    sessionId: order.sessionId,
    paymentId: order.paymentId,
    email: order.customerEmail,
    totalCents: order.totalCents,
    itemCount: order.items.length,
    discountCents: order.discountCents,
    promoCode: order.promoCode,
  });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "[stripe-webhook] RESEND_API_KEY is not configured. Emails were not sent."
    );
    logOrderForFollowUp(order, { reason: "missing_resend_api_key" });
    return;
  }

  const resend = new Resend(apiKey);

  if (order.customerEmail) {
    try {
      await sendResendEmail(resend, "customer order confirmation", {
        from: FROM,
        to: [order.customerEmail],
        subject: "Your Tom Yam Yadom order is confirmed",
        html: orderConfirmationHtml(order),
      });
    } catch (error) {
      console.error(
        "[stripe-webhook] Customer confirmation email failed:",
        error
      );
      logOrderForFollowUp(order, { reason: "customer_email_failed" });
    }
  } else {
    console.error(
      "[stripe-webhook] No customer email on session. Confirmation was not sent."
    );
    logOrderForFollowUp(order, { reason: "missing_customer_email" });
  }

  try {
    await sendResendEmail(resend, "internal fulfillment notification", {
      from: FROM,
      to: [INTERNAL_TO],
      subject: `New order: ${order.customerName} - ${formatUsd(order.totalCents)}`,
      text: fulfillmentEmailText(order),
    });
  } catch (error) {
    console.error(
      "[stripe-webhook] Internal fulfillment email failed:",
      error
    );
    logOrderForFollowUp(order, { reason: "internal_email_failed" });
  }
}

export async function POST(request) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!secretKey || !webhookSecret) {
      console.error(
        "[stripe-webhook] Missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET."
      );
      return NextResponse.json(
        { error: "Stripe webhook is not configured." },
        { status: 500 }
      );
    }

    const rawBody = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      console.error("[stripe-webhook] Missing stripe-signature header.");
      return NextResponse.json(
        { error: "Missing stripe-signature header." },
        { status: 400 }
      );
    }

    const stripe = new Stripe(secretKey);
    let event;

    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.error("[stripe-webhook] Signature verification failed:", message);
      return NextResponse.json(
        { error: `Webhook signature verification failed: ${message}` },
        { status: 400 }
      );
    }

    if (event.type !== "checkout.session.completed") {
      return NextResponse.json({ received: true }, { status: 200 });
    }

    await handleCheckoutCompleted(stripe, event.data.object);

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("[stripe-webhook] Unexpected error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed." },
      { status: 500 }
    );
  }
}
