import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { ALL_PRODUCTS } from "../../../data/products";
import { SHIPPING_POLICY } from "../../../data/policies";

export const runtime = "nodejs";

const FROM = "Tom Yam Yadom <info@tomyamyadomherbals.com>";
const INTERNAL_TO = "info@tomyamyadomherbals.com";
const CONTACT_EMAIL = "info@tomyamyadomherbals.com";

const productBySlug = new Map(ALL_PRODUCTS.map((product) => [product.slug, product]));
const productByName = new Map(ALL_PRODUCTS.map((product) => [product.name, product]));

const STANDARD_SHIPPING_CENTS = Math.round(SHIPPING_POLICY.standard.price * 100);
const EXPEDITED_SHIPPING_CENTS = Math.round(SHIPPING_POLICY.expedited.price * 100);

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatUsd(cents) {
  return `$${((cents ?? 0) / 100).toFixed(2)}`;
}

function getExpandableId(value) {
  if (!value) return null;
  return typeof value === "string" ? value : value.id ?? null;
}

function getStripeProduct(lineItem) {
  const product = lineItem?.price?.product;
  if (product && typeof product === "object") return product;
  return null;
}

function matchCatalogProduct(lineItem) {
  const stripeProduct = getStripeProduct(lineItem);
  const slug = stripeProduct?.metadata?.slug;
  if (slug && productBySlug.has(slug)) {
    return productBySlug.get(slug);
  }

  const name = stripeProduct?.name || lineItem?.description;
  if (name && productByName.has(name)) {
    return productByName.get(name);
  }

  return null;
}

function mapLineItems(lineItems) {
  return (lineItems ?? []).map((item) => {
    const catalogProduct = matchCatalogProduct(item);
    const stripeProduct = getStripeProduct(item);
    const quantity = item.quantity ?? 1;
    const amountCents = item.amount_total ?? 0;

    return {
      name:
        catalogProduct?.name ??
        stripeProduct?.name ??
        item.description ??
        "Item",
      slug: catalogProduct?.slug ?? stripeProduct?.metadata?.slug ?? null,
      quantity,
      amountCents,
      unitAmountCents:
        item.price?.unit_amount ??
        (quantity > 0 ? Math.round(amountCents / quantity) : amountCents),
    };
  });
}

function getShippingDetails(session) {
  return (
    session.collected_information?.shipping_details ??
    session.shipping_details ??
    session.shipping ??
    null
  );
}

function getCustomerName(session, shippingDetails) {
  return (
    session.customer_details?.name ||
    shippingDetails?.name ||
    ""
  ).trim();
}

function getCustomerEmail(session) {
  return (
    session.customer_details?.email ||
    session.customer_email ||
    ""
  ).trim();
}

function formatAddressLines(shippingDetails) {
  if (!shippingDetails) return [];

  const address = shippingDetails.address ?? {};
  const country =
    address.country === "US" ? "United States" : address.country ?? "";

  return [
    shippingDetails.name,
    address.line1,
    address.line2,
    [address.city, address.state, address.postal_code]
      .filter(Boolean)
      .join(", "),
    country,
  ].filter(Boolean);
}

function getShippingAmountCents(session) {
  return (
    session.shipping_cost?.amount_total ??
    session.total_details?.amount_shipping ??
    0
  );
}

function getShippingMethodLabel(session) {
  const rate = session.shipping_cost?.shipping_rate;
  if (rate && typeof rate === "object" && rate.display_name) {
    return rate.display_name;
  }

  const amount = getShippingAmountCents(session);
  const standardDays = SHIPPING_POLICY.standard.transitDays;
  const expeditedMin = SHIPPING_POLICY.expedited.transitDaysMin;
  const expeditedMax = SHIPPING_POLICY.expedited.transitDaysMax;

  if (amount === 0) {
    return `Free Standard Shipping (${standardDays} business days)`;
  }
  if (amount === STANDARD_SHIPPING_CENTS) {
    return `Standard Shipping (${standardDays} business days)`;
  }
  if (amount === EXPEDITED_SHIPPING_CENTS) {
    return `Expedited Shipping (${expeditedMin}-${expeditedMax} business days)`;
  }

  return "Shipping";
}

function buildOrderSummary(session, items) {
  const shippingDetails = getShippingDetails(session);
  const subtotalCents = items.reduce((sum, item) => sum + item.amountCents, 0);
  const shippingCents = getShippingAmountCents(session);
  const totalCents = session.amount_total ?? subtotalCents + shippingCents;

  return {
    sessionId: session.id,
    paymentId: getExpandableId(session.payment_intent) ?? session.id,
    customerName: getCustomerName(session, shippingDetails) || "Customer",
    customerEmail: getCustomerEmail(session),
    addressLines: formatAddressLines(shippingDetails),
    items,
    shippingMethod: getShippingMethodLabel(session),
    subtotalCents,
    shippingCents,
    totalCents,
  };
}

function orderConfirmationHtml(order) {
  const greetingName =
    order.customerName && order.customerName !== "Customer"
      ? `, ${escapeHtml(order.customerName)}`
      : "";

  const itemRows = order.items
    .map(
      (item) => `
        <tr>
          <td style="padding:10px 0;font-family:Georgia,Arial,sans-serif;font-size:15px;line-height:1.5;color:#F0EDE6;text-align:left;">
            ${escapeHtml(item.name)}
          </td>
          <td style="padding:10px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#9A8A6C;text-align:center;white-space:nowrap;">
            x${item.quantity}
          </td>
          <td style="padding:10px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#F0EDE6;text-align:right;white-space:nowrap;">
            ${formatUsd(item.amountCents)}
          </td>
        </tr>`
    )
    .join("");

  const addressHtml = order.addressLines.length
    ? order.addressLines
        .map((line) => escapeHtml(line))
        .join("<br>")
    : "We will confirm your shipping address shortly.";

  const shippingCostLabel =
    order.shippingCents === 0 ? "Free" : formatUsd(order.shippingCents);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Tom Yam Yadom order is confirmed</title>
</head>
<body style="margin:0;padding:0;background-color:#0D0B08;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0D0B08;">
    <tr>
      <td align="center" style="padding:48px 20px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;background-color:#1C1610;border:1px solid #3A2A18;border-radius:16px;font-family:Georgia,'Times New Roman',serif;text-align:center;">
          <tr>
            <td style="padding:40px 36px 32px;text-align:center;border-bottom:1px solid #3A2A18;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#C9940A;">
                TOM YAM YADOM
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 36px 8px;">
              <p style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:700;line-height:1.3;color:#F0EDE6;">
                Your order is confirmed
              </p>
              <p style="margin:0;font-family:Georgia,Arial,sans-serif;font-size:16px;line-height:1.7;color:#F0EDE6;">
                Thank you${greetingName}. Your order is in, and each piece is handcrafted in Koh Samui, Thailand. We will pack it with care and send it on its way.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 36px 8px;text-align:left;">
              <p style="margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#C9940A;">
                Order summary
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                ${itemRows}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 36px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #3A2A18;">
                <tr>
                  <td style="padding:14px 0 6px;font-family:Georgia,Arial,sans-serif;font-size:15px;color:#9A8A6C;text-align:left;">
                    Subtotal
                  </td>
                  <td style="padding:14px 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#F0EDE6;text-align:right;">
                    ${formatUsd(order.subtotalCents)}
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-family:Georgia,Arial,sans-serif;font-size:15px;color:#9A8A6C;text-align:left;">
                    ${escapeHtml(order.shippingMethod)}
                  </td>
                  <td style="padding:6px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#F0EDE6;text-align:right;">
                    ${shippingCostLabel}
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:18px;font-weight:700;color:#F0EDE6;text-align:left;border-top:1px solid #3A2A18;">
                    Total
                  </td>
                  <td style="padding:14px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:700;color:#C9940A;text-align:right;border-top:1px solid #3A2A18;">
                    ${formatUsd(order.totalCents)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 36px 36px;text-align:left;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0D0B08;border:1px solid #3A2A18;border-radius:12px;">
                <tr>
                  <td style="padding:24px;">
                    <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#C9940A;">
                      Shipping to
                    </p>
                    <p style="margin:0;font-family:Georgia,Arial,sans-serif;font-size:15px;line-height:1.7;color:#F0EDE6;">
                      ${addressHtml}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 36px 36px;border-top:1px solid #3A2A18;text-align:center;">
              <p style="margin:0 0 8px;font-family:Georgia,Arial,sans-serif;font-size:13px;line-height:1.6;color:#9A8A6C;">
                Handcrafted in Koh Samui, Thailand
              </p>
              <p style="margin:0;font-family:Georgia,Arial,sans-serif;font-size:13px;line-height:1.6;color:#9A8A6C;">
                <a href="mailto:${CONTACT_EMAIL}" style="color:#C9940A;text-decoration:none;">${CONTACT_EMAIL}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

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
