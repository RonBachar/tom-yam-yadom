/**
 * Custom HTML element overrides passed to compileMDX.
 * These run inside a Server Component so they must be plain JSX (no hooks).
 */

export const mdxComponents = {
  h1: ({ children }) => (
    <h1 className="font-heading font-bold text-tiger-cream leading-tight mt-12 mb-4" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-heading font-bold text-tiger-cream leading-snug mt-10 mb-3" style={{ fontSize: "clamp(1.3rem, 3vw, 1.9rem)" }}>
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-heading font-semibold text-tiger-cream leading-snug mt-8 mb-2" style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)" }}>
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-tiger-muted font-sans leading-relaxed mb-5">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-outside pl-5 mb-5 space-y-1.5 text-tiger-muted font-sans leading-relaxed">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside pl-5 mb-5 space-y-1.5 text-tiger-muted font-sans leading-relaxed">
      {children}
    </ol>
  ),
  li: ({ children }) => <li>{children}</li>,
  blockquote: ({ children }) => (
    <blockquote
      className="border-l-2 border-tiger-gold pl-5 my-6 italic text-tiger-cream/70 font-sans"
    >
      {children}
    </blockquote>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-tiger-cream">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-tiger-cream/80">{children}</em>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-tiger-gold underline underline-offset-2 hover:text-tiger-gold-light transition-colors duration-200"
      {...(href?.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  ),
  hr: () => (
    <hr className="border-0 border-t border-tiger-border my-10" />
  ),
  code: ({ children }) => (
    <code className="bg-tiger-surface text-tiger-gold text-sm px-1.5 py-0.5 rounded font-mono">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="bg-tiger-surface border border-tiger-border rounded-xl p-5 overflow-x-auto mb-5 text-sm font-mono text-tiger-cream">
      {children}
    </pre>
  ),
};
