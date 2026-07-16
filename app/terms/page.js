import {
  LegalPageLayout,
  LegalSection,
  LegalEmailLink,
  ShippingReturnsLink,
} from "../components/legal/LegalPageLayout";
import { DEFAULT_OG_IMAGE } from "../data/siteMeta";

const BASE_URL = "https://www.tomyamyadomherbals.com";

export const metadata = {
  title: "Terms of Service | Tom Yam Yadom",
  description:
    "Terms for shopping at Tom Yam Yadom: orders, Stripe payments, product disclaimers, shipping, returns, intellectual property, and liability.",
  alternates: { canonical: `${BASE_URL}/terms` },
  openGraph: {
    title: "Terms of Service | Tom Yam Yadom",
    description:
      "Terms for shopping at Tom Yam Yadom: orders, payments, product disclaimers, shipping, returns, and liability.",
    url: `${BASE_URL}/terms`,
    siteName: "Tom Yam Yadom",
    locale: "en_US",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default function TermsPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Terms of Service"
      lastUpdated="June 2026"
    >
      <p className="text-tiger-cream">
        By visiting tomyamyadomherbals.com or placing an order with us, you agree to the following terms.
      </p>

      <LegalSection title="About Our Products">
        <p>
          Tom Yam Yadom sells premium handcrafted Thai herbal inhalers and herbal oils. Our products are made from organic herbal ingredients sourced from Thailand and are intended for personal, lifestyle, and aromatic use.
        </p>
        <p>
          <strong className="text-tiger-cream">Important — Not a Medical Product.</strong>{" "}
          Our herbal inhalers and oils are wellness and lifestyle products. They are not medicines, medical devices, or dietary supplements. They are not intended to diagnose, treat, cure, or prevent any disease or medical condition. Nothing on this website constitutes medical advice. If you have a medical condition, consult a qualified healthcare provider before use.
        </p>
        <p>
          Our products contain natural herbal ingredients. If you have known allergies or sensitivities to any listed ingredient, do not use the product. Keep out of reach of children. For aromatic use only — do not ingest.
        </p>
      </LegalSection>

      <LegalSection title="Orders and Acceptance">
        <p>
          Placing an order constitutes an offer to purchase. We reserve the right to accept or decline any order at our discretion. An order is confirmed when you receive a confirmation email from us.
        </p>
        <p>
          We may cancel orders due to pricing errors, stock issues, or suspected fraud. If we cancel your order, you will receive a full refund.
        </p>
        <p>
          All prices are in US Dollars (USD). Prices are subject to change without notice but changes will not affect orders already confirmed.
        </p>
      </LegalSection>

      <LegalSection title="Payment">
        <p>
          All payments are processed securely through Stripe. We accept major credit and debit cards. We do not store your full card number. Stripe handles all payment data in accordance with PCI-DSS compliance standards.
        </p>
      </LegalSection>

      <LegalSection title="Shipping">
        <p>
          We currently ship within the United States. Shipping costs and estimated delivery times are shown at checkout. For full details see our <ShippingReturnsLink /> page. We are not responsible for delays caused by carriers or circumstances outside our control. Risk of loss passes to you upon handoff to the carrier.
        </p>
      </LegalSection>

      <LegalSection title="Returns and Refunds">
        <p>
          Our return and refund policy is detailed on our <ShippingReturnsLink /> page. Due to the nature of herbal products, we cannot accept returns of opened items unless the product is defective or damaged on arrival.
        </p>
      </LegalSection>

      <LegalSection title="Intellectual Property">
        <p>
          All content on this website — including the Tom Yam Yadom and Smiling Tiger brand names, the tiger logo and artwork, scent names and descriptions, photography, copy, and design — is the property of Tom Yam Yadom and protected by applicable intellectual property laws.
        </p>
        <p>
          You may not reproduce, distribute, or use any of our content for commercial purposes without our prior written permission.
        </p>
      </LegalSection>

      <LegalSection title="Disclaimer of Warranties">
        <p>
          Our website and products are provided &ldquo;as is.&rdquo; We make no warranties regarding fitness of our products for a particular purpose beyond their described aromatic and lifestyle use.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of Liability">
        <p>
          To the fullest extent permitted by law, Tom Yam Yadom shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or products. Our total liability for any claim shall not exceed the amount you paid for the specific order in question.
        </p>
      </LegalSection>

      <LegalSection title="Governing Law">
        <p>These terms are governed by the laws of the United States.</p>
      </LegalSection>

      <LegalSection title="Changes to These Terms">
        <p>
          We may update these terms from time to time. The &ldquo;Last updated&rdquo; date at the top reflects the most recent version. Continued use of our website after changes are posted constitutes acceptance of the updated terms.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions? Email us at <LegalEmailLink />.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
