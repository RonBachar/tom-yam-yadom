"use client";

import { useState } from "react";
import Link from "next/link";
import { SCENTS } from "../data/products";

export default function ScentSelector() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="flex flex-wrap justify-center gap-5">
      {SCENTS.map((scent) => (
        <ScentCard
          key={scent.slug}
          scent={scent}
          isSelected={selected === scent.slug}
          onSelect={() =>
            setSelected(selected === scent.slug ? null : scent.slug)
          }
        />
      ))}
    </div>
  );
}

function ScentCard({ scent, isSelected, onSelect }) {
  return (
    <article
      className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] xl:w-[calc(25%-15px)] rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden group"
      style={{
        borderColor: isSelected
          ? scent.accentColor
          : "rgba(58, 42, 24, 0.8)",
        backgroundColor: isSelected
          ? scent.accentBg
          : "rgba(28, 22, 16, 0.95)",
        boxShadow: isSelected
          ? `0 0 32px 2px ${scent.accentColor}28, 0 4px 24px rgba(0,0,0,0.4)`
          : "0 2px 12px rgba(0,0,0,0.3)",
      }}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      aria-pressed={isSelected}
      aria-label={`${scent.name}: ${scent.tagline}`}
    >
      {/* Accent top bar */}
      <div
        className="h-1 w-full transition-opacity duration-300"
        style={{
          backgroundColor: scent.accentColor,
          opacity: isSelected ? 1 : 0.35,
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
          className="font-heading font-bold text-2xl uppercase tracking-wide mb-0.5 transition-colors duration-300"
          style={{ color: isSelected ? scent.accentColor : "#F2E6C4" }}
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
        <p className="text-tiger-muted text-xs font-sans leading-relaxed mb-5 flex-1">
          <span className="font-semibold" style={{ color: "rgba(242,230,196,0.5)" }}>
            Ingredients:{" "}
          </span>
          {scent.ingredients.join(", ")}
        </p>

        {/* Actions */}
        <div className="flex gap-2.5 mt-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Cart hook — wire to Stripe/WooCommerce later
            }}
            className="flex-1 font-heading font-bold text-xs tracking-[0.12em] uppercase py-3 rounded-full transition-all duration-200 cursor-pointer active:scale-95"
            style={{
              backgroundColor: scent.accentColor,
              color: "#0D0B08",
            }}
            aria-label={`Add ${scent.name} to cart — $${20}`}
          >
            Add to Cart — $20
          </button>
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
    </article>
  );
}
