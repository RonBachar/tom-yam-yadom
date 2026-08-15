"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const COOKIE_NAME = "tomyam_engagement_popup";
const ONE_DAY_SECONDS = 60 * 60 * 24;
const VISIBLE_DELAY_MS = 20_000;
const TICK_MS = 250;
const DISCOUNT_CODE = "TIGER10";

function isValidEmail(value) {
  return (
    value.includes("@") &&
    value.includes(".") &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
  );
}

function getCookie(name) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : null;
}

function setDailyCookie() {
  document.cookie = `${COOKIE_NAME}=1; path=/; max-age=${ONE_DAY_SECONDS}; SameSite=Lax`;
}

export default function EngagementPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (pathname?.startsWith("/checkout")) return;
    if (getCookie(COOKIE_NAME)) return;

    let elapsed = 0;
    let cancelled = false;

    const id = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;

      elapsed += TICK_MS;
      if (elapsed < VISIBLE_DELAY_MS) return;

      window.clearInterval(id);
      if (cancelled) return;

      setDailyCookie();
      setOpen(true);
    }, TICK_MS);

    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [pathname]);

  function close() {
    setOpen(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError("Something went wrong. Please try again.");
        return;
      }

      setEmail("");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/65 p-4"
      role="presentation"
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="engagement-popup-title"
        className="relative w-full max-w-md rounded-2xl border border-tiger-border bg-tiger-surface p-6 shadow-[0_24px_64px_rgba(0,0,0,0.55)] sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-tiger-muted transition-colors hover:text-tiger-cream"
        >
          ×
        </button>

        {submitted ? (
          <div className="text-center">
            <p
              id="engagement-popup-title"
              className="font-heading text-2xl font-bold uppercase tracking-wide text-tiger-cream"
            >
              You&rsquo;re in
            </p>
            <p className="mt-3 font-sans text-sm text-tiger-muted">
              Your code is ready. We also sent it to your inbox.
            </p>
            <p className="mt-6 font-heading text-3xl font-bold tracking-[0.12em] text-tiger-gold">
              {DISCOUNT_CODE}
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-8 w-full rounded-full bg-tiger-gold px-6 py-3 font-heading text-xs font-bold uppercase tracking-[0.15em] text-tiger-bg transition-colors hover:bg-tiger-gold-light"
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="text-center">
            <p
              id="engagement-popup-title"
              className="font-heading text-2xl font-bold uppercase tracking-wide text-tiger-cream sm:text-3xl"
            >
              Join the ritual. Get 10% off your first order.
            </p>
            <p className="mt-3 font-sans text-sm text-tiger-muted">
              Enter your email and we&rsquo;ll send your welcome code.
            </p>

            <label htmlFor="engagement-email" className="sr-only">
              Email address
            </label>
            <input
              id="engagement-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="mt-6 w-full rounded-full border border-tiger-border bg-tiger-bg px-5 py-3 font-sans text-sm text-tiger-cream placeholder:text-tiger-muted focus:border-tiger-gold focus:outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-3 w-full rounded-full bg-tiger-gold px-6 py-3 font-heading text-xs font-bold uppercase tracking-[0.15em] text-tiger-bg transition-colors hover:bg-tiger-gold-light disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending..." : "Get 10% Off"}
            </button>

            {error && (
              <p className="mt-3 font-sans text-sm text-tiger-red">{error}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
