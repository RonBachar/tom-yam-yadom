import WholesaleForm from "./WholesaleForm";
import { DEFAULT_OG_IMAGE } from "../data/siteMeta";

const BASE_URL = "https://www.tomyamyadomherbals.com";

export const metadata = {
  title: "Wholesale Inquiries | Tom Yam Yadom | Smiling Tiger",
  description:
    "Interested in carrying Tom Yam Yadom Thai herbal inhalers in your store, spa, or gym? Submit a wholesale inquiry and we will be in touch with details.",
  keywords: [
    "wholesale Thai herbal inhaler",
    "carry Tom Yam Yadom",
    "become a retailer",
    "wholesale yadom",
    "Thai herbal inhaler distributor",
    "wholesale smiling tiger",
  ],
  alternates: { canonical: `${BASE_URL}/wholesale` },
  openGraph: {
    title: "Wholesale Inquiries | Tom Yam Yadom",
    description:
      "Interested in carrying Tom Yam Yadom Thai herbal inhalers in your store, spa, or gym? Submit a wholesale inquiry and we will be in touch with details.",
    url: `${BASE_URL}/wholesale`,
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

export default function WholesalePage() {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 max-w-2xl">
          <span className="inline-block text-tiger-orange text-xs font-heading font-bold tracking-[0.2em] uppercase mb-5">
            For Retailers &amp; Partners
          </span>
          <h1
            className="font-heading font-bold text-tiger-cream uppercase leading-none mb-5"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", letterSpacing: "-0.01em" }}
          >
            Interested in carrying Tom Yam Yadom?
          </h1>
          <p className="text-tiger-muted font-sans text-lg leading-relaxed">
            We work with select retailers, spas, gyms, and festival vendors.
            Fill out the form below and we will be in touch with details.
          </p>
        </div>

        <div className="max-w-2xl">
          <WholesaleForm />
          <div className="mt-10 pt-8 border-t border-tiger-border">
            <p className="text-tiger-muted text-sm font-sans">
              Questions?{" "}
              <a
                href="mailto:info@tomyamyadomherbals.com"
                className="text-tiger-gold hover:text-tiger-gold-light transition-colors duration-200 cursor-pointer"
              >
                info@tomyamyadomherbals.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
