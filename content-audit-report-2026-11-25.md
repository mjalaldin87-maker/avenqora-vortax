# Avenqora Vortax — Content Gap Review and 25 November Publishing Batch

**Review date:** 25 November 2026  
**Branch:** `publish-2026-11-25-content-batch`  
**Purpose:** Identify useful topic gaps, avoid close duplication, and prepare a coherent publication batch.

## Review scope and method

- Reviewed the existing publication archive titles and collection metadata for 57 articles across Tech & SaaS, Cybersecurity and B2B Solutions.
- Reviewed the Student Hub collection listing for 44 lessons across Technology, Cybersecurity, Business and Digital Skills.
- Compared the proposed subjects with adjacent existing resources, including SaaS access lifecycle management, phishing and email security, procurement/vendor management, B2B sales-to-delivery handoff, beginner DNS/network lessons, account security, business operations, PDF use and note-taking.
- Selected narrower topics with a distinct reader task or audience rather than creating another broad introductory guide.
- Checked each article's factual framework against the linked standards, official platform documentation or government guidance. Sources are listed on the relevant page.

This was a title/topic and targeted-adjacency review, not a sentence-by-sentence audit of every legacy page or a claim that all existing sources have been revalidated.

## New publication articles

| Page | New angle | Why it is distinct from existing coverage |
|---|---|---|
| `articles/tech/tech-article-20.html` | SaaS product accessibility and WCAG 2.2 release checks | Existing technology pages cover SaaS architecture, APIs, onboarding and account lifecycle; this page focuses on accessibility of product journeys and release testing. |
| `articles/cybersecurity/cyber-article-20.html` | OAuth consent phishing and malicious app grants | Existing pages cover general phishing, BEC, identity and logging; this page explains the separate authorization/permission-grant path and its response. |
| `articles/b2b/b2b-article-20.html` | Channel partner onboarding and enablement | Existing B2B pages cover supplier/vendor management and the sales-to-customer-delivery handoff; this page addresses external reseller/referral/channel relationships and partner activation. |

## New Student Hub lessons

| Page | Lesson focus | Separation from existing lesson sequence |
|---|---|---|
| `student-hub/technology/technology-lesson-12.html` | Software testing fundamentals and test levels | Adds quality assurance concepts after the existing programming, web, Git and DNS foundations. |
| `student-hub/cybersecurity/cybersecurity-lesson-12.html` | Reviewing OAuth app permission prompts | A student-facing safety lesson distinct from passwords, MFA, malware, privacy and QR-code phishing. |
| `student-hub/business/business-lesson-12.html` | Weighted supplier evaluation scorecards | A beginner exercise focused on comparing offers and recording evidence; it complements, rather than replaces, the broader vendor-management article. |
| `student-hub/digital-skills/digital-skills-lesson-12.html` | Accessible digital study documents | Focuses on document structure, alternative text, tables and accessibility checks; it is separate from note-taking, PDF annotation and citation lessons. |

## Source basis

- **Accessibility:** W3C WCAG 2.2 and W3C Web Accessibility Initiative tutorials; Microsoft documentation for the Office Accessibility Checker.
- **OAuth consent phishing:** FBI IC3 public service announcement dated 1 September 2026; Microsoft Learn guidance on consent phishing and app-consent investigation.
- **Channel partner enablement:** Salesforce Trailhead onboarding and channel-management material; Microsoft Partner Center overview and account guidance.
- **Software testing:** ISTQB Certified Tester Foundation Level syllabus v4.0.1 and official CTFL overview.
- **Supplier evaluation:** UK Government guidance on evaluating and scoring proposals, including consistent criteria and documented award decisions.

## Publishing and technical changes

- Added three publication articles and four Student Hub lessons, all dated 25 November 2026.
- Added contextual internal links between the new pages and relevant existing resources.
- Updated each publication archive from 19 to 20 articles.
- Updated Student Hub collection metadata from 44 to 48 lessons and added one new card under each of the four subject areas.
- Updated the homepage's latest-guides section.
- Added all seven pages to the XML sitemap.
- The site search loads URLs from the sitemap dynamically; no separate hard-coded content index was required.
- New pages use canonical URLs, index/follow directives, unique descriptions, one primary H1, publication-level attribution and Article/LearningResource structured data as appropriate.

## Editorial limitations

- Hypothetical examples are labelled as illustrative; they are not customer case studies or test results.
- The pages do not claim that Avenqora Vortax performed independent product testing, interviews or first-hand experiments.
- Vendor documentation is used to explain platform-specific behaviour; it is not presented as independent endorsement.
- The new pages do not establish expert review or guarantee search rankings, indexing, traffic or guest-post revenue.
- Live production deployment and Google Search Console indexing status must be checked separately after the GitHub changes are merged.
