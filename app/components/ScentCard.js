"use client";

import Link from "next/link";
import Image from "next/image";
import { getIngredientBySlug, getIngredientName } from "../data/ingredients";
import AddToCartButton from "./AddToCartButton";

export default function ScentCard({ scent, index, cardRef }) {
  const isCarousel = typeof index === "number";

  return (
    <article
      ref={cardRef}
      data-index={index}
      className={
        isCarousel
          ? "relative w-[82vw] max-w-[320px] shrink-0 snap-center rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden group hover:scale-[1.015] md:w-[calc(50%-10px)] md:max-w-none md:shrink lg:w-[calc(33.333%-14px)] xl:w-[calc(25%-15px)]"
          : "relative w-full rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden group hover:scale-[1.015]"
      }
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
