import Link from "next/link";

export function LegalPageLayout({ eyebrow, title, lastUpdated, children }) {
  return (
    <div className="w-full min-w-0 pt-32 pb-24 px-6">
      <div className="w-full min-w-0 max-w-3xl mx-auto">
        <header className="mb-12 border-b border-tiger-border pb-10">
          <p className="text-tiger-gold text-xs font-heading font-bold tracking-[0.2em] uppercase mb-3">
            {eyebrow}
          </p>
          <h1
            className="font-heading font-bold text-tiger-cream uppercase leading-tight mb-4"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 3.5rem)", letterSpacing: "-0.01em" }}
          >
            {title}
          </h1>
          <p className="text-tiger-cream font-sans text-sm font-medium">
            Tom Yam Yadom (Smiling Tiger)
          </p>
          <p className="text-tiger-muted font-sans text-sm mt-2">
            Last updated: {lastUpdated}
          </p>
        </header>

        <div className="space-y-10 text-tiger-muted font-sans text-base leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

export function LegalSection({ title, children }) {
  return (
    <section className="min-w-0">
      {title ? (
        <h2 className="font-heading font-bold text-tiger-cream text-2xl uppercase tracking-wide mb-4">
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  );
}

export function LegalSubheading({ children }) {
  return (
    <h3 className="font-heading font-semibold text-tiger-cream text-lg uppercase tracking-wide mb-3 mt-6">
      {children}
    </h3>
  );
}

export function LegalList({ items }) {
  return (
    <ul className="list-disc pl-6 space-y-2 my-4">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function LegalEmailLink() {
  return (
    <a
      href="mailto:info@tomyamyadomherbals.com"
      className="text-tiger-gold hover:text-tiger-gold-light transition-colors duration-200 cursor-pointer"
    >
      info@tomyamyadomherbals.com
    </a>
  );
}

export function Placeholder({ children }) {
  return (
    <span className="inline max-w-full break-words bg-tiger-gold/15 text-tiger-gold border border-tiger-gold/30 px-1.5 py-0.5 rounded font-sans text-sm [overflow-wrap:anywhere]">
      {children}
    </span>
  );
}

export function ShippingReturnsLink() {
  return (
    <Link
      href="/shipping"
      className="text-tiger-gold hover:text-tiger-gold-light transition-colors duration-200 cursor-pointer"
    >
      Shipping &amp; Returns
    </Link>
  );
}
