import { NextResponse } from "next/server";
import { Resend } from "resend";

const FROM = "Tom Yam Yadom <info@tomyamyadomherbals.com>";
const INTERNAL_TO = "info@tomyamyadomherbals.com";
const SHOP_URL = "https://www.tomyamyadomherbals.com/shop";
const DISCOUNT_CODE = "TIGER10";

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

function subscriberEmailHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your 10% off code is inside</title>
</head>
<body style="margin:0;padding:0;background-color:#0D0B08;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0D0B08;">
    <tr>
      <td align="center" style="padding:48px 20px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;background-color:#1C1610;border:1px solid #3A2A18;border-radius:16px;font-family:Georgia,'Times New Roman',serif;text-align:center;">
          <tr>
            <td style="padding:40px 36px 32px;text-align:center;border-bottom:1px solid #3A2A18;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#C9940A;">
                TOM YAM YADOM
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 36px 8px;">
              <p style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:700;line-height:1.3;color:#F0EDE6;">
                Welcome to the circle
              </p>
              <p style="margin:0;font-family:Georgia,Arial,sans-serif;font-size:16px;line-height:1.7;color:#F0EDE6;">
                Thanks for joining us. Your first-order discount is ready whenever you are.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0D0B08;border:2px solid #C9940A;border-radius:12px;">
                <tr>
                  <td style="padding:28px 24px;text-align:center;">
                    <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#C9940A;">
                      Your discount code
                    </p>
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:36px;font-weight:700;letter-spacing:0.18em;color:#C9940A;">
                      ${DISCOUNT_CODE}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 36px 28px;">
              <p style="margin:0;font-family:Georgia,Arial,sans-serif;font-size:16px;line-height:1.7;color:#F0EDE6;">
                Use code <strong style="color:#C9940A;">TIGER10</strong> at checkout for 10% off your first order.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 36px 40px;text-align:center;">
              <a href="${SHOP_URL}" style="display:inline-block;background-color:#C9940A;color:#0D0B08;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;text-decoration:none;padding:16px 32px;border-radius:999px;">
                Shop Now
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 36px 36px;border-top:1px solid #3A2A18;text-align:center;">
              <p style="margin:0;font-family:Georgia,Arial,sans-serif;font-size:13px;line-height:1.6;color:#8A7A60;">
                Handcrafted in Koh Samui, Thailand
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

async function sendResendEmail(resend, label, payload) {
  console.log(`[newsletter] Sending ${label} to:`, payload.to);

  const { data, error } = await resend.emails.send(payload);

  if (error) {
    console.error(`[newsletter] ${label} failed:`, error);
    throw new Error(error.message || `Failed to send ${label}`);
  }

  console.log(`[newsletter] ${label} sent successfully:`, data?.id ?? data);
  return data;
}

export async function POST(request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[newsletter] RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const email = body?.email?.trim() ?? "";

    if (!email) {
      return NextResponse.json(
        { error: "Please enter your email address." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const resend = new Resend(apiKey);

    await sendResendEmail(resend, "subscriber confirmation", {
      from: FROM,
      to: [email],
      subject: "Your 10% off code is inside",
      html: subscriberEmailHtml(),
    });

    try {
      await sendResendEmail(resend, "internal notification", {
        from: FROM,
        to: [INTERNAL_TO],
        subject: `New newsletter signup: ${email}`,
        html: `<p>New newsletter signup:</p><p><strong>${escapeHtml(email)}</strong></p>`,
      });
    } catch (internalError) {
      console.error(
        "[newsletter] Internal notification failed (subscriber email was sent):",
        internalError
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[newsletter] Request failed:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to subscribe. Please try again.",
      },
      { status: 500 }
    );
  }
}
