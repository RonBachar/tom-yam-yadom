import {
  COMPLETE_RITUAL_SET,
  SCENTS,
  YADOM_OIL,
} from "../../data/products";
import { emailComplianceFooter } from "./footer";

const BASE_URL = "https://www.tomyamyadomherbals.com";
const DISCOUNT_CODE = "TIGER10";
const GOLD = COMPLETE_RITUAL_SET.accentColor;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function scentBySlug(slug) {
  const scent = SCENTS.find((item) => item.slug === slug);
  if (!scent) {
    throw new Error(`Unknown scent slug: ${slug}`);
  }
  return scent;
}

function scentName(slug) {
  const scent = scentBySlug(slug);
  return `<strong style="color:${scent.accentColor};">${escapeHtml(scent.name)}</strong>`;
}

function paragraph(html, isLast) {
  const margin = isLast ? "0" : "16px";
  return `<p style="margin:0 0 ${margin};font-family:Georgia,Arial,sans-serif;font-size:16px;line-height:1.7;color:#F0EDE6;">${html}</p>`;
}

function brandedEmail({
  title,
  paragraphs,
  extraHtml = "",
  ctaLabel,
  ctaHref,
  email,
  token,
}) {
  const body = paragraphs
    .map((html, index) =>
      paragraph(html, index === paragraphs.length - 1 && !extraHtml)
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background-color:#0D0B08;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0D0B08;">
    <tr>
      <td align="center" style="padding:48px 20px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;background-color:#1C1610;border:1px solid #3A2A18;border-radius:16px;font-family:Georgia,'Times New Roman',serif;text-align:center;">
          <tr>
            <td style="padding:40px 36px 32px;text-align:center;border-bottom:1px solid #3A2A18;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:${GOLD};">
                TOM YAM YADOM
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 36px 8px;">
              <p style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:700;line-height:1.3;color:#F0EDE6;">
                ${escapeHtml(title)}
              </p>
              ${body}
            </td>
          </tr>
          ${extraHtml}
          <tr>
            <td style="padding:28px 36px 12px;text-align:center;">
              <a href="${ctaHref}" style="display:inline-block;background-color:${GOLD};color:#0D0B08;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;text-decoration:none;padding:16px 32px;border-radius:999px;">
                ${escapeHtml(ctaLabel)}
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 36px 28px;">
              <p style="margin:0;font-family:Georgia,Arial,sans-serif;font-size:16px;line-height:1.7;color:#F0EDE6;">
                The team at Smiling Tiger
              </p>
            </td>
          </tr>
          ${emailComplianceFooter({ email, token })}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function discountCodeBlock(code) {
  return `<tr>
            <td style="padding:28px 36px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0D0B08;border:2px solid ${GOLD};border-radius:12px;">
                <tr>
                  <td style="padding:28px 24px;text-align:center;">
                    <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${GOLD};">
                      Your discount code
                    </p>
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:36px;font-weight:700;letter-spacing:0.18em;color:${GOLD};">
                      ${escapeHtml(code)}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`;
}

const SHOP_URL = `${BASE_URL}/shop`;
const STORY_URL = `${BASE_URL}/story`;
const YADOM_STORY_URL = `${BASE_URL}/blog/what-is-yadom-thai-herbal-inhaler`;
const RITUAL_SET_URL = `${BASE_URL}/products/${COMPLETE_RITUAL_SET.slug}`;
const RITUAL_SET_SHORT_NAME = COMPLETE_RITUAL_SET.name.split(":")[0].trim();

export function welcome_2(email, token) {
  const subject = "Which scent is you?";
  return {
    subject,
    html: brandedEmail({
      title: subject,
      paragraphs: [
        "Every inhaler we make is built for a different mood.",
        `Need to focus? ${scentName("clarity")} is cool, sharp, and cuts through noise.`,
        `Need to slow down? ${scentName("serenity")} calms the mind and softens your breath.`,
        `Need a lift? ${scentName("vitality")} brings energy and confidence when you need it most.`,
        "Not sure where to start? Take a look at all seven and find the one that fits your day.",
      ],
      ctaLabel: "Explore the scents",
      ctaHref: SHOP_URL,
      email,
      token,
    }),
  };
}

export function welcome_3(email, token) {
  const subject = "A ritual for wherever you are";
  return {
    subject,
    html: brandedEmail({
      title: subject,
      paragraphs: [
        "People bring their inhalers everywhere. On a run, before a workout, in the middle of a long workday, at a festival at 2am.",
        "It's a small thing that makes a real difference in the moment.",
        "If you haven't used your code yet, it's still here:",
      ],
      extraHtml: discountCodeBlock(DISCOUNT_CODE),
      ctaLabel: "Shop now",
      ctaHref: SHOP_URL,
      email,
      token,
    }),
  };
}

export function education_1(email, token) {
  const subject = "What is yadom, actually?";
  return {
    subject,
    html: brandedEmail({
      title: subject,
      paragraphs: [
        "If you've never heard of yadom before, here's the short version: it's a traditional Thai herbal inhaler, inhaled through the nose, used for centuries as part of daily life across Thailand.",
        "It's not medicine. It's not a vape. It's closer to smelling salts crossed with a calming ritual.",
        "Curious how it's different from something like Vicks? We wrote the full breakdown.",
      ],
      ctaLabel: "Read the full story",
      ctaHref: YADOM_STORY_URL,
      email,
      token,
    }),
  };
}

export function education_2(email, token) {
  const subject = "Find your scent";
  return {
    subject,
    html: brandedEmail({
      title: subject,
      paragraphs: [
        `${SCENTS.length} scents, ${SCENTS.length} moods. Here's a quick way to think about it:`,
        `Want energy? Start with ${scentName("vitality")} or ${scentName("radiance")}.`,
        `Want calm? Start with ${scentName("serenity")} or ${scentName("balance")}.`,
        `Want focus? Start with ${scentName("clarity")} or ${scentName("power")}.`,
        `Want warmth? Start with ${scentName("compassion")}.`,
      ],
      ctaLabel: "Shop all scents",
      ctaHref: SHOP_URL,
      email,
      token,
    }),
  };
}

export function education_3(email, token) {
  const subject = "The fighter behind Smiling Tiger";
  return {
    subject,
    html: brandedEmail({
      title: subject,
      paragraphs: [
        "Tyler didn't start this company from an office. He started it training and fighting Muay Thai between Thailand and the US, frustrated with everything on the market: synthetic, short shelf life, no real connection to where it came from.",
        "Smiling Tiger is what he wished existed.",
      ],
      ctaLabel: "Read the full story",
      ctaHref: STORY_URL,
      email,
      token,
    }),
  };
}

export function education_4(email, token) {
  const subject = "The full ritual, all in one set";
  const price = COMPLETE_RITUAL_SET.price;
  return {
    subject,
    html: brandedEmail({
      title: subject,
      paragraphs: [
        `If you've tried one or two scents and you're curious about the rest, the ${escapeHtml(RITUAL_SET_SHORT_NAME)} has all ${SCENTS.length}, plus our ${escapeHtml(YADOM_OIL.name)} oil, in one set.`,
        `It's the easiest way to build your own daily ritual, and it's $${price}.`,
      ],
      ctaLabel: `Shop the ${RITUAL_SET_SHORT_NAME}`,
      ctaHref: RITUAL_SET_URL,
      email,
      token,
    }),
  };
}

export const SEQUENCE_TEMPLATES = {
  welcome_2,
  welcome_3,
  education_1,
  education_2,
  education_3,
  education_4,
};
