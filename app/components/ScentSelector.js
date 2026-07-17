"use client";

import { useState, useEffect, useRef } from "react";
import { SCENTS } from "../data/products";
import ScentCard from "./ScentCard";

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
