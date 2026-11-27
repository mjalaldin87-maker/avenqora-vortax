# Avenqora Vortax — 27 November 2026 Content and Technical Review

**Review date:** 27 November 2026  
**Branch:** `publish-2026-11-27-content-batch`  
**Scope:** Current publication archive, homepage, Student Hub inventory, sitemap, robots.txt and search implementation.

## Existing content inventory and overlap review

- Tech & SaaS archive: 20 articles before this batch. Existing coverage includes SaaS architecture, cloud cost, APIs and integrations, SLA, data portability, observability, renewal, residency, rate limiting, webhooks, user provisioning and accessibility.
- Cybersecurity archive: 20 articles before this batch. Existing coverage includes phishing, social engineering, Zero Trust, incident response, vulnerability management, MFA fatigue, BEC, logging, secure development, ransomware recovery, third-party risk, tabletop exercises, asset inventory, email authentication and OAuth consent phishing.
- B2B archive: 20 articles before this batch. Existing coverage includes CRM, automation, customer retention, procurement, KPIs, lead scoring, ABM, forecasting, customer journey, pricing, RFPs, payment terms, statements of work, sales handoff and channel partner onboarding.
- Student Hub: 48 lessons before this batch, with 12 lessons in each subject area.

The new subjects were selected to add a distinct operational task rather than repeat the previous batch: API lifecycle/deprecation policy; passkey deployment and recovery; and customer advisory board governance.

## New articles

| Page | Focus | Source basis |
|---|---|---|
| `articles/tech/tech-article-21.html` | SaaS API versioning, compatibility, migration and deprecation | Google AIP-180; Microsoft Azure Architecture Center API design and implementation guidance |
| `articles/cybersecurity/cyber-article-21.html` | Passkey deployment, recovery, privileged access and adoption | NIST SP 800-63B-4; Microsoft Entra deployment and passkey documentation |
| `articles/b2b/b2b-article-21.html` | Customer advisory board purpose, charter, recruitment and follow-up | Customer Advisory Board Association; Pragmatic Institute; OpenText programme charter |

## Technical changes

- Added three new articles, dated 27 November 2026.
- Updated each category archive from 20 to 21 articles and updated its CollectionPage ItemList structured data.
- Replaced homepage latest-guide cards with the three 27 November articles.
- Added all three canonical article URLs to the XML sitemap and updated homepage/archive last-modified dates.
- Existing article bodies and their original publication dates were not changed.
- Student Hub lessons were not changed in this batch.

## QA and editorial limitations

- New pages include one H1, unique title and meta description, canonical URL, index/follow directive, Article JSON-LD, publication date and visible Editorial Desk attribution.
- Examples are explanatory rather than customer case studies. No first-hand product testing, interviews, expert review or customer results are claimed.
- Sources are linked as further reading; their inclusion does not imply endorsement or review.
- This is a topic-level overlap review and targeted technical check, not a sentence-by-sentence audit of every legacy page or a complete external link validation of all 120 existing URLs.
- Search Console indexing, rankings, traffic and guest-post revenue cannot be inferred from repository changes. Live deployment and page-by-page production response checks remain separate from a successful GitHub merge.
