import {
  LegalPageLayout,
  LegalSection,
  LegalSubheading,
  LegalEmailLink,
  Placeholder,
} from "../components/legal/LegalPageLayout";

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
      <div
        className="min-w-0 rounded-xl px-5 py-4 border border-tiger-gold/40 bg-tiger-gold/10 text-tiger-cream text-sm font-sans break-words"
        role="note"
      >
        <p>
          ⚠️ NOTE FOR THE TEAM: All <Placeholder>[BRACKETED PLACEHOLDERS]</Placeholder> must be confirmed and replaced before this page goes live.
        </p>
      </div>

      <LegalSection title="Shipping">
        <LegalSubheading>Where we ship</LegalSubheading>
        <p>
          We currently ship to all 50 US states. International shipping is coming soon — sign up for our newsletter to be notified.
        </p>

        <LegalSubheading>Shipping options and costs</LegalSubheading>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Standard Shipping: <Placeholder>[STANDARD SHIPPING COST]</Placeholder> — estimated delivery in <Placeholder>[X–X BUSINESS DAYS]</Placeholder>
          </li>
          <li className="min-w-0 break-words">
            Expedited Shipping: <Placeholder>[EXPEDITED SHIPPING COST]</Placeholder> — estimated delivery in <Placeholder>[X–X BUSINESS DAYS]</Placeholder>
          </li>
          <li className="min-w-0 break-words">
            Free shipping on orders over <Placeholder>[FREE SHIPPING THRESHOLD, e.g. $45]</Placeholder>
          </li>
        </ul>
        <p>
          Shipping costs and delivery estimates are calculated and shown at checkout before you confirm your order.
        </p>

        <LegalSubheading>Processing time</LegalSubheading>
        <p>
          Orders are processed and dispatched within <Placeholder>[X–X BUSINESS DAYS]</Placeholder> of being placed. Orders placed on weekends or public holidays are processed the next business day. During high-demand periods processing may take a little longer — we&apos;ll let you know if there&apos;s a significant delay.
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
        <LegalSubheading>Return window</LegalSubheading>
        <p>
          We accept returns on unopened, unused items within <Placeholder>[RETURN WINDOW, e.g. 30 DAYS]</Placeholder> of the delivery date.
        </p>

        <LegalSubheading>Conditions for return</LegalSubheading>
        <p>To be eligible for a return, items must meet all of the following:</p>
        <ul className="list-disc pl-6 space-y-2 my-4 min-w-0">
          <li className="min-w-0 break-words">
            <Placeholder>[CONDITION 1 — e.g. Unopened and unused, seal intact]</Placeholder>
          </li>
          <li className="min-w-0 break-words">
            <Placeholder>[CONDITION 2 — e.g. In original packaging with label undamaged]</Placeholder>
          </li>
          <li className="min-w-0 break-words">
            <Placeholder>[CONDITION 3 — e.g. Returned within the return window from delivery date]</Placeholder>
          </li>
        </ul>
        <p>
          Due to the nature of herbal inhalers and oils, we cannot accept returns on opened products unless the item arrived damaged or defective.
        </p>

        <LegalSubheading>Damaged or defective items</LegalSubheading>
        <p>
          If your order arrives damaged, defective, or incorrect, email us at <LegalEmailLink /> within <Placeholder>[X DAYS, e.g. 7 DAYS]</Placeholder> of delivery with your order number and a photo of the issue. We will send a replacement or issue a full refund — no questions asked.
        </p>

        <LegalSubheading>How to start a return</LegalSubheading>
        <p>
          Email <LegalEmailLink /> with your order number and reason for return. Do not send items back before contacting us — we&apos;ll provide return instructions and a return address.
        </p>

        <LegalSubheading>Return shipping costs</LegalSubheading>
        <p>
          <Placeholder>[RETURN SHIPPING POLICY — e.g. &quot;Return shipping is the responsibility of the customer, except in cases of damaged or defective items where we provide a prepaid label.&quot;]</Placeholder>
        </p>

        <LegalSubheading>Refunds</LegalSubheading>
        <p>
          Once we receive and inspect your returned item we&apos;ll notify you by email. Approved refunds are processed to your original payment method within <Placeholder>[X BUSINESS DAYS, e.g. 5–7 BUSINESS DAYS]</Placeholder>. Allow additional time for your bank or card issuer to reflect the refund.
        </p>
        <p>
          <Placeholder>[RESTOCKING FEE — e.g. &quot;No restocking fee.&quot; OR &quot;A restocking fee of $X applies to non-defective returns.&quot;]</Placeholder>
        </p>

        <LegalSubheading>Exchanges</LegalSubheading>
        <p>
          <Placeholder>[EXCHANGE POLICY — e.g. &quot;We do not offer direct exchanges at this time. Return the item for a refund and place a new order.&quot; OR &quot;We&apos;re happy to exchange unopened items for a different scent — contact us to arrange.&quot;]</Placeholder>
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

      <LegalSection title="Placeholders Checklist (Shipping & Returns page)">
        <ul className="list-none pl-0 space-y-2 my-4 min-w-0">
          <li className="flex items-start gap-2 min-w-0">
            <span className="text-tiger-gold mt-0.5" aria-hidden="true">☐</span>
            <span>Standard shipping cost</span>
          </li>
          <li className="flex items-start gap-2 min-w-0">
            <span className="text-tiger-gold mt-0.5" aria-hidden="true">☐</span>
            <span>Expedited shipping cost</span>
          </li>
          <li className="flex items-start gap-2 min-w-0">
            <span className="text-tiger-gold mt-0.5" aria-hidden="true">☐</span>
            <span>Free shipping threshold</span>
          </li>
          <li className="flex items-start gap-2 min-w-0">
            <span className="text-tiger-gold mt-0.5" aria-hidden="true">☐</span>
            <span>Processing time (business days)</span>
          </li>
          <li className="flex items-start gap-2 min-w-0">
            <span className="text-tiger-gold mt-0.5" aria-hidden="true">☐</span>
            <span>Return window (days)</span>
          </li>
          <li className="flex items-start gap-2 min-w-0">
            <span className="text-tiger-gold mt-0.5" aria-hidden="true">☐</span>
            <span>Return conditions (3 bullet points)</span>
          </li>
          <li className="flex items-start gap-2 min-w-0">
            <span className="text-tiger-gold mt-0.5" aria-hidden="true">☐</span>
            <span>Damaged item report window (days)</span>
          </li>
          <li className="flex items-start gap-2 min-w-0">
            <span className="text-tiger-gold mt-0.5" aria-hidden="true">☐</span>
            <span>Who pays return shipping</span>
          </li>
          <li className="flex items-start gap-2 min-w-0">
            <span className="text-tiger-gold mt-0.5" aria-hidden="true">☐</span>
            <span>Refund processing time (business days)</span>
          </li>
          <li className="flex items-start gap-2 min-w-0">
            <span className="text-tiger-gold mt-0.5" aria-hidden="true">☐</span>
            <span>Restocking fee decision</span>
          </li>
          <li className="flex items-start gap-2 min-w-0">
            <span className="text-tiger-gold mt-0.5" aria-hidden="true">☐</span>
            <span>Exchange policy</span>
          </li>
        </ul>
      </LegalSection>
    </LegalPageLayout>
  );
}
