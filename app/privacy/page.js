import {
  LegalPageLayout,
  LegalSection,
  LegalSubheading,
  LegalEmailLink,
} from "../components/legal/LegalPageLayout";
import { DEFAULT_OG_IMAGE } from "../data/siteMeta";

const BASE_URL = "https://www.tomyamyadomherbals.com";

export const metadata = {
  title: "Privacy Policy | Tom Yam Yadom",
  description:
    "How Tom Yam Yadom collects, uses, and protects your data when you shop, subscribe, or contact us. Stripe, analytics, and your privacy rights.",
  alternates: { canonical: `${BASE_URL}/privacy` },
  openGraph: {
    title: "Privacy Policy | Tom Yam Yadom",
    description:
      "How Tom Yam Yadom collects, uses, and protects your data when you shop, subscribe, or contact us.",
    url: `${BASE_URL}/privacy`,
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

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Privacy Policy"
      lastUpdated="June 2026"
    >
      <p className="text-tiger-cream">
        Your privacy matters to us. This page explains what information we collect when you visit tomyamyadomherbals.com, why we collect it, and what we do with it. We collect only what we need to run our store and communicate with you.
      </p>

      <LegalSection title="What We Collect">
        <LegalSubheading>When you place an order</LegalSubheading>
        <p>
          Our checkout is powered by Stripe. When you purchase, Stripe collects your name, shipping address, email address, and payment details. We never see or store your full card number — Stripe handles all payment security. We retain your name, shipping address, and order details to fulfill and confirm your order.
        </p>

        <LegalSubheading>When you contact us or sign up for email</LegalSubheading>
        <p>
          Our contact and wholesale inquiry form collects your name and email address. Our newsletter signup collects your email address. We use an email service provider to send newsletters and order-related messages. You can unsubscribe at any time using the link in any email.
        </p>

        <LegalSubheading>Automatically collected data</LegalSubheading>
        <p>
          We use Google Analytics to understand how visitors use our site. Google Analytics may collect your IP address, browser type, pages visited, and referring URLs. This data is aggregated and used to improve our website. We do not sell this data.
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>Our site uses cookies for two purposes:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong className="text-tiger-cream">Analytics cookies (Google Analytics):</strong>{" "}
            Track visit patterns so we can improve the site.
          </li>
          <li>
            <strong className="text-tiger-cream">Functional cookies (Stripe):</strong>{" "}
            Required for checkout to work. These cannot be disabled if you wish to make a purchase.
          </li>
        </ul>
        <p>
          You can disable or delete cookies in your browser settings. Disabling functional cookies may prevent checkout from working correctly.
        </p>
      </LegalSection>

      <LegalSection title="How We Use Your Information">
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>To process and fulfill your orders</li>
          <li>To send order confirmations and shipping updates</li>
          <li>To respond to your messages or wholesale inquiries</li>
          <li>To send newsletters and product updates (only if you opted in)</li>
          <li>To improve our website using anonymized analytics</li>
          <li>To comply with legal obligations</li>
        </ul>
        <p>
          We do not sell, rent, or trade your personal information with third parties for their marketing purposes.
        </p>
      </LegalSection>

      <LegalSection title="Who We Share Data With">
        <p>We share your data only with services that help us run our store:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong className="text-tiger-cream">Stripe</strong> — payment processing. PCI-DSS compliant. See stripe.com/privacy.
          </li>
          <li>
            <strong className="text-tiger-cream">Google Analytics</strong> — website analytics. See policies.google.com/privacy.
          </li>
          <li>
            <strong className="text-tiger-cream">Email provider (Mailchimp or similar)</strong> — newsletter and transactional email.
          </li>
          <li>
            <strong className="text-tiger-cream">Shipping carriers</strong> — your name and address are shared with our carrier to deliver your order.
          </li>
        </ul>
        <p>We may also disclose information if required by law.</p>
      </LegalSection>

      <LegalSection title="Your Rights">
        <p>
          Depending on where you live, you may have the right to request a copy of your data, correct inaccurate data, request deletion of your data, and opt out of marketing emails at any time.
        </p>
        <p>
          <strong className="text-tiger-cream">California residents (CCPA):</strong> You have the right to know what personal information we collect and to request deletion. We do not sell personal information.
        </p>
        <p>
          <strong className="text-tiger-cream">EU/EEA residents (GDPR):</strong> You have the right to access, rectify, erase, and port your data, and to object to or restrict processing.
        </p>
        <p>
          To exercise any of these rights, email us at <LegalEmailLink />. We will respond within 30 days.
        </p>
      </LegalSection>

      <LegalSection title="Data Retention">
        <p>
          We retain order records for as long as required by applicable tax and accounting laws (typically 7 years). Newsletter subscriber data is retained until you unsubscribe. Contact form data is retained only as long as necessary to respond to your inquiry.
        </p>
      </LegalSection>

      <LegalSection title="Security">
        <p>
          Payment data is handled entirely by Stripe and never stored on our servers. We use industry-standard practices to protect the information we do hold.
        </p>
      </LegalSection>

      <LegalSection title="Changes to This Policy">
        <p>
          We may update this policy from time to time. The &ldquo;Last updated&rdquo; date at the top will reflect any changes.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about this policy? Email us at <LegalEmailLink />.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
