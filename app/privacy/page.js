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
      lastUpdated="August 2026"
    >
      <p className="text-tiger-cream">
        Your privacy matters to us. This page explains what information we collect when you visit tomyamyadomherbals.com, why we collect it, and what we do with it. We collect only what we need to run our store and communicate with you.
      </p>

      <LegalSection title="What We Collect">
        <LegalSubheading>When you place an order</LegalSubheading>
        <p>
          Our checkout is powered by Stripe. When you purchase, Stripe collects your name, shipping address, email address, and payment details. We never see or store your full card number: Stripe handles all payment security. We retain your name, shipping address, and order details to fulfill and confirm your order.
        </p>

        <LegalSubheading>When you contact us or sign up for email</LegalSubheading>
        <p>
          Our contact and wholesale inquiry form collects your name and email address. You can also join our email list through the newsletter signup on the site, or through an exit-intent popup that offers a 10% first-order discount code in exchange for your email. Depending on the form, we may collect your name, your email address, or both.
        </p>
        <p>
          Subscriber details (name and email when provided) are stored in Google Sheets, which we use as our email list database. We use Resend to send newsletters, welcome messages, and order-related emails.
        </p>

        <LegalSubheading>Abandoned cart emails</LegalSubheading>
        <p>
          We have built an abandoned cart email feature that may remind you about items left in your cart if you provided an email address during checkout or signup. This feature is not active yet. When we turn it on, those messages will use the same email tools described on this page, and every message will include an unsubscribe link.
        </p>

        <LegalSubheading>Automatically collected data</LegalSubheading>
        <p>
          If you accept cookies through our cookie consent banner, we use Microsoft Clarity and Smartlook for heatmaps and session recordings so we can understand how visitors use the site. These tools may collect your IP address, browser type, pages visited, referring URLs, and how you interact with the page. This data is used to improve our website. We do not sell this data. If you reject cookies, Clarity and Smartlook are not loaded.
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          When you first visit, we show a cookie consent banner. Analytics tools only run after you choose Accept. If you choose Reject, we do not load Microsoft Clarity or Smartlook.
        </p>
        <p>Our site uses cookies for two purposes:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong className="text-tiger-cream">Analytics cookies (Microsoft Clarity and Smartlook):</strong>{" "}
            Track visit patterns, heatmaps, and session behavior so we can improve the site. These run only after you accept cookies.
          </li>
          <li>
            <strong className="text-tiger-cream">Functional cookies (Stripe):</strong>{" "}
            Required for checkout to work. These cannot be disabled if you wish to make a purchase.
          </li>
        </ul>
        <p>
          You can also disable or delete cookies in your browser settings. Disabling functional cookies may prevent checkout from working correctly.
        </p>
      </LegalSection>

      <LegalSection title="How We Use Your Information">
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>To process and fulfill your orders</li>
          <li>To send order confirmations and shipping updates</li>
          <li>To respond to your messages or wholesale inquiries</li>
          <li>To send newsletters, welcome offers, and product updates (only if you opted in)</li>
          <li>To send abandoned cart reminders once that feature is active (only if we have your email)</li>
          <li>To improve our website using analytics and session insights after cookie consent</li>
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
            <strong className="text-tiger-cream">Stripe:</strong> payment processing. PCI-DSS compliant. See stripe.com/privacy.
          </li>
          <li>
            <strong className="text-tiger-cream">Google Sheets:</strong> storage for our email subscriber list (name and email when provided).
          </li>
          <li>
            <strong className="text-tiger-cream">Microsoft Clarity:</strong> website analytics, heatmaps, and session insights, only after cookie consent. See clarity.microsoft.com.
          </li>
          <li>
            <strong className="text-tiger-cream">Smartlook:</strong> website analytics and session recording, only after cookie consent. See smartlook.com/privacy.
          </li>
          <li>
            <strong className="text-tiger-cream">Resend:</strong> newsletter, welcome, abandoned cart (when active), and transactional email.
          </li>
          <li>
            <strong className="text-tiger-cream">Shipping carriers:</strong> your name and address are shared with our carrier to deliver your order.
          </li>
        </ul>
        <p>We may also disclose information if required by law.</p>
      </LegalSection>

      <LegalSection title="Unsubscribing">
        <p>
          Every marketing email we send includes an unsubscribe link. That link uses a secure, HMAC-verified token tied to your email address so only a valid link can update your subscription status. When you unsubscribe, we mark your address as unsubscribed in our Google Sheets subscriber list and stop sending marketing emails. This process is designed to meet CAN-SPAM requirements. You can also email us at <LegalEmailLink /> and we will remove you.
        </p>
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
          We retain order records for as long as required by applicable tax and accounting laws (typically 7 years). Newsletter subscriber data is retained in Google Sheets until you unsubscribe. Contact form data is retained only as long as necessary to respond to your inquiry. Analytics and session recording data is retained according to each provider&rsquo;s settings and only collected after cookie consent.
        </p>
      </LegalSection>

      <LegalSection title="Security">
        <p>
          Payment data is handled entirely by Stripe and never stored on our servers. Unsubscribe links are protected with HMAC verification so they cannot be forged. We use industry-standard practices to protect the information we do hold.
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
