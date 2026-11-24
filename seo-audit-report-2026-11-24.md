# Avenqora Vortax — Site Audit and Analysis

**Audit date:** 24 November 2026  
**Repository:** `mjalaldin87-maker/avenqora-vortax`  
**Branch audited before this batch:** `main` at `ff76d7f81d92a5fb7f4b43a6be14c6458fd7fbf0`

## Executive summary

The pre-batch repository contained **94 content pages** and **105 unique sitemap URLs**. Publication archives had 18 cards each; the Student Hub had 40 lessons, with ten lessons per subject. Today's batch adds three publication articles and four student lessons, producing 101 content pages and 112 sitemap URLs in the proposed branch.

A source-level review found that `robots.txt` allows all user agents and declares the sitemap. No site-wide robots.txt crawl block is present. The new pages each use `index, follow`, a self-referencing canonical, a page-specific title and description, one H1, descriptive image alt text and Article or LearningResource JSON-LD.

## Baseline and planned post-change counts

| Area | Before 24 November | After 24 November source update |
|---|---:|---:|
| Tech & SaaS archive | 18 articles | 19 articles |
| Cybersecurity archive | 18 articles | 19 articles |
| B2B Solutions archive | 18 articles | 19 articles |
| Student Hub — Technology | 10 lessons | 11 lessons |
| Student Hub — Cybersecurity | 10 lessons | 11 lessons |
| Student Hub — Business | 10 lessons | 11 lessons |
| Student Hub — Digital Skills | 10 lessons | 11 lessons |
| Student Hub total | 40 lessons | 44 lessons |
| Total content pages | 94 | 101 |
| Sitemap URLs | 105 | 112 |

Only the seven new pages receive a 24 November 2026 publication/creation date. The homepage, three publication archives, Student Hub listing and sitemap are updated to reflect changed listings. Earlier article and lesson publication dates are preserved.

## Robots, sitemap and page directives

The repository's `robots.txt` contains:

```text
User-agent: *
Allow: /

Sitemap: https://avenqoravortax.com/sitemap.xml
```

This does not disallow crawling of the site's HTML content. The sitemap before this batch contained 105 unique URLs, including all 94 content pages and 11 site/support URLs. The updated sitemap adds the seven new page URLs and preserves previous last-modified dates for untouched pages.

The new article and lesson sources declare `<meta name="robots" content="index, follow">` and a canonical URL that points to the same page. These are source-level checks; they do not prove that Google's selected canonical matches or that the deployed HTML is identical.

## Search Console: five URLs shown as not indexed

The site owner reported that Google Search Console currently shows **five non-indexed URLs**. The live Page Indexing report and URL Inspection details were not available in the repository connection during this source audit, so the five URLs and their exact reason labels could not be confirmed. Do not assume that all five need the same fix.

The global robots and sitemap setup does not show an obvious site-wide crawl block. Each URL still needs a specific inspection:

1. Copy the exact URL and the Page Indexing reason shown in Search Console.
2. Open URL Inspection and check **Crawl allowed?**, **Page fetch**, **Indexing allowed?**, **User-declared canonical** and **Google-selected canonical**.
3. Run **Test Live URL** to check what Google can fetch now.
4. Compare the tested HTML with the deployed page: title, main text, internal links, canonical and robots directive.
5. If the page is valid and index-worthy, correct the specific issue and request indexing. If the URL is a duplicate, parameter version, redirect or intentionally excluded page, do not force it into the index.

Common labels need different responses:
- **Crawled — currently not indexed:** Google fetched the page but has not included it. Review usefulness, originality, duplication and internal discovery; a technical noindex fix may not apply.
- **Discovered — currently not indexed:** Google knows the URL but has not crawled it. Review internal links, sitemap discovery, crawl access and page priority.
- **Duplicate / Google chose a different canonical:** compare the Google-selected canonical with the intended URL before editing.
- **Excluded by noindex:** check whether the directive is intentional and whether it is present in HTML or an HTTP header.
- **Not found (404), redirect or server error:** check the exact response and fix the target or URL path; do not create blind redirects.

To complete the five-URL diagnosis, the owner must share the Page Indexing report screenshot showing the reason labels and affected URLs, or paste the five URLs plus their reason text. A Search Console performance connector can provide query/page performance, but URL Inspection's crawl and canonical details are still needed for diagnosis.

## Content overlap and target ownership

The latest batch was compared with the current keyword map:
- SaaS user provisioning/deprovisioning is about an individual's app-access lifecycle, separate from software inventory and SaaS architecture.
- SPF, DKIM and DMARC setup is sender-domain authentication, distinct from phishing awareness and business email compromise.
- Sales-to-delivery handoff is the transfer of customer context and delivery readiness after a deal closes, distinct from CRM, project management and the SOW itself.
- DNS basics explain name resolution and common records, not general networking or shell navigation.
- QR-code phishing is a specific mechanism for hiding malicious destinations, separate from voice-cloning scams and broad safe-browsing guidance.
- Cash-flow forecasting focuses on timing of receipts and payments, not profit calculation or break-even units.
- Digital note-taking covers capture and review workflow, not PDF annotation, source citation or portfolio curation.

The broad API-integration query cluster remains assigned to Tech Article 11. No new page in this batch targets that cluster.

## Remaining verification and constraints

This is a repository/source audit, not a full deployed crawler test or Google indexing guarantee. The following checks still require access to live systems:
- Google Search Console URL Inspection details for the five reported URLs.
- Search Console query-to-landing-page performance for the new pages.
- Live production HTML and HTTP status checks after deployment.
- Mobile rendering and Core Web Vitals/PageSpeed data.
- A full deployed crawler pass for redirect chains, orphan pages and external-reference status.

The live domain could not be independently fetched through the current verification path during this audit, so GitHub source changes must not be described as confirmed live until production URLs return the expected updated HTML.
