"use client";

import { useEffect, useState } from "react";

export default function CategoryBar({ categories }) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "");

  useEffect(() => {
    const sections = categories
      .map((cat) => document.getElementById(cat.id))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (!visible.length) return;

        const best = visible.reduce((prev, curr) =>
          curr.boundingClientRect.top < prev.boundingClientRect.top ? curr : prev
        );
        setActiveId(best.target.id);
      },
      { rootMargin: "-100px 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [categories]);

  return (
    <nav
      className="sticky top-[100px] z-40 -mx-6 px-6 py-4 mb-10 bg-tiger-bg/95 backdrop-blur-sm border-b border-tiger-border"
      aria-label="Ingredient categories"
    >
      <div className="flex gap-2 overflow-x-auto whitespace-nowrap">
        {categories.map((cat) => {
          const isActive = activeId === cat.id;
          return (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className={`shrink-0 text-xs font-sans font-semibold tracking-[0.06em] px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer ${
                isActive
                  ? "border-tiger-gold/50 bg-tiger-surface text-tiger-gold"
                  : "border-tiger-border bg-tiger-surface text-tiger-cream-dim hover:border-tiger-gold/30 hover:text-tiger-cream"
              }`}
            >
              {cat.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
