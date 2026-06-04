"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cartItems, cartTotal, updateQuantity, removeFromCart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isEmpty = mounted && cartItems.length === 0;
  const hasItems = mounted && cartItems.length > 0;

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <span className="inline-block text-tiger-orange text-xs font-heading font-bold tracking-[0.2em] uppercase mb-4">
            Your Order
          </span>
          <h1
            className="font-heading font-bold text-tiger-cream uppercase leading-none"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)", letterSpacing: "-0.01em" }}
          >
            Your Cart
          </h1>
        </div>

        {!mounted && (
          <p className="text-tiger-muted font-sans text-base">Loading cart…</p>
        )}

        {isEmpty && (
          <div className="rounded-2xl border border-tiger-border bg-tiger-surface p-10 text-center">
            <p className="text-tiger-cream font-sans text-lg mb-6">
              Your cart is empty.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center bg-tiger-gold hover:bg-tiger-gold-light text-tiger-bg font-heading font-bold text-sm tracking-[0.14em] uppercase px-8 py-3.5 rounded-full transition-colors duration-200 cursor-pointer"
            >
              Browse the Shop
            </Link>
          </div>
        )}

        {hasItems && (
          <div className="flex flex-col gap-8">
            <ul className="flex flex-col gap-4 list-none m-0 p-0">
              {cartItems.map((item) => (
                <li
                  key={item.slug}
                  className="rounded-2xl border border-tiger-border bg-tiger-surface p-5"
                >
                  <div className="flex gap-5">
                    {item.image ? (
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border border-tiger-border">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className="w-20 h-20 flex-shrink-0 rounded-xl border border-tiger-border flex items-center justify-center"
                        style={{ backgroundColor: "rgba(201,148,10,0.06)" }}
                        aria-hidden="true"
                      >
                        <span className="font-heading font-bold text-2xl text-tiger-gold/25 uppercase">
                          {item.name.slice(0, 1)}
                        </span>
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                        <Link
                          href={`/products/${item.slug}`}
                          className="font-heading font-bold text-lg text-tiger-cream uppercase tracking-wide hover:text-tiger-gold transition-colors duration-200 cursor-pointer"
                        >
                          {item.name}
                        </Link>
                        <span className="font-heading font-bold text-tiger-gold text-lg">
                          ${item.price}
                        </span>
                      </div>
                      <p className="text-tiger-muted text-xs font-sans mb-4">
                        ${item.price} each
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.slug, item.quantity - 1)
                            }
                            className="w-9 h-9 rounded-full border border-tiger-border text-tiger-cream font-heading font-bold text-lg leading-none hover:border-tiger-gold hover:text-tiger-gold transition-colors duration-200 cursor-pointer"
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            −
                          </button>
                          <span
                            className="min-w-[2rem] text-center font-heading font-bold text-tiger-cream text-base"
                            aria-label={`Quantity: ${item.quantity}`}
                          >
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.slug, item.quantity + 1)
                            }
                            className="w-9 h-9 rounded-full border border-tiger-border text-tiger-cream font-heading font-bold text-lg leading-none hover:border-tiger-gold hover:text-tiger-gold transition-colors duration-200 cursor-pointer"
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            +
                          </button>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="font-heading font-bold text-tiger-cream text-base">
                            ${(item.price * item.quantity).toFixed(0)}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.slug)}
                            className="text-tiger-muted hover:text-tiger-gold text-xs font-heading font-bold tracking-[0.1em] uppercase transition-colors duration-200 cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="rounded-2xl border border-tiger-border bg-tiger-surface p-6">
              <h2 className="font-heading font-bold text-tiger-cream text-lg uppercase tracking-wide mb-4">
                Order Summary
              </h2>
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-tiger-muted font-sans text-sm">Subtotal</span>
                <span className="font-heading font-bold text-tiger-gold text-2xl">
                  ${cartTotal.toFixed(0)}
                </span>
              </div>
              <p className="text-tiger-muted text-xs font-sans mb-6">
                Shipping calculated at checkout.
              </p>
              <button
                type="button"
                onClick={() => {
                  // Stripe checkout wired up in next step
                }}
                className="w-full bg-tiger-gold hover:bg-tiger-gold-light text-tiger-bg font-heading font-bold text-sm tracking-[0.14em] uppercase py-4 rounded-full transition-colors duration-200 cursor-pointer"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
