"use client";

import { useEffect, useState } from "react";

const CONSENT_COOKIE = "cookie_consent";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export function getCookieConsent() {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${CONSENT_COOKIE}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookieConsent(value) {
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(value)}; path=/; max-age=${ONE_YEAR_SECONDS}; SameSite=Lax`;
  window.dispatchEvent(
    new CustomEvent("cookie-consent", { detail: value })
  );
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getCookieConsent()) setVisible(true);
  }, []);

  if (!visible) return null;

  function accept() {
    setCookieConsent("accepted");
    setVisible(false);
  }

  function reject() {
    setCookieConsent("rejected");
    setVisible(false);
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 inset-x-0 z-50 border-t border-tiger-gold/40 bg-[#0E0E0E] px-4 py-3 shadow-[0_-8px_24px_rgba(0,0,0,0.45)] animate-[fade-up_0.4s_ease-out_both]"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="font-sans text-sm leading-snug text-tiger-cream">
          We use cookies to understand how visitors use our site.
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={reject}
            className="rounded border border-tiger-gold/50 px-4 py-2 font-sans text-sm font-medium text-tiger-cream transition-colors hover:border-tiger-gold hover:text-tiger-gold"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={accept}
            className="rounded bg-tiger-gold px-4 py-2 font-sans text-sm font-semibold text-[#0E0E0E] transition-colors hover:bg-tiger-gold-light"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
