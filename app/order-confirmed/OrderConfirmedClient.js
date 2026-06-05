"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function OrderConfirmedClient() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <span className="inline-block text-tiger-gold text-xs font-heading font-bold tracking-[0.2em] uppercase mb-4">
          Order Complete
        </span>
        <h1
          className="font-heading font-bold text-tiger-cream uppercase leading-tight mb-6"
          style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", letterSpacing: "-0.01em" }}
        >
          Your order is confirmed! 🐯
        </h1>
        <p className="text-tiger-muted font-sans text-lg leading-relaxed mb-4">
          Thank you for your order. We&apos;re getting your Smiling Tiger products ready.
        </p>
        <p className="text-tiger-muted font-sans text-base leading-relaxed mb-10">
          You&apos;ll receive a confirmation email from us shortly with your order details.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center justify-center bg-tiger-gold hover:bg-tiger-gold-light text-tiger-bg font-heading font-bold text-sm tracking-[0.14em] uppercase px-8 py-4 rounded-full transition-colors duration-200 cursor-pointer"
        >
          Back to Shop
        </Link>
      </div>
    </div>
  );
}
