"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { SCENTS } from "../data/products";
import { getIngredientBySlug, getIngredientName } from "../data/ingredients";
import AddToCartButton from "./AddToCartButton";

export default function ScentSelector() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let best = null;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (!best || entry.intersectionRatio > best.intersectionRatio) {
            best = entry;
          }
        }
        if (best) {
          const index = Number(best.target.dataset.index);
          if (!Number.isNaN(index)) setActiveIndex(index);
        }
      },
      {
        root,
        threshold: [0.4, 0.55, 0.7, 0.85],
      },
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  function scrollToIndex(index) {
    const card = cardRefs.current[index];
    if (!card) return;
    card.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }

  return (
    <div>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:justify-center md:gap-5 md:overflow-visible md:px-0 md:snap-none"
        >
          {SCENTS.map((scent, index) => (
            <ScentCard
              key={scent.slug}
              scent={scent}
              index={index}
              cardRef={(el) => {
                cardRefs.current[index] = el;
              }}
            />
          ))}
        </div>

        {activeIndex > 0 && (
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex - 1)}
            aria-label="Previous scent"
            className="absolute left-1 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-tiger-border bg-tiger-bg/70 md:hidden"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M9 2.5L4.5 7L9 11.5"
                stroke="#C9940A"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        {activeIndex < SCENTS.length - 1 && (
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex + 1)}
            aria-label="Next scent"
            className="absolute right-1 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-tiger-border bg-tiger-bg/70 md:hidden"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 2.5L9.5 7L5 11.5"
                stroke="#C9940A"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      <div
        className="flex justify-center gap-2 mt-5 md:hidden"
        aria-hidden="true"
      >
        {SCENTS.map((scent, index) => (
          <span
            key={scent.slug}
            className="block h-1.5 w-1.5 rounded-full transition-colors duration-200"
            style={{
              backgroundColor:
                activeIndex === index ? "#C9940A" : "rgba(242, 230, 196, 0.28)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ScentCard({ scent, index, cardRef }) {
  return (
    <article
      ref={cardRef}
      data-index={index}
      className="relative w-[82vw] max-w-[320px] shrink-0 snap-center rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden group hover:scale-[1.015] md:w-[calc(50%-10px)] md:max-w-none md:shrink lg:w-[calc(33.333%-14px)] xl:w-[calc(25%-15px)]"
      style={{
        borderColor: "rgba(58, 42, 24, 0.8)",
        backgroundColor: "rgba(28, 22, 16, 0.95)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${scent.accentColor}90`;
        e.currentTarget.style.boxShadow = `0 0 24px 2px ${scent.accentColor}20, 0 4px 20px rgba(0,0,0,0.35)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(58, 42, 24, 0.8)";
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.3)";
      }}
    >
      <Image
        src={`/images/product/${scent.slug}.png`}
        alt=""
        fill
        sizes="(max-width: 767px) 82vw, (max-width: 1024px) 50vw, 25vw"
        className="absolute inset-0 z-0 object-cover opacity-15 mix-blend-luminosity"
        aria-hidden
      />

      <Link
        href={`/products/${scent.slug}`}
        className="absolute inset-0 z-[1]"
        aria-label={`View ${scent.name}`}
      />

      <div className="relative z-[2] pointer-events-none">
        {/* Accent top bar */}
        <div
          className="h-1 w-full transition-opacity duration-300"
          style={{
            backgroundColor: scent.accentColor,
            opacity: 0.35,
          }}
        />

        <div className="p-5 flex flex-col h-full">
          {/* Badge */}
          {scent.badge && (
            <span
              className="inline-block self-start text-xs font-heading font-bold tracking-[0.12em] uppercase px-3 py-1 rounded-full mb-3"
              style={{
                backgroundColor: `${scent.accentColor}22`,
                color: scent.accentColor,
              }}
            >
              {scent.badge}
            </span>
          )}

          {/* Name */}
          <h3
            className="font-heading font-bold text-2xl uppercase tracking-wide mb-0.5 text-tiger-cream transition-colors duration-300 group-hover:text-[var(--scent-accent)]"
            style={{ ["--scent-accent"]: scent.accentColor }}
          >
            {scent.name}
          </h3>

          {/* Emotion */}
          <span
            className="text-xs font-sans font-semibold tracking-widest uppercase mb-3 block"
            style={{ color: scent.accentColor }}
          >
            {scent.emotion}
          </span>

          {/* Tagline */}
          <p className="text-tiger-cream text-sm font-sans leading-relaxed mb-3">
            {scent.tagline}
          </p>

          {/* Function tags */}
          <ul className="flex flex-wrap gap-1.5 mb-4 list-none p-0 m-0">
            {scent.functions.map((fn) => (
              <li
                key={fn}
                className="text-xs px-2.5 py-1 rounded-full font-sans font-medium text-tiger-cream"
                style={{
                  backgroundColor: `${scent.accentColor}18`,
                  border: `1px solid ${scent.accentColor}30`,
                }}
              >
                {fn}
              </li>
            ))}
          </ul>

          {/* Ingredients */}
          <p className="relative z-10 pointer-events-auto text-tiger-muted text-xs font-sans leading-relaxed mb-5 flex-1">
            <span
              className="font-semibold"
              style={{ color: "rgba(242,230,196,0.5)" }}
            >
              Ingredients:{" "}
            </span>
            {scent.ingredientSlugs.map((ingredientSlug, i) => {
              const ingredient = getIngredientBySlug(ingredientSlug);
              const displayName = ingredient
                ? getIngredientName(ingredient.title)
                : ingredientSlug;
              return (
                <span key={ingredientSlug}>
                  {i > 0 && ", "}
                  {ingredient ? (
                    <Link
                      href={`/ingredients/${ingredientSlug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-tiger-muted no-underline hover:text-tiger-gold hover:underline transition-colors duration-200 cursor-pointer"
                    >
                      {displayName}
                    </Link>
                  ) : (
                    displayName
                  )}
                </span>
              );
            })}
          </p>

          {/* Actions */}
          <div className="relative z-10 pointer-events-auto flex gap-2.5 mt-auto">
            <AddToCartButton
              product={scent}
              stopPropagation
              className="flex-1 font-heading font-bold text-xs tracking-[0.12em] uppercase py-3 rounded-full transition-all duration-200 cursor-pointer active:scale-95"
              style={{
                backgroundColor: scent.accentColor,
                color: "#0D0B08",
              }}
              aria-label={`Add ${scent.name} to cart, $${scent.price}`}
            >
              Add to Cart · ${scent.price}
            </AddToCartButton>
            <Link
              href={`/products/${scent.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="px-3.5 py-3 rounded-full border font-heading font-semibold text-xs tracking-wide transition-all duration-200 cursor-pointer hover:bg-tiger-surface-2 text-tiger-cream"
              style={{ borderColor: `${scent.accentColor}45` }}
              aria-label={`View ${scent.name} details`}
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
