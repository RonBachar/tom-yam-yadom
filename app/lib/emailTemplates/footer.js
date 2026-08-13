import { MAILING_ADDRESS_LINE } from "../../data/policies";

const BASE_URL = "https://www.tomyamyadomherbals.com";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildUnsubscribeUrl(email, token) {
  return `${BASE_URL}/api/unsubscribe?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;
}

export function emailComplianceFooter({ email, token }) {
  const unsubHref = buildUnsubscribeUrl(email, token);

  return `<tr>
            <td style="padding:24px 36px 36px;border-top:1px solid #3A2A18;text-align:center;">
              <p style="margin:0 0 8px;font-family:Georgia,Arial,sans-serif;font-size:13px;line-height:1.6;color:#9A8A6C;">
                Handcrafted in Koh Samui, Thailand
              </p>
              <p style="margin:0 0 8px;font-family:Georgia,Arial,sans-serif;font-size:13px;line-height:1.6;color:#9A8A6C;">
                ${escapeHtml(MAILING_ADDRESS_LINE)}
              </p>
              <p style="margin:0;font-family:Georgia,Arial,sans-serif;font-size:13px;line-height:1.6;color:#9A8A6C;">
                Don't want these emails? <a href="${unsubHref}" style="color:#9A8A6C;text-decoration:underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>`;
}
