"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SCENTS } from "../data/products";
import ScentCard from "./ScentCard";

/** Show 5 in the fan so 7 scents enable pagination (arrows + dots). */
const MAX_VISIBLE = 5;

/**
 * Fan slot configs keyed by visible card count.
 * Values are base offsets before responsive multipliers.
 */
const FAN_POSITIONS = {
  1: [{ x: 0, y: 0, rotation: 0, scale: 1, zIndex: 10 }],
  2: [
    { x: -140, y: 24, rotation: -10, scale: 0.94, zIndex: 5 },
    { x: 140, y: 24, rotation: 10, scale: 0.94, zIndex: 5 },
  ],
  3: [
    { x: -220, y: 36, rotation: -14, scale: 0.9, zIndex: 4 },
    { x: 0, y: 0, rotation: 0, scale: 1, zIndex: 10 },
    { x: 220, y: 36, rotation: 14, scale: 0.9, zIndex: 4 },
  ],
  4: [
    { x: -300, y: 48, rotation: -16, scale: 0.86, zIndex: 3 },
    { x: -110, y: 16, rotation: -7, scale: 0.94, zIndex: 6 },
    { x: 110, y: 16, rotation: 7, scale: 0.94, zIndex: 6 },
    { x: 300, y: 48, rotation: 16, scale: 0.86, zIndex: 3 },
  ],
  5: [
    { x: -340, y: 56, rotation: -18, scale: 0.84, zIndex: 2 },
    { x: -180, y: 28, rotation: -10, scale: 0.9, zIndex: 5 },
    { x: 0, y: 0, rotation: 0, scale: 1, zIndex: 10 },
    { x: 180, y: 28, rotation: 10, scale: 0.9, zIndex: 5 },
    { x: 340, y: 56, rotation: 18, scale: 0.84, zIndex: 2 },
  ],
};

/** Equal wrapper height so rotation pivots share one viewport origin. */
const FAN_CARD_HEIGHT_PX = 460;

/** Derive spread multipliers from the fan container width (not window alone). */
function multipliersFromContainerWidth(width) {
  if (!width || width <= 0) return { rx: 1, ry: 1 };
  if (width < 900) return { rx: 0.68, ry: 0.82 };
  if (width < 1024) return { rx: 0.76, ry: 0.88 };
  if (width < 1152) return { rx: 0.84, ry: 0.92 };
  if (width < 1280) return { rx: 0.92, ry: 0.96 };
  return { rx: 1, ry: 1 };
}

function getSlotConfig(slotIndex, visibleCount, rx, ry) {
  const count = Math.min(Math.max(visibleCount, 1), MAX_VISIBLE);
  const slots = FAN_POSITIONS[count] || FAN_POSITIONS[MAX_VISIBLE];
  const base = slots[slotIndex] || slots[Math.floor(slots.length / 2)];

  return {
    x: base.x * rx,
    y: base.y * ry,
    rotation: base.rotation,
    scale: base.scale,
    zIndex: base.zIndex,
  };
}

/**
 * Map each real card index -> fan slot index (0..MAX_VISIBLE-1),
 * centered on `activeIndex`. Cards outside the window are omitted.
 */
function getVisibleMap(activeIndex, total) {
  const map = new Map();
  if (total <= 0) return map;

  const visibleCount = Math.min(total, MAX_VISIBLE);
  const half = visibleCount >> 1;

  for (let slot = 0; slot < visibleCount; slot++) {
    const offset = slot - half;
    const cardIndex = (activeIndex + offset + total * 10) % total;
    map.set(cardIndex, slot);
  }
  return map;
}

/** Shared GSAP centering — do not mix with Tailwind translate classes. */
const CENTERING = { xPercent: -50, yPercent: -50, transformOrigin: "50% 80%" };

async function waitForStableContainer(containerEl) {
  const doubleRaf = () =>
    new Promise((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(resolve);
      });
    });

  await doubleRaf();

  if (typeof document !== "undefined" && document.fonts?.ready) {
    try {
      await document.fonts.ready;
    } catch {
      /* ignore */
    }
  }

  const images = containerEl ? [...containerEl.querySelectorAll("img")] : [];
  await Promise.all(
    images.map((img) => {
      if (img.complete && img.naturalWidth > 0) return undefined;
      return new Promise((resolve) => {
        const done = () => resolve();
        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", done, { once: true });
      });
    }),
  );

  await doubleRaf();

  return containerEl?.getBoundingClientRect?.().width ?? 0;
}

export default function ScentFan() {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const layoutTlRef = useRef(null);
  const setupTokenRef = useRef(0);
  const layoutGenRef = useRef(0);

  const multipliersRef = useRef({ rx: 1, ry: 1 });
  const measuredWidthRef = useRef(0);
  const measuredHeightRef = useRef(0);
  const centerIndexRef = useRef(0);
  const hoveredSlotRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const readyRef = useRef(false);

  const scents = SCENTS;
  const total = scents.length;
  const showPagination = total > MAX_VISIBLE;

  const [centerIndex, setCenterIndex] = useState(0);

  function measureMultipliers() {
    const rect = containerRef.current?.getBoundingClientRect?.();
    const width = rect?.width ?? 0;
    const height = rect?.height ?? 0;
    measuredWidthRef.current = width;
    measuredHeightRef.current = height;
    multipliersRef.current = multipliersFromContainerWidth(width);
    return { width, height };
  }

  function getCards() {
    return cardRefs.current.filter(Boolean);
  }

  function killAllCardMotion() {
    if (layoutTlRef.current) {
      layoutTlRef.current.kill();
      layoutTlRef.current = null;
    }
    gsap.killTweensOf(getCards());
  }

  /**
   * Single source of truth: position every card from current center + multipliers.
   * Entry, cycle end, hover reset, and resize all call this.
   */
  function applyFanLayout(animated, options = {}) {
    const {
      centerIndex: centerOverride,
      hoverSlot: hoverOverride,
      duration,
      ease,
      onComplete,
    } = options;

    const center =
      centerOverride !== undefined ? centerOverride : centerIndexRef.current;
    const hoverSlot =
      hoverOverride !== undefined ? hoverOverride : hoveredSlotRef.current;
    const { rx, ry } = multipliersRef.current;
    const visibleMap = getVisibleMap(center, total);
    const visibleCount = Math.min(total, MAX_VISIBLE);
    const cards = getCards();
    if (!cards.length) {
      onComplete?.();
      return;
    }

    const layoutGen = ++layoutGenRef.current;
    killAllCardMotion();

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animDuration = !animated || reduceMotion ? 0 : (duration ?? 0.45);
    const animEase = ease ?? "power3.out";

    function propsForCard(cardIndex) {
      const slot = visibleMap.get(cardIndex);

      if (slot === undefined) {
        return {
          ...CENTERING,
          x: 0,
          y: 120,
          rotation: 0,
          scale: 0.8,
          opacity: 0,
          zIndex: 0,
          pointerEvents: "none",
        };
      }

      let { x, y, rotation, scale, zIndex } = getSlotConfig(
        slot,
        visibleCount,
        rx,
        ry,
      );

      if (hoverSlot !== null && hoverSlot !== undefined) {
        const distance = slot - hoverSlot;
        if (distance === 0) {
          y -= 48 * ry;
          scale = Math.min(scale * 1.06, 1.08);
          rotation *= 0.35;
          zIndex = 100;
        } else {
          const push = Math.sign(distance) * (36 + Math.abs(distance) * 18);
          x += push * rx;
          scale *= 0.97;
          zIndex = Math.max(1, zIndex - Math.abs(distance));
        }
      }

      return {
        ...CENTERING,
        x,
        y,
        rotation,
        scale,
        opacity: 1,
        zIndex,
        pointerEvents: "auto",
      };
    }

    if (animDuration === 0) {
      isAnimatingRef.current = false;

      cardRefs.current.forEach((el, cardIndex) => {
        if (!el) return;
        gsap.set(el, propsForCard(cardIndex));
      });

      if (layoutGen === layoutGenRef.current) onComplete?.();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        if (layoutGen !== layoutGenRef.current) return;
        layoutTlRef.current = null;
        onComplete?.();
      },
    });
    layoutTlRef.current = tl;

    cardRefs.current.forEach((el, cardIndex) => {
      if (!el) return;
      tl.to(
        el,
        { ...propsForCard(cardIndex), duration: animDuration, ease: animEase },
        0,
      );
    });
  }

  function setEntryStartState() {
    cardRefs.current.forEach((el) => {
      if (!el) return;
      gsap.set(el, {
        ...CENTERING,
        x: 0,
        y: 80,
        rotation: 0,
        scale: 0.85,
        opacity: 0,
        zIndex: 0,
        pointerEvents: "none",
      });
    });
  }

  function snapToLayout() {
    hoveredSlotRef.current = null;
    measureMultipliers();
    applyFanLayout(false, {
      centerIndex: centerIndexRef.current,
      hoverSlot: null,
    });
  }

  // Mount / remount: measure late (after fonts/images), then enter.
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const token = ++setupTokenRef.current;
    const mountedCards = [...cardRefs.current];
    let cancelled = false;
    let containerObserver;
    let cardObserver;
    let resizeRaf = 0;
    let cardResizeRaf = 0;

    readyRef.current = false;
    isAnimatingRef.current = false;
    hoveredSlotRef.current = null;
    measuredWidthRef.current = 0;
    measuredHeightRef.current = 0;

    function onContainerResize() {
      if (cancelled || token !== setupTokenRef.current) return;
      if (!(measuredWidthRef.current > 0)) return;

      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        if (cancelled || token !== setupTokenRef.current) return;

        const prevWidth = measuredWidthRef.current;
        const prevHeight = measuredHeightRef.current;
        const { width, height } = measureMultipliers();
        if (!(width > 0)) return;

        if (
          Math.abs(width - prevWidth) < 1 &&
          Math.abs(height - prevHeight) < 1
        ) {
          return;
        }

        hoveredSlotRef.current = null;
        layoutGenRef.current += 1;
        killAllCardMotion();
        isAnimatingRef.current = false;

        if (!readyRef.current) {
          setEntryStartState();
          isAnimatingRef.current = true;
          applyFanLayout(true, {
            centerIndex: centerIndexRef.current,
            hoverSlot: null,
            duration: 0.5,
            ease: "power3.out",
            onComplete: () => {
              if (cancelled || token !== setupTokenRef.current) return;
              snapToLayout();
              readyRef.current = true;
            },
          });
          return;
        }

        snapToLayout();
      });
    }

    function onCardSizeChange() {
      if (cancelled || token !== setupTokenRef.current) return;
      if (!readyRef.current || isAnimatingRef.current) return;

      cancelAnimationFrame(cardResizeRaf);
      cardResizeRaf = requestAnimationFrame(() => {
        if (cancelled || token !== setupTokenRef.current) return;
        if (!readyRef.current || isAnimatingRef.current) return;
        snapToLayout();
      });
    }

    async function boot() {
      const width = await waitForStableContainer(container);
      if (cancelled || token !== setupTokenRef.current) return;
      if (!(width > 0)) return;

      measureMultipliers();
      killAllCardMotion();
      setEntryStartState();

      if (typeof ResizeObserver !== "undefined") {
        containerObserver = new ResizeObserver(onContainerResize);
        containerObserver.observe(container);

        cardObserver = new ResizeObserver(onCardSizeChange);
        cardRefs.current.forEach((el) => {
          if (el) cardObserver.observe(el);
        });
      }

      isAnimatingRef.current = true;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      applyFanLayout(true, {
        centerIndex: centerIndexRef.current,
        hoverSlot: null,
        duration: reduceMotion ? 0 : 0.85,
        ease: reduceMotion ? "none" : "power3.out",
        onComplete: () => {
          if (cancelled || token !== setupTokenRef.current) return;
          snapToLayout();
          readyRef.current = true;
        },
      });
    }

    boot();
    window.addEventListener("resize", onContainerResize);

    return () => {
      cancelled = true;
      setupTokenRef.current += 1;
      readyRef.current = false;
      isAnimatingRef.current = false;
      cancelAnimationFrame(resizeRaf);
      cancelAnimationFrame(cardResizeRaf);
      containerObserver?.disconnect();
      cardObserver?.disconnect();
      window.removeEventListener("resize", onContainerResize);
      if (layoutTlRef.current) {
        layoutTlRef.current.kill();
        layoutTlRef.current = null;
      }
      gsap.killTweensOf(mountedCards.filter(Boolean));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- boot once per mount; layout driven by refs
  }, [total]);

  function handleCardEnter(slot) {
    if (!readyRef.current || isAnimatingRef.current) return;
    if (slot === undefined) return;
    hoveredSlotRef.current = slot;
    applyFanLayout(true, {
      hoverSlot: slot,
      duration: 0.35,
    });
  }

  function handleCardLeave() {
    if (!readyRef.current || isAnimatingRef.current) return;
    hoveredSlotRef.current = null;
    applyFanLayout(true, {
      hoverSlot: null,
      duration: 0.35,
    });
  }

  function cycle(direction) {
    if (!readyRef.current || isAnimatingRef.current) return;

    hoveredSlotRef.current = null;
    const next = (centerIndexRef.current + direction + total) % total;
    centerIndexRef.current = next;
    setCenterIndex(next);

    isAnimatingRef.current = true;
    measureMultipliers();
    applyFanLayout(true, {
      centerIndex: next,
      hoverSlot: null,
      duration: 0.5,
      ease: "power3.out",
      onComplete: () => {
        snapToLayout();
      },
    });
  }

  function goTo(index) {
    if (!readyRef.current || isAnimatingRef.current) return;
    if (index === centerIndexRef.current) return;

    hoveredSlotRef.current = null;
    centerIndexRef.current = index;
    setCenterIndex(index);

    isAnimatingRef.current = true;
    measureMultipliers();
    applyFanLayout(true, {
      centerIndex: index,
      hoverSlot: null,
      duration: 0.5,
      ease: "power3.out",
      onComplete: () => {
        snapToLayout();
      },
    });
  }

  const visibleMap = getVisibleMap(centerIndex, total);

  return (
    <div className="relative mx-auto w-full overflow-visible">
      <div
        ref={containerRef}
        className="relative mx-auto w-full overflow-visible"
        style={{ minHeight: "720px", height: "760px" }}
      >
        <div className="absolute inset-0 overflow-visible">
          {scents.map((scent, cardIndex) => {
            const slot = visibleMap.get(cardIndex);
            const baseZ =
              slot !== undefined
                ? (FAN_POSITIONS[Math.min(total, MAX_VISIBLE)]?.[slot]
                    ?.zIndex ?? 1)
                : 0;
            return (
              <div
                key={scent.slug}
                ref={(el) => {
                  cardRefs.current[cardIndex] = el;
                }}
                className="fan-card absolute left-1/2 top-1/2 w-72 xl:w-80 will-change-transform"
                style={{
                  zIndex: baseZ,
                  height: FAN_CARD_HEIGHT_PX,
                }}
                onMouseEnter={() => handleCardEnter(slot)}
                onMouseLeave={handleCardLeave}
              >
                <ScentCard scent={scent} />
              </div>
            );
          })}
        </div>
      </div>

      {showPagination && (
        <div className="relative z-20 mt-2 flex flex-col items-center gap-4 pb-2">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => cycle(-1)}
              aria-label="Previous scent"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-tiger-border bg-tiger-bg/80 text-tiger-gold transition-colors hover:border-tiger-gold hover:bg-tiger-surface"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M9 2.5L4.5 7L9 11.5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="flex items-center gap-2" role="tablist" aria-label="Scent pages">
              {scents.map((scent, index) => (
                <button
                  key={scent.slug}
                  type="button"
                  role="tab"
                  aria-selected={index === centerIndex}
                  aria-label={`Show ${scent.name}`}
                  onClick={() => goTo(index)}
                  className="h-2 w-2 rounded-full transition-colors duration-200"
                  style={{
                    backgroundColor:
                      index === centerIndex
                        ? "#C9940A"
                        : "rgba(242, 230, 196, 0.28)",
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => cycle(1)}
              aria-label="Next scent"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-tiger-border bg-tiger-bg/80 text-tiger-gold transition-colors hover:border-tiger-gold hover:bg-tiger-surface"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M5 2.5L9.5 7L5 11.5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
