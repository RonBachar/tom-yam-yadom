"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";

const NAV_LINKS = [
  { href: "/shop",        label: "Shop"           },
  { href: "/blog",        label: "Journal"        },
  { href: "/ingredients", label: "The Apothecary" },
  { href: "/story",       label: "Our Story"      },
  { href: "/wholesale",   label: "Wholesale"      },
];

export default function Navbar() {
  const [open, setOpen]           = useState(false);
  const [scrolled, setScrolled]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="px-4 pt-3">
      <nav
        className={`max-w-6xl mx-auto rounded-full flex items-center justify-between px-4 py-2.5 transition-all duration-300 border border-tiger-border ${
          scrolled
            ? "bg-tiger-bg/96 backdrop-blur-md shadow-xl shadow-black/50"
            : "bg-tiger-bg/65 backdrop-blur-sm"
        }`}
        aria-label="Main navigation"
      >
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 cursor-pointer"
          aria-label="Tom Yam Yadom home"
        >
          <Image
            src="/images/logos/logo.jpg"
            alt="Tom Yam Yadom - Smiling Tiger"
            width={40}
            height={40}
            className="rounded-full"
            priority
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-tiger-muted hover:text-tiger-cream font-sans text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-3">
          <CartNavLink className="text-tiger-muted hover:text-tiger-cream transition-colors duration-200 p-1.5 cursor-pointer" />
          <Link
            href="/shop"
            className="bg-tiger-gold hover:bg-tiger-gold-light text-tiger-bg font-heading font-bold text-xs tracking-[0.15em] uppercase px-5 py-2.5 rounded-full transition-colors duration-200 cursor-pointer"
          >
            Shop Inhalers
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-2">
          <CartNavLink className="text-tiger-muted hover:text-tiger-cream transition-colors p-1.5 cursor-pointer" />
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="text-tiger-cream p-1.5 cursor-pointer hover:text-tiger-gold transition-colors duration-200"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden max-w-6xl mx-auto mt-2 rounded-2xl bg-tiger-surface border border-tiger-border overflow-hidden shadow-2xl shadow-black/60"
        >
          <ul className="flex flex-col p-3 gap-1 list-none m-0">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center px-4 py-3 font-heading font-semibold text-xl text-tiger-cream tracking-wide hover:text-tiger-gold hover:bg-tiger-surface-2 rounded-xl transition-colors duration-200 cursor-pointer"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 pb-1">
              <Link
                href="/shop"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center w-full bg-tiger-gold hover:bg-tiger-gold-light text-tiger-bg font-heading font-bold text-sm tracking-[0.15em] uppercase py-3.5 rounded-full transition-colors duration-200 cursor-pointer"
              >
                Shop Inhalers
              </Link>
            </li>
          </ul>
        </div>
      )}
      </div>
    </header>
  );
}

function CartNavLink({ className }) {
  const { cartCount } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const showBadge = mounted && cartCount > 0;

  return (
    <Link
      href="/cart"
      aria-label={showBadge ? `Cart, ${cartCount} items` : "Cart"}
      className={`relative inline-flex ${className}`}
    >
      <CartIcon />
      {showBadge && (
        <span
          className="absolute -top-0.5 -right-0.5 min-w-[1.125rem] h-[1.125rem] flex items-center justify-center rounded-full bg-tiger-gold text-tiger-bg font-heading font-bold text-[10px] leading-none px-0.5"
          aria-hidden="true"
        >
          {cartCount > 99 ? "99+" : cartCount}
        </span>
      )}
    </Link>
  );
}

function CartIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="3" y1="6"  x2="21" y2="6"  />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6"  x2="6"  y2="18" />
      <line x1="6"  y1="6"  x2="18" y2="18" />
    </svg>
  );
}

