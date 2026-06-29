import {
  LegalPageLayout,
  LegalSection,
  LegalSubheading,
  LegalEmailLink,
} from "../components/legal/LegalPageLayout";
import { SHIPPING_POLICY, RETURN_POLICY } from "@/app/data/policies";

const BASE_URL = "https://www.tomyamyadomherbals.com";

export const metadata = {
  title: "Shipping & Returns | Tom Yam Yadom",
  description:
    "US shipping options, processing times, tracking, return eligibility, refunds, and damaged orders for Tom Yam Yadom Thai herbal inhalers and oils.",
  alternates: { canonical: `${BASE_URL}/shipping` },
  openGraph: {
    title: "Shipping & Returns | Tom Yam Yadom",
    description:
      "US shipping, returns, refunds, and damaged orders for Tom Yam Yadom handcrafted Thai herbal inhalers and oils.",
    url: `${BASE_URL}/shipping`,
    siteName: "Tom Yam Yadom",
    locale: "en_US",
    type: "website",
  },
};

export default function ShippingPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Shipping & Returns"
      lastUpdated="June 2026"
    >
      <LegalSection title="Shipping">
        <LegalSubheading>Where we ship</LegalSubheading>
        <p>
          We currently ship to all 50 US states. International shipping is coming soon. Sign up for our newsletter to be notified.
        </p>

        <LegalSubheading>Shipping options and costs</LegalSubheading>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Standard Shipping: ${SHIPPING_POLICY.standard.price} - arrives within{" "}
            {SHIPPING_POLICY.standard.transitDays} business days
          </li>
          <li className="min-w-0 break-words">
            Expedited Shipping: ${SHIPPING_POLICY.expedited.price} - arrives within{" "}
            {SHIPPING_POLICY.expedited.transitDaysMin}-
            {SHIPPING_POLICY.expedited.transitDaysMax} business days
          </li>
          <li className="min-w-0 break-words">
            Free standard shipping on orders over ${SHIPPING_POLICY.freeThreshold}
          </li>
        </ul>
        <p>
          Shipping costs and delivery estimates are calculated and shown at checkout before you confirm your order.
        </p>

        <LegalSubheading>Processing time</LegalSubheading>
        <p>
          Orders are processed and dispatched within{" "}
          {SHIPPING_POLICY.handlingDaysMin}-{SHIPPING_POLICY.handlingDaysMax}{" "}
          business days of being placed. Orders placed on weekends or public holidays are processed the next business day. During high-demand periods processing may take a little longer. We&apos;ll let you know if there&apos;s a significant delay.
        </p>

        <LegalSubheading>Tracking</LegalSubheading>
        <p>
          Once your order ships you&apos;ll receive an email with a tracking number to follow your package directly on the carrier&apos;s website.
        </p>

        <LegalSubheading>Delivery issues</LegalSubheading>
        <p>
          If your tracking shows &ldquo;delivered&rdquo; but you haven&apos;t received your package, please check with neighbors and around your property first. If it&apos;s still missing after 48 hours, email us at <LegalEmailLink /> with your order number and we&apos;ll do our best to make it right.
        </p>
        <p>
          We are not responsible for packages lost or delayed due to an incorrect address provided at checkout. Please double-check your address before confirming.
        </p>
      </LegalSection>

      <LegalSection title="Returns & Refunds">
        <LegalSubheading>Our returns policy</LegalSubheading>
        <p>
          If you are unsatisfied with our product, please email info@tomyamyadomherbals.com within{" "}
          {RETURN_POLICY.windowDays} days of purchase and state the issue. Upon receiving your complaint, we will issue you a return address. Once we receive the returned product, we will issue a refund within{" "}
          {RETURN_POLICY.refundDays} days, no questions asked. Your enjoyment of our product is paramount.
        </p>

        <LegalSubheading>Return window</LegalSubheading>
        <p>
          We accept returns on any item within {RETURN_POLICY.windowDays} days of purchase, not only unopened products.
        </p>

        <LegalSubheading>Return shipping costs</LegalSubheading>
        <p>
          We cover return shipping. You do not pay to send items back to us.
        </p>

        <LegalSubheading>Refunds</LegalSubheading>
        <p>
          Refunds are issued within {RETURN_POLICY.refundDays} days of receiving your returned product. Allow additional time for your bank or card issuer to reflect the refund on your statement.
        </p>
        <p>
          No restocking fee.
        </p>

        <LegalSubheading>Exchanges</LegalSubheading>
        <p>
          We do not offer direct exchanges at this time. Return your item for a refund and place a new order.
        </p>

        <LegalSubheading>Damaged or defective items</LegalSubheading>
        <p>
          If your order arrives damaged, defective, or incorrect, email us at <LegalEmailLink /> within 7 days of delivery with your order number and a photo of the issue. We will send a replacement or issue a full refund, no questions asked.
        </p>

        <LegalSubheading>How to start a return</LegalSubheading>
        <p>
          Email <LegalEmailLink /> with your order number and reason for return. Do not send items back before contacting us. We&apos;ll provide return instructions and a return address.
        </p>
      </LegalSection>

      <LegalSection title="Questions?">
        <p>
          We&apos;re a small, founder-run brand and we care about every order. If something isn&apos;t right, reach out and we&apos;ll sort it out.
        </p>
        <p>
          Email: <LegalEmailLink />
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
