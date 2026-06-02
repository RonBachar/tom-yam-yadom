import WholesaleForm from "./WholesaleForm";

export const metadata = {
  title: "Wholesale — Tom Yam Yadom",
  description:
    "Wholesale program for gyms, smoke shops, wellness retailers, and lifestyle stores. Four-tier pricing with low minimums.",
};

const TIERS = [
  {
    name: "Starter",
    min: "12 units",
    discount: "20% off MSRP",
    best: "Pop-ups, boutiques, smoke shops",
    accentColor: "#8A7A60",
    featured: false,
  },
  {
    name: "Retailer",
    min: "36 units",
    discount: "30% off MSRP",
    best: "Wellness stores, lifestyle retail",
    accentColor: "#C9940A",
    featured: false,
  },
  {
    name: "Partner",
    min: "72 units",
    discount: "38% off MSRP",
    best: "Gyms, larger wellness retailers",
    accentColor: "#D4681A",
    featured: true,
  },
  {
    name: "Distributor",
    min: "150+ units",
    discount: "45% off MSRP",
    best: "Regional distributors, chains",
    accentColor: "#C9940A",
    featured: false,
  },
];

export default function WholesalePage() {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <span className="inline-block text-tiger-orange text-xs font-heading font-bold tracking-[0.2em] uppercase mb-5">
            For Retailers &amp; Partners
          </span>
          <h1
            className="font-heading font-bold text-tiger-cream uppercase leading-none mb-5"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", letterSpacing: "-0.01em" }}
          >
            Wholesale Program
          </h1>
          <p className="text-tiger-muted font-sans text-lg leading-relaxed">
            A product your customers will come back for. Four tiers, low
            minimums, high margin. Gyms, smoke shops, wellness retailers, and
            lifestyle stores.
          </p>
        </div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className="rounded-2xl p-6 border transition-all duration-200"
              style={{
                borderColor: tier.featured
                  ? tier.accentColor
                  : "rgba(58,42,24,0.8)",
                backgroundColor: tier.featured
                  ? "rgba(212,104,26,0.08)"
                  : "rgba(28,22,16,0.9)",
                boxShadow: tier.featured
                  ? `0 0 30px 2px ${tier.accentColor}20`
                  : undefined,
              }}
            >
              {tier.featured && (
                <span
                  className="inline-block text-xs font-heading font-bold tracking-[0.12em] uppercase px-3 py-1 rounded-full mb-3"
                  style={{
                    backgroundColor: `${tier.accentColor}25`,
                    color: tier.accentColor,
                  }}
                >
                  Most Popular
                </span>
              )}
              <h2 className="font-heading font-bold text-tiger-cream text-2xl uppercase tracking-wide mb-3">
                {tier.name}
              </h2>
              <p
                className="font-heading font-bold text-3xl mb-1"
                style={{ color: tier.accentColor }}
              >
                {tier.discount}
              </p>
              <p className="text-tiger-muted text-xs font-sans mb-4">
                Minimum order: {tier.min}
              </p>
              <p className="text-tiger-muted text-xs font-sans">
                Best for: {tier.best}
              </p>
            </div>
          ))}
        </div>

        {/* Application form */}
        <div className="max-w-2xl">
          <h2 className="font-heading font-bold text-tiger-cream text-3xl uppercase tracking-wide mb-8">
            Apply for Wholesale
          </h2>
          <WholesaleForm />
          <div className="mt-10 pt-8 border-t border-tiger-border">
            <p className="text-tiger-muted text-sm font-sans">
              Questions?{" "}
              <a
                href="mailto:wholesale@tomyamyadom.com"
                className="text-tiger-gold hover:text-tiger-gold-light transition-colors duration-200 cursor-pointer"
              >
                wholesale@tomyamyadom.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
