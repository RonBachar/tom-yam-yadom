"use client";

import { useState } from "react";
import Link from "next/link";
import TigerMark from "./TigerMark";

const LINKS = [
  { href: "/shop",      label: "Shop All Scents"     },
  { href: "/story",     label: "Our Story"           },
  { href: "/wholesale", label: "Wholesale"           },
  { href: "/products/crown-blend", label: "Crown Blend" },
];

export default function Footer() {
  const [email, setEmail]         = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  return (
    <footer className="bg-tiger-surface border-t border-tiger-border">
      {/* Email capture band */}
      <div className="border-b border-tiger-border py-16 px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-tiger-cream uppercase tracking-wide mb-3">
            Stay in the circle
          </h2>
          <p className="text-tiger-muted text-sm mb-8 font-sans">
            New scents, Thai sourcing stories, and 10% off your first order.
          </p>
          {submitted ? (
            <p className="text-tiger-gold font-heading font-semibold text-xl tracking-wide">
              You&rsquo;re in. Watch your inbox.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-tiger-bg border border-tiger-border rounded-full px-5 py-3 text-tiger-cream text-sm font-sans placeholder:text-tiger-muted focus:border-tiger-gold focus:outline-none transition-colors duration-200"
              />
              <button
                type="submit"
                className="bg-tiger-gold hover:bg-tiger-gold-light text-tiger-bg font-heading font-bold text-xs tracking-[0.15em] uppercase px-6 py-3 rounded-full transition-colors duration-200 cursor-pointer whitespace-nowrap"
              >
                Get 10% Off
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main footer columns */}
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand col */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <TigerMark size={40} />
              <div>
                <p className="font-heading font-bold text-tiger-cream tracking-[0.14em] uppercase text-sm leading-tight">
                  Tom Yam Yadom
                </p>
                <p className="font-sans text-tiger-muted text-xs">Smiling Tiger</p>
              </div>
            </div>
            <p className="text-tiger-muted text-sm font-sans leading-relaxed">
              Premium handcrafted Thai herbal inhalers. Made small-batch in Koh Samui from Thai-sourced organic ingredients.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-heading font-semibold text-tiger-cream uppercase tracking-[0.16em] text-xs mb-5">
              Navigate
            </h3>
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-tiger-muted hover:text-tiger-cream text-sm font-sans transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-tiger-cream uppercase tracking-[0.16em] text-xs mb-5">
              Contact
            </h3>
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
              <li>
                <a
                  href="mailto:info@tomyamyadomherbals.com"
                  className="text-tiger-muted hover:text-tiger-cream text-sm font-sans transition-colors duration-200 cursor-pointer"
                >
                  info@tomyamyadomherbals.com
                </a>
              </li>
              <li>
                <Link
                  href="/wholesale"
                  className="text-tiger-muted hover:text-tiger-gold text-sm font-sans transition-colors duration-200 cursor-pointer"
                >
                  Wholesale Inquiries &rarr;
                </Link>
              </li>
              <li>
                <span className="text-tiger-muted text-sm font-sans">
                  Koh Samui, Thailand
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal links */}
        <nav
          className="mt-14 pt-6 border-t border-tiger-border flex flex-wrap justify-center gap-x-6 gap-y-2"
          aria-label="Legal"
        >
          <Link
            href="/privacy"
            className="text-tiger-muted hover:text-tiger-cream text-xs font-sans transition-colors duration-200 cursor-pointer"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-tiger-muted hover:text-tiger-cream text-xs font-sans transition-colors duration-200 cursor-pointer"
          >
            Terms of Service
          </Link>
          <Link
            href="/shipping"
            className="text-tiger-muted hover:text-tiger-cream text-xs font-sans transition-colors duration-200 cursor-pointer"
          >
            Shipping &amp; Returns
          </Link>
        </nav>

        {/* Bottom bar */}
        <div className="mt-6 pt-6 border-t border-tiger-border flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-tiger-muted text-xs font-sans">
            &copy; 2024 Tom Yam Yadom. Handcrafted in Koh Samui, Thailand.
          </p>
          <p className="text-tiger-muted text-xs font-sans text-center sm:text-right">
            Thai herbal inhaler &middot; Organic yadom &middot; Natural focus inhaler
          </p>
        </div>

        {/* Studio credit */}
        <div className="mt-4 pt-4 border-t border-tiger-border/50 text-center">
          <p className="text-tiger-muted/50 text-xs font-sans">
          Design & Development{" "}
            <a
              href="https://www.matara.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-tiger-muted/70 hover:text-tiger-gold transition-colors duration-200 cursor-pointer"
            >
              Matara Studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
