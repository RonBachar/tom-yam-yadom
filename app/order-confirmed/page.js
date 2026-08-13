import Link from "next/link";
import Stripe from "stripe";
import OrderConfirmedClient from "./OrderConfirmedClient";
import { DEFAULT_OG_IMAGE } from "../data/siteMeta";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BASE_URL = "https://www.tomyamyadomherbals.com";

export const metadata = {
  title: "Order Confirmed | Tom Yam Yadom",
  description:
    "Your Tom Yam Yadom order is confirmed. Thank you for your purchase.",
  robots: { index: false, follow: true },
  alternates: { canonical: `${BASE_URL}/order-confirmed` },
  openGraph: {
    title: "Order Confirmed | Tom Yam Yadom",
    description:
      "Your Tom Yam Yadom order is confirmed. Thank you for your purchase.",
    url: `${BASE_URL}/order-confirmed`,
    siteName: "Tom Yam Yadom",
    locale: "en_US",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [DEFAULT_OG_IMAGE.url],
  },
};

function getSessionId(searchParams) {
  const value = searchParams.session_id;
  if (typeof value === "string" && value.trim()) return value.trim();
  return null;
}

async function getCheckoutVerification(sessionId) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    console.error("[order-confirmed] STRIPE_SECRET_KEY is not configured.");
    return "not_found";
  }

  try {
    const stripe = new Stripe(secretKey);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session.payment_status === "paid" ? "paid" : "incomplete";
  } catch {
    console.error("[order-confirmed] Failed to retrieve checkout session.");
    return "not_found";
  }
}

function ShopLink({ href = "/shop", label = "Back to Shop" }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center bg-tiger-gold hover:bg-tiger-gold-light text-tiger-bg font-heading font-bold text-sm tracking-[0.14em] uppercase px-8 py-4 rounded-full transition-colors duration-200 cursor-pointer"
    >
      {label}
    </Link>
  );
}

function NeutralOrderState({ eyebrow, title, children, cta }) {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <span className="inline-block text-tiger-gold text-xs font-heading font-bold tracking-[0.2em] uppercase mb-4">
          {eyebrow}
        </span>
        <h1
          className="font-heading font-bold text-tiger-cream uppercase leading-tight mb-6"
          style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", letterSpacing: "-0.01em" }}
        >
          {title}
        </h1>
        {children}
        {cta}
      </div>
    </div>
  );
}

function NotFoundState() {
  return (
    <NeutralOrderState
      eyebrow="Order"
      title="We couldn't find that order"
      cta={<ShopLink />}
    >
      <p className="text-tiger-muted font-sans text-lg leading-relaxed mb-10">
        If you just completed a purchase, check your email for confirmation.
      </p>
    </NeutralOrderState>
  );
}

function IncompleteState() {
  return (
    <NeutralOrderState
      eyebrow="Checkout"
      title="This order isn't complete yet"
      cta={<ShopLink href="/cart" label="Return to Cart" />}
    >
      <p className="text-tiger-muted font-sans text-lg leading-relaxed mb-10">
        No payment has been recorded for this checkout. You can return to your
        cart to finish when you are ready.
      </p>
    </NeutralOrderState>
  );
}

export default async function OrderConfirmedPage({ searchParams }) {
  const params = await searchParams;
  const sessionId = getSessionId(params);

  if (!sessionId) {
    return <NotFoundState />;
  }

  const verification = await getCheckoutVerification(sessionId);

  if (verification === "paid") {
    return <OrderConfirmedClient paid />;
  }

  if (verification === "incomplete") {
    return <IncompleteState />;
  }

  return <NotFoundState />;
}
