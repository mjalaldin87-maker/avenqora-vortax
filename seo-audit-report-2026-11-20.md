# Avenqora Vortax — Site Audit and Analysis

**Audit date:** 20 November 2026  
**Repository:** `mjalaldin87-maker/avenqora-vortax`  
**Baseline:** `main` branch immediately before today's publishing batch

## Executive summary

Before today's update, the repository contained **87 content pages**: 17 articles in each of the three publication categories and nine lessons in each of the four Student Hub subjects. The sitemap contained 98 unique URLs. Each publication archive showed 17 article cards and an ItemList schema count of 17.

A real structural issue was found in the Student Hub. The three 18 November Lesson 8 cards—Computer Hardware, Public Wi-Fi Safety and Break-Even Analysis—were displayed inside Digital Skills instead of Technology, Cybersecurity and Business. The visible subject distribution was therefore 8/8/8/12. Today's changes move those cards to their correct subjects, add a Lesson 10 in each subject and rebuild the CollectionPage ItemList from the corrected visible sections.

Today's batch adds three publication articles and four Student Hub lessons. The new content inventory is **94 pages**: 18 Tech & SaaS articles, 18 Cybersecurity articles, 18 B2B articles and 10 lessons in each Student Hub subject. Sitemap count after adding seven URLs: **105 unique URLs**.

## Repository and navigation audit

| Area | Before today | After today's source changes |
|---|---:|---:|
| Tech & SaaS archive | 17 cards; schema count 17 | 18 cards; schema count 18 |
| Cybersecurity archive | 17 cards; schema count 17 | 18 cards; schema count 18 |
| B2B Solutions archive | 17 cards; schema count 17 | 18 cards; schema count 18 |
| Student Hub | 36 links; three Lesson 8 cards misplaced | 40 links; 10 in each subject |
| XML sitemap | 98 unique URLs | 105 unique URLs |
| Content pages | 87 | 94 |

The homepage featured-guide section now points to the three 20 November publication articles and displays the corrected Student Hub total.

## Student Hub category issue fixed

Before the change:
- Technology displayed Lessons 1–7 and 9; Lesson 8 (Computer Hardware) was inside Digital Skills.
- Cybersecurity displayed Lessons 1–7 and 9; Lesson 8 (Public Wi-Fi Safety) was inside Digital Skills.
- Business displayed Lessons 1–7 and 9; Lesson 8 (Break-Even Analysis) was inside Digital Skills.
- Digital Skills displayed its own Lessons 1–9 plus those three misplaced cards.

After the change:
- Technology: Lessons 1–10.
- Cybersecurity: Lessons 1–10.
- Business: Lessons 1–10.
- Digital Skills: Lessons 1–10.
- CollectionPage ItemList contains 40 entries in the same order as the corrected page sections.

No older lesson page body or publication date was changed as part of this correction.

## Topic overlap and content strategy

The existing SEO content map, publication archives and closest adjacent topics were reviewed before selecting the seven new intents. Today's pages answer different reader tasks:
1. Webhook security covers authenticated event callbacks and duplicate-safe processing, narrower than API design, API integration and API rate limiting.
2. Cyber asset inventory records devices, software, cloud services, data and supplier systems; it precedes vulnerability remediation rather than duplicating vulnerability management or supplier due diligence.
3. The B2B statement of work defines execution scope, deliverables, responsibilities, acceptance and change control after commercial selection. It differs from RFP response, procurement, project delivery and invoice payment terms.
4. Command-line basics teach safe shell navigation and file operations, not programming syntax or Git version control.
5. Cyberbullying support is a student safety response workflow, distinct from phishing, malware, voice-cloning scams and general privacy.
6. Complaint handling covers the operational process to listen, record, investigate, resolve and learn. It is narrower than marketing, lead generation and broad B2B retention.
7. Digital portfolios curate evidence of student skills and reflection, rather than repeating presentation, file-management or citation lessons.

The broad API Integration query cluster remains assigned to Tech Article 11. The Search Console view supplied on 17 November showed 340 impressions and zero clicks for “api integration” in the selected period. Today's webhook article does not target that broad phrase.

## Original utility included in today's pages

- Webhook guide: provider-specific signature verification, safe duplicate handling, a publisher-versus-receiver control table, an order-paid event example and a release test checklist.
- Asset inventory guide: cross-category inventory examples, suggested fields, a small-agency scenario and a priority model explicitly labelled as an editorial working aid—not an official NIST score.
- SOW guide: scope/exclusion examples, deliverable and acceptance checks, customer dependencies, change-request fields and a fictional CRM implementation.
- Command-line lesson: PowerShell versus Linux/macOS command examples and a safe folder/file practice task.
- Cyberbullying lesson: safe evidence handling, non-retaliation, platform reporting, trusted-adult escalation and a report-note template. It warns against downloading or circulating intimate images of minors.
- Complaint-handling lesson: a six-step response process, complaint-log fields and a small-shop delivery example; legal requirements are kept jurisdiction-specific.
- Digital portfolio lesson: project-entry prompts, sample selection guidance, privacy and permission checks, accessibility considerations and a review routine.

## New-page technical QA

All seven new page sources were checked after creation:
- Exactly one H1 per page; primary topic phrase is present in H1 and opening copy.
- Page-specific title, meta description, canonical URL and `index, follow`.
- Valid JSON-LD: Article for three publication pages and LearningResource for four Student Hub lessons.
- Publication/creation date and dateModified: 20 November 2026.
- Descriptive image alt text; image files remain externally hosted.
- Contextual internal links and authoritative reference links.
- Every question-based H2/H3 has an immediate direct answer of 40–50 words.
- Relative internal .html links were checked against the site's URL inventory. Root homepage and intentionally noindexed search-page links are expected exceptions.

## Date and sitemap integrity

- Only the seven new pages use 20 November 2026 as their publication/creation date.
- Existing article and lesson dates remain unchanged.
- Homepage, three article archives and Student Hub listing receive 20 November sitemap lastmod because their content or listings changed.
- Existing content-page lastmod dates were preserved.

## Remaining verification

This is a repository/source audit, not proof of rankings or complete production SEO health. These checks still require external data or live testing:
- Google Search Console URL Inspection and query-to-landing-page performance for the seven new URLs.
- Mobile rendering and Core Web Vitals/PageSpeed measurements.
- A full crawler of the deployed site for redirects, 404s, orphan pages and external-link failures.
- Competitor referring-domain gaps through a named backlink index such as Ahrefs or Semrush.
- GitHub Pages production deployment and live HTML confirmation after merging this branch.

No exact keyword-volume figures, keyword-difficulty scores, backlink counts, ranking forecasts or verified live Google People Also Ask placements are claimed.
