# Translation prototype (isolated branch)

This experiment is on the `translator-prototype` branch only. It has **not** been added to `main` or any production page.

## Files
- `translation-prototype.html`: isolated demo page; includes `noindex,nofollow`.
- `translation-prototype.js`: client-side prototype using public LibreTranslate-compatible endpoints, with endpoint failover and session caching.

## How to review
1. Open the branch in GitHub and inspect `translation-prototype.html` and `translation-prototype.js`.
2. For a browser test, serve the branch files from a local static server or a temporary preview environment. A local `file://` page may fail because browsers restrict network requests.
3. Choose a target language and press **Translate page**. Try restoring English and changing language twice.
4. Check browser DevTools Console and Network for CORS, endpoint availability, request limits, or response-shape errors.

## Important limitations
- This is an experiment, not a verified production-ready translator. Public no-key endpoints may be unavailable, rate-limited, changed, or blocked by CORS. This environment could not directly confirm their live availability.
- Machine translation is not guaranteed to be accurate. Human review is needed for cybersecurity, legal, medical, and other important content.
- Language options depend on what the selected translation server supports; “all languages” cannot be guaranteed.
- Translation runs in the visitor's browser by sending page text to a third-party translation service. A privacy notice should explain this before production use.
- A static GitHub Pages site cannot host a private translation model itself. A genuinely independent no-API-key setup would require running an open-source model on a server or distributing a large model to the browser; both have resource and maintenance trade-offs.
- Do not merge this prototype into `main` until browser testing, privacy review, performance testing, and an accessibility review are complete.

## Official references
- LibreTranslate API usage: https://docs.libretranslate.com/guides/api_usage/
- LibreTranslate installation/self-hosting: https://docs.libretranslate.com/guides/installation/
- Google announced that its Website Translator widget would no longer be supported starting October 1, 2026: https://developers.google.com/search/blog/2020/05/google-translates-website-translator?hl=en
