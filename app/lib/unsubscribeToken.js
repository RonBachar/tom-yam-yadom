import { createHmac, timingSafeEqual } from "node:crypto";

function normalizeEmail(email) {
  return String(email ?? "").trim().toLowerCase();
}

export function generateToken(email) {
  const secret = process.env.UNSUBSCRIBE_SECRET;
  if (!secret) {
    throw new Error("Missing UNSUBSCRIBE_SECRET");
  }

  return createHmac("sha256", secret)
    .update(normalizeEmail(email))
    .digest("hex")
    .slice(0, 16);
}

export function verifyToken(email, token) {
  if (!email || typeof token !== "string" || token.length !== 16) {
    return false;
  }

  try {
    const expected = generateToken(email);
    return timingSafeEqual(
      Buffer.from(expected, "utf8"),
      Buffer.from(token, "utf8")
    );
  } catch {
    return false;
  }
}
