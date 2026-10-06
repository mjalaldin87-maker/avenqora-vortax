# Avenqora Vortax

A static GitHub Pages publication and learning site covering Tech & SaaS, Cybersecurity, B2B Solutions and Student Hub lessons.

## Site structure

- `index.html` — homepage
- `tech-saas.html` — Tech & SaaS category
- `cybersecurity.html` — Cybersecurity category
- `b2b.html` — B2B Solutions category
- `student-hub.html` — Student Hub
- `articles/` — 33 publication articles
- `student-hub/` — 12 lessons
- `team.html`, `about.html`, `contact.html` — trust and contact pages
- `style.css` — shared design system
- `script.js` — navigation and shared client-side behavior
- `sitemap.xml` — indexable URL list
- `robots.txt` — crawler directives
- `images/og-default.png` — social preview image

## Adding a new article

1. Create the new article HTML file in the correct category directory.
2. Keep the existing URL structure and canonical URL consistent.
3. Add the article as a static HTML card on its category page.
4. Add the article to the homepage/latest or relevant static content block when appropriate.
5. Add three static related-article links and Previous/Next navigation.
6. Add the article URL and `lastmod` to `sitemap.xml`.
7. Add/update the article's JSON-LD Article and BreadcrumbList.
8. Add the author byline and link it to the correct section on `team.html`.
9. Keep a visible Last Updated value.
10. Keep the Sources section and replace `[FILL IN]` with verified sources before publication.
11. Check the title, description, canonical, OG and Twitter metadata.
12. Run an internal-link check before committing.

## Content rules

Do not invent sources, credentials, statistics, awards, testimonials, social profiles or other facts. Use `[FILL IN]` when a real-world detail still needs to be supplied or verified.
