"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function AddToCartButton({
  product,
  className,
  style,
  "aria-label": ariaLabel,
  children,
  stopPropagation = false,
}) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick(e) {
    if (stopPropagation) {
      e.stopPropagation();
    }

    addToCart(
      {
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image ?? "",
      },
      1
    );

    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      style={style}
      aria-label={ariaLabel}
    >
      {added ? "Added ✓" : children}
    </button>
  );
}
