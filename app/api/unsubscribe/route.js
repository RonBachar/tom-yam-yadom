import { NextResponse } from "next/server";
import {
  getSubscriberByEmail,
  markUnsubscribed,
} from "../../lib/googleSheets";
import { verifyToken } from "../../lib/unsubscribeToken";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GOLD = "#C9940A";

function brandedPage({ title, heading, body }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:#0D0B08;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0D0B08;min-height:100vh;">
    <tr>
      <td align="center" style="padding:48px 20px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;background-color:#1C1610;border:1px solid #3A2A18;border-radius:16px;text-align:center;">
          <tr>
            <td style="padding:40px 36px 32px;border-bottom:1px solid #3A2A18;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:${GOLD};">
                TOM YAM YADOM
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:36px;">
              <p style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:700;line-height:1.3;color:#F0EDE6;">
                ${heading}
              </p>
              <p style="margin:0;font-family:Georgia,Arial,sans-serif;font-size:16px;line-height:1.7;color:#F0EDE6;">
                ${body}
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

function htmlResponse(html, status = 200) {
  return new NextResponse(html, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export async function GET(request) {
  const email = request.nextUrl.searchParams.get("email") ?? "";
  const token = request.nextUrl.searchParams.get("token") ?? "";

  if (!verifyToken(email, token)) {
    return htmlResponse(
      brandedPage({
        title: "Invalid unsubscribe link",
        heading: "This link is invalid",
        body: "This unsubscribe link is invalid. If you still receive emails from us, reply to that message and we will take you off the list.",
      }),
      400
    );
  }

  try {
    const subscriber = await getSubscriberByEmail(email);
    if (subscriber && !subscriber.unsubscribed) {
      await markUnsubscribed(subscriber.rowIndex);
    }

    return htmlResponse(
      brandedPage({
        title: "Unsubscribed",
        heading: "You've been unsubscribed",
        body: "You won't receive further emails from us.",
      })
    );
  } catch (error) {
    console.error("[unsubscribe] Failed:", error);
    return htmlResponse(
      brandedPage({
        title: "Unsubscribe error",
        heading: "Something went wrong",
        body: "We could not update your subscription just now. Please try the link again, or <a href=\"mailto:info@tomyamyadomherbals.com\" style=\"color:#C9940A;text-decoration:underline;\">email us</a> and we will take you off the list.",
      }),
      500
    );
  }
}
