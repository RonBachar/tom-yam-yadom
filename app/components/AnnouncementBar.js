"use client";

import { useEffect, useState } from "react";
import { SHIPPING_POLICY } from "../data/policies";

const MESSAGES = [
  `Free shipping on orders over $${SHIPPING_POLICY.freeThreshold}`,
  "Ships from the US 🐯",
  "Handcrafted in Koh Samui",
];

const ROTATE_MS = 3500;
const TRANSITION_MS = 300;

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex((prev) => (prev + 1) % MESSAGES.length);
        setVisible(true);
      }, TRANSITION_MS);
    }, ROTATE_MS);

    return () => clearInterval(id);
  }, []);

  return (
    <div
      role="region"
      aria-label="Site announcement"
      className="fixed top-0 left-0 right-0 z-[60] flex h-9 items-center justify-center overflow-hidden bg-tiger-gold px-4 text-tiger-bg"
      aria-live="polite"
    >
      <p
        className={`m-0 w-full max-w-xl text-center font-sans text-xs font-medium tracking-wide transition-[opacity,transform] duration-300 ease-out sm:text-sm ${
          visible
            ? "translate-y-0 opacity-100"
            : "-translate-y-2 opacity-0"
        }`}
      >
        {MESSAGES[index]}
      </p>
    </div>
  );
}
