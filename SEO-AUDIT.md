# SEO / AEO Technical Audit — Avenqora Vortax

Audit date: 2026-10-04  
Branch: `seo-aeo-overhaul`

## Repository inventory

- Root HTML pages: 13 files including `404.html` and `search.html`
- Publication articles: 33 HTML files — 11 Tech, 11 Cybersecurity, 11 B2B
- Student Hub lessons: 12 HTML files — 3 each across Technology, Cybersecurity, Business, Digital Skills
- Total HTML files: 58
- CSS: `style.css`
- JavaScript: `script.js`, `search.js`
- Sitemap: `sitemap.xml`
- Robots: `robots.txt`
- Custom-domain file: `CNAME` (must remain untouched)
- Local images: 7 SVG placeholders under `images/`
- No JSON/data file currently feeds the article lists; category pages construct cards through JavaScript.
- Pre-change URL inventory: `url-inventory.txt`

## High priority

### 1. JavaScript-only article discovery on category pages
Confirmed on `tech-saas.html`, `cybersecurity.html`, and `b2b.html`: the raw HTML contains a loading state and an empty `data-category-results` container instead of crawlable article links.

Impact: search engines and answer engines receive a weaker internal-link graph without JavaScript execution.

Required fix: place all current article cards and links directly in HTML; retain JavaScript only as an optional enhancement.

### 2. Student Hub lesson list is not fully crawlable from the page
The Student Hub page needs its complete lesson-link structure represented in plain HTML rather than depending on client-side generation.

Required fix: static lesson cards/links for all 12 lessons.

### 3. Homepage article coverage is thin
The homepage currently exposes only a small featured set rather than a complete crawlable latest-article section.

Required fix: add a static Latest Articles section while preserving the existing featured design/content.

### 4. Missing social metadata on major pages
Confirmed:
- `student-hub.html`: no OG/Twitter metadata
- `about.html`: no OG/Twitter metadata
- `team.html`: no OG/Twitter metadata
- `contact.html`: no OG/Twitter metadata
- `editorial-policy.html`: no OG/Twitter metadata
- category pages have incomplete OG/Twitter metadata.

Required fix: complete OG/Twitter metadata with real existing images.

### 5. Weak / generic category descriptions
Confirmed:
- `tech-saas.html`: "Explore the complete Tech & SaaS collection."
- `cybersecurity.html`: "Explore the complete cybersecurity collection."
- `b2b.html`: "Explore the complete B2B Solutions collection."

Required fix: unique, useful 140–160 character descriptions.

### 6. Canonical inconsistency
Confirmed: `editorial-policy.html` still uses the old GitHub Pages canonical.

Required fix: use the exact custom-domain URL.

### 7. Article E-E-A-T/AEO structure is incomplete
Confirmed in sampled existing articles: no visible named-author byline and no visible Last updated field; several sampled articles lack FAQ/related-content blocks.

Required fix: add honest author placeholders/real team references only where supported, direct-answer opening, key takeaways, question-based headings where natural, visible FAQs, sources and related links.

### 8. Image dimensions/performance need systematic normalization
The repository uses images in article templates and external Unsplash URLs. Every image needs explicit width/height and appropriate lazy-loading behavior to reduce layout shift.

Required fix: normalize every `<img>` and report oversized local assets.

## Medium priority

### 9. Structured data is incomplete/unverified
Index/category/article pages contain JSON-LD in varying states, but it has not been standardized across the site.

Required fix:
- Homepage: Organization + WebSite
- Categories: CollectionPage + BreadcrumbList
- Articles: Article + BreadcrumbList
- About/Team: AboutPage/Person where appropriate
- FAQPage only when a visible FAQ exists.

### 10. Titles/meta descriptions need a complete uniqueness check
Some titles are descriptive, but a complete one-to-one uniqueness and length audit is required across all 58 HTML files.

### 11. Sitemap lacks `lastmod`
Current sitemap contains the current indexable URL set but does not include `lastmod` values.

Required fix: regenerate with accurate file modification dates available from repository history/known changes; never invent publication dates.

### 12. Search page
`search.html` must remain public but `noindex, follow`. It must not appear in the XML sitemap.

### 13. Internal-link graph
Articles need category breadcrumb, related articles, and previous/next navigation where logical. Category/home/Student Hub pages should expose crawlable links to their complete collections.

### 14. Trust and editorial pages
About/team/editorial pages should clearly state how content is created and corrected without inventing credentials, awards, testimonials or affiliations.

### 15. Newsletter
No newsletter signup block is currently present. Add a clearly marked replaceable static form placeholder suitable for a future provider.

## Low priority

### 16. Clean URLs
Existing `.html` URLs must not be renamed during this overhaul. A separate migration plan is required.

### 17. Favicon / touch icon / theme metadata
Verify and add missing site icons and theme-color metadata without changing the visual identity.

### 18. Accessibility and security hygiene
Verify skip link, nav ARIA behavior, heading order, image alt text, external-link `rel="noopener"`, and color contrast.

### 19. Contact email migration
The site currently uses Gmail addresses. Prepare branded addresses in code, but keep Gmail active until the mailboxes are verified.

## Safety constraints

- No existing URL will be deleted or renamed.
- `CNAME` will not be changed.
- Existing article meaning/content will be preserved.
- No invented facts, credentials, reviews, statistics or social profiles.
- No fake structured data.
- All changes remain compatible with GitHub Pages.
