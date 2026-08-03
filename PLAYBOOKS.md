# PLAYBOOKS

Operational checklists for this store. Written generically so they port to any e-commerce project that follows the Layer 1 rules in `.cursor/rules/project.mdc`. Swap entity names (product, article, ingredient) to match the next brand.

---

## Playbook: Add a new product

1. Add the entry to the products data file with all required fields: slug, name, price, tagline, colors/variants, ingredient references, related-content references, and any badges or flags the UI reads.
2. Add the product image: WebP, standard catalog dimensions and aspect ratio, descriptive alt text (via the image helper or page props).
3. Verify the product appears automatically in: shop page, related-products / explore rotation, sitemap, and `llms.txt` (all must derive from the data file; do not hand-edit those lists).
4. Verify Product JSON-LD on the product page includes the correct name, slug URL, and price.
5. Verify checkout resolves the new slug server-side (client sends only `{ slug, quantity }`; unknown slug must be rejected).
6. Add FAQ entries if the product warrants them (and keep FAQ copy free of medical claims if this brand forbids them).
7. Run the production build; confirm it passes; then commit.

---

## Playbook: Publish a new article

1. Create the MDX file with the complete frontmatter schema (copy from an existing published post; do not invent a partial schema).
2. Add a cover image: WebP, standard blog dimensions, alt text in frontmatter or the image component.
3. Add internal links: at least one commercial page link (product or shop), and at least one related article link (topic cluster).
4. If the content is step-based, include a HowTo frontmatter block (or equivalent) so HowTo JSON-LD can render.
5. Verify the article appears in: blog index, its category page, sitemap, and `llms.txt`.
6. Lint the copy against project Layer 2 rules (for this brand: no em/en dashes, no medical claims, US-only shipping if mentioned).
7. Run the production build; confirm it passes; then commit.

---

## Playbook: Add a new informational entity (ingredient / glossary term)

1. Add the entity to its data file with all fields the template expects (slug, title/name, categories, relations like `foundIn`, body fields, image).
2. Verify the entity page renders and emits the correct schema (`DefinedTerm` or the project’s equivalent).
3. Verify the entity index page and `llms.txt` include the new entry automatically.
4. Link from relevant product and article pages where it reads naturally (topic cluster), without stuffing.

---

## Playbook: Change a policy value (price, shipping, returns)

1. Change the value **only** in the policy or product data file (single source of truth).
2. Trace consumers: UI policy pages, checkout API, `llms.txt` / other generated files should reflect the change with no further hardcoding.
3. Update external listings that declare the same values (Google Merchant Center, marketplaces, ads).
4. Grep the old literal (and old cent amounts if prices moved) across the repo; remove any stale hardcoded copies.
5. Run the production build; smoke-test checkout shipping options and copy against the policy page; then commit.

---

## Playbook: Pre-launch / periodic health check

1. Crawl audit (Ahrefs Site Audit or similar): target **0** errors (broken links, missing titles/descriptions, 4xx/5xx).
2. Google Search Console: confirm coverage/indexing looks healthy; no manual actions.
3. Test checkout end-to-end in **live** mode with a real card, then refund the charge.
4. Verify OG images with a share preview tool (homepage, one product, one article); confirm the default OG path resolves (no 404).
5. PageSpeed / Core Web Vitals on: homepage, one product page, one article. Note LCP image priority and any layout-shift regressions.
6. Spot-check robots.txt (transactional paths disallowed), sitemap (no cart/order-confirmed), and `/llms.txt` (`text/plain`, derived from live data).
