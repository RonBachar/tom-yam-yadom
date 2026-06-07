import { NextResponse } from "next/server";
import { Resend } from "resend";

const FROM = "Tom Yam Yadom <info@tomyamyadomherbals.com>";
const TO = "info@tomyamyadomherbals.com";

const BUSINESS_TYPE_LABELS = {
  gym: "Gym / Martial Arts Studio",
  "smoke-shop": "Smoke Shop",
  wellness: "Wellness / Health Store",
  lifestyle: "Lifestyle / Boutique Retail",
  distributor: "Distributor",
  other: "Other",
};

function isValidEmail(email) {
  return (
    typeof email === "string" &&
    email.includes("@") &&
    email.includes(".") &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  );
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const name = body?.name?.trim() ?? "";
    const business = body?.business?.trim() ?? "";
    const email = body?.email?.trim() ?? "";
    const phone = body?.phone?.trim() ?? "";
    const type = body?.type?.trim() ?? "";
    const message = body?.message?.trim() ?? "";

    if (!name || !business || !email || !type) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const typeLabel = BUSINESS_TYPE_LABELS[type] ?? type;
    const subjectName = business || name;

    const html = `
      <h2>Wholesale Inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Business Name:</strong> ${escapeHtml(business)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${phone ? escapeHtml(phone) : "Not provided"}</p>
      <p><strong>Business Type:</strong> ${escapeHtml(typeLabel)}</p>
      <p><strong>Message:</strong></p>
      <p>${message ? escapeHtml(message).replace(/\n/g, "<br>") : "Not provided"}</p>
    `;

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: email,
      subject: `Wholesale Inquiry - ${subjectName}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Wholesale email error:", error);
    return NextResponse.json(
      { error: "Failed to send inquiry. Please try again." },
      { status: 500 }
    );
  }
}
