document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("site-search-form");
  const input = document.getElementById("site-search");
  const categorySelect = document.getElementById("search-category");
  const resultsContainer = document.getElementById("search-results");
  const status = document.getElementById("search-status");

  if (
    !form ||
    !input ||
    !categorySelect ||
    !resultsContainer ||
    !status
  ) {
    return;
  }

  const BASE_URL =
    "https://mjalaldin87-maker.github.io/avenqora-vortax/";

  const SITEMAP_URL = `${BASE_URL}sitemap.xml`;

  let contentIndex = [];
  let isReady = false;

  const escapeHtml = (value = "") => {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const normalize = (value = "") => {
    return value
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\p{L}\p{N}\s-]/gu, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const getCategory = (url, title = "") => {
    const normalizedUrl = normalize(url);
    const normalizedTitle = normalize(title);

    if (normalizedUrl.includes("/articles/tech/")) {
      return "tech";
    }

    if (normalizedUrl.includes("/articles/cybersecurity/")) {
      return "cybersecurity";
    }

    if (normalizedUrl.includes("/articles/b2b/")) {
      return "b2b";
    }

    if (normalizedUrl.includes("/student-hub/")) {
      return "student";
    }

    if (
      normalizedTitle.includes("tech") ||
      normalizedTitle.includes("saas")
    ) {
      return "tech";
    }

    if (normalizedTitle.includes("cyber")) {
      return "cybersecurity";
    }

    if (normalizedTitle.includes("b2b")) {
      return "b2b";
    }

    if (
      normalizedTitle.includes("student") ||
      normalizedTitle.includes("lesson")
    ) {
      return "student";
    }

    return "pages";
  };

  const getCategoryLabel = (category) => {
    const labels = {
      tech: "Tech & SaaS",
      cybersecurity: "Cybersecurity",
      b2b: "B2B Solutions",
      student: "Student Hub",
      pages: "Avenqora Vortax"
    };

    return labels[category] || "Avenqora Vortax";
  };

  const getContentType = (url, category) => {
    if (category === "student") {
      return "Lesson";
    }

    if (url.includes("/articles/")) {
      return "Article";
    }

    return "Page";
  };

  const getDateFromDocument = (documentObject) => {
    const jsonLdScripts = documentObject.querySelectorAll(
      'script[type="application/ld+json"]'
    );

    for (const script of jsonLdScripts) {
      try {
        const data = JSON.parse(script.textContent);

        if (
          data &&
          typeof data === "object" &&
          data.datePublished
        ) {
          return data.datePublished;
        }

        if (Array.isArray(data)) {
          const article = data.find(
            (item) =>
              item &&
              typeof item === "object" &&
              item.datePublished
          );

          if (article) {
            return article.datePublished;
          }
        }
      } catch (error) {
        continue;
      }
    }

    const timeElement =
      documentObject.querySelector("time[datetime]");

    return timeElement
      ? timeElement.getAttribute("datetime")
      : "";
  };

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "short",
      day: "numeric"
    }).format(date);
  };

  const buildSnippet = (text, query) => {
    const cleanText = String(text || "")
      .replace(/\s+/g, " ")
      .trim();

    if (!cleanText) {
      return "Explore this resource on Avenqora Vortax.";
    }

    const normalizedText = normalize(cleanText);
    const normalizedQuery = normalize(query);

    if (!normalizedQuery) {
      return cleanText.slice(0, 220);
    }

    const position = normalizedText.indexOf(normalizedQuery);

    if (position === -1) {
      return cleanText.slice(0, 220);
    }

    const start = Math.max(0, position - 90);
    const end = Math.min(
      cleanText.length,
      position + normalizedQuery.length + 130
    );

    const prefix = start > 0 ? "… " : "";
    const suffix = end < cleanText.length ? " …" : "";

    return (
      prefix +
      cleanText.slice(start, end).trim() +
      suffix
    );
  };

  const extractDocumentData = (documentObject, url) => {
    const titleElement =
      documentObject.querySelector("title");

    const descriptionElement =
      documentObject.querySelector(
        'meta[name="description"]'
      );

    const h1Element =
      documentObject.querySelector("h1");

    const title =
      titleElement?.textContent?.trim() ||
      h1Element?.textContent?.trim() ||
      "Avenqora Vortax";

    const description =
      descriptionElement
        ?.getAttribute("content")
        ?.trim() || "";

    const contentRoot =
      documentObject.querySelector(".article-content") ||
      documentObject.querySelector("main") ||
      documentObject.body;

    const text =
      contentRoot?.textContent
        ?.replace(/\s+/g, " ")
        .trim() || "";

    const category = getCategory(url, title);

    return {
      url,
      title,
      description,
      text: text.slice(0, 12000),
      normalizedTitle: normalize(title),
      normalizedDescription: normalize(description),
      normalizedText: normalize(text).slice(0, 12000),
      category,
      categoryLabel: getCategoryLabel(category),
      type: getContentType(url, category),
      date: getDateFromDocument(documentObject)
    };
  };

  const fetchHtmlDocument = async (url) => {
    const response = await fetch(url, {
      method: "GET",
      credentials: "same-origin",
      cache: "default"
    });

    if (!response.ok) {
      throw new Error(
        `Unable to load ${url}: ${response.status}`
      );
    }

    const html = await response.text();

    return new DOMParser().parseFromString(
      html,
      "text/html"
    );
  };

  const extractSitemapUrls = async () => {
    const response = await fetch(SITEMAP_URL, {
      method: "GET",
      credentials: "same-origin",
      cache: "no-cache"
    });

    if (!response.ok) {
      throw new Error(
        `Unable to load sitemap: ${response.status}`
      );
    }

    const xmlText = await response.text();

    const xml =
      new DOMParser().parseFromString(
        xmlText,
        "application/xml"
      );

    if (xml.querySelector("parsererror")) {
      throw new Error("Invalid sitemap XML.");
    }

    return [...xml.querySelectorAll("loc")]
      .map((node) => node.textContent.trim())
      .filter((url) => url.endsWith(".html"))
      .filter((url) => !url.endsWith("/404.html"))
      .filter((url) => !url.endsWith("/search.html"))
      .filter(
        (url, index, array) =>
          array.indexOf(url) === index
      );
  };

  const loadContentIndex = async () => {
    const urls = await extractSitemapUrls();
    const results = [];
    const concurrency = 5;

    for (
      let start = 0;
      start < urls.length;
      start += concurrency
    ) {
      const batch = urls.slice(
        start,
        start + concurrency
      );

      const batchResults =
        await Promise.allSettled(
          batch.map(async (url) => {
            const documentObject =
              await fetchHtmlDocument(url);

            return extractDocumentData(
              documentObject,
              url
            );
          })
        );

      batchResults.forEach((result) => {
        if (result.status === "fulfilled") {
          results.push(result.value);
        }
      });

      status.textContent =
        `Indexing content… ${Math.min(
          start + batch.length,
          urls.length
        )} of ${urls.length}`;
    }

    return results;
  };

  const scoreItem = (item, queryTokens) => {
    let score = 0;

    queryTokens.forEach((token) => {
      if (item.normalizedTitle === token) {
        score += 120;
      }

      if (item.normalizedTitle.includes(token)) {
        score += 80;
      }

      if (
        item.normalizedDescription.includes(
          token
        )
      ) {
        score += 40;
      }

      if (
        item.normalizedText.includes(token)
      ) {
        score += 10;
      }

      const safeToken = token.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      const matches =
        item.normalizedText.match(
          new RegExp(safeToken, "g")
        ) || [];

      score += Math.min(
        matches.length * 2,
        20
      );
    });

    return score;
  };

  const renderResults = (
    items,
    query,
    requestedCategory
  ) => {
    resultsContainer.innerHTML = "";

    const normalizedQuery = normalize(query);

    const queryTokens = normalizedQuery
      ? normalizedQuery
          .split(/\s+/)
          .filter(Boolean)
      : [];

    let results = items.filter((item) => {
      return (
        requestedCategory === "all" ||
        item.category === requestedCategory
      );
    });

    if (queryTokens.length > 0) {
      results = results
        .map((item) => ({
          item,
          score: scoreItem(
            item,
            queryTokens
          )
        }))
        .filter(
          (entry) => entry.score > 0
        )
        .sort(
          (a, b) =>
            b.score - a.score ||
            a.item.title.localeCompare(
              b.item.title
            )
        )
        .map(
          (entry) => entry.item
        );
    } else {
      results.sort((a, b) => {
        const dateA =
          new Date(a.date || 0).getTime();

        const dateB =
          new Date(b.date || 0).getTime();

        return (
          dateB - dateA ||
          a.title.localeCompare(b.title)
        );
      });
    }

    if (results.length === 0) {
      resultsContainer.innerHTML = `
        <article class="category-card">
          <h2>No matching content found</h2>
          <p>
            Try broader keywords or choose a different category.
          </p>
        </article>
      `;

      status.textContent =
        "No matching content found.";

      resultsContainer.setAttribute(
        "aria-busy",
        "false"
      );

      return;
    }

    const fragment =
      document.createDocumentFragment();

    results.forEach((item) => {
      const article =
        document.createElement("article");

      article.className = "article-card";

      const description =
        item.description ||
        buildSnippet(
          item.text,
          query
        );

      const displayDate =
        formatDate(item.date);

      article.innerHTML = `
        <div class="article-card-content">

          <span class="eyebrow">
            ${escapeHtml(item.categoryLabel)}
          </span>

          <h2>
            <a href="${escapeHtml(item.url)}">
              ${escapeHtml(item.title)}
            </a>
          </h2>

          <p>
            ${escapeHtml(
              query
                ? buildSnippet(
                    description,
                    query
                  )
                : description.slice(
                    0,
                    260
                  )
            )}
          </p>

          <div class="article-meta">

            <span>
              ${escapeHtml(item.type)}
            </span>

            ${
              displayDate
                ? `
                  <span>
                    ${escapeHtml(
                      displayDate
                    )}
                  </span>
                `
                : ""
            }

          </div>

          <a
            class="button button-secondary"
            href="${escapeHtml(item.url)}"
          >
            Open Content
          </a>

        </div>
      `;

      fragment.appendChild(article);
    });

    resultsContainer.appendChild(fragment);

    status.textContent = query
      ? `${results.length} result${
          results.length === 1
            ? ""
            : "s"
        } found for "${query}".`
      : `${results.length} searchable resources available.`;

    resultsContainer.setAttribute(
      "aria-busy",
      "false"
    );

    if (query) {
      const params = new URLSearchParams();

      params.set("q", query);

      if (requestedCategory !== "all") {
        params.set(
          "category",
          requestedCategory
        );
      }

      window.history.replaceState(
        null,
        "",
        `search.html?${params.toString()}#results`
      );
    }
  };

  const runSearch = () => {
    if (!isReady) {
      status.textContent =
        "The search index is still loading.";
      return;
    }

    renderResults(
      contentIndex,
      input.value.trim(),
      categorySelect.value
    );
  };

  const readUrlState = () => {
    const params =
      new URLSearchParams(
        window.location.search
      );

    const query =
      params.get("q") || "";

    const category =
      params.get("category") || "all";

    input.value = query;

    if (
      [
        "all",
        "tech",
        "cybersecurity",
        "b2b",
        "student",
        "pages"
      ].includes(category)
    ) {
      categorySelect.value = category;
    }

    return {
      query,
      category
    };
  };

  form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();
      runSearch();
    }
  );

  input.addEventListener(
    "input",
    () => {
      if (!isReady) {
        return;
      }

      window.clearTimeout(
        input._searchTimer
      );

      input._searchTimer =
        window.setTimeout(
          runSearch,
          180
        );
    }
  );

  categorySelect.addEventListener(
    "change",
    runSearch
  );

  const initialState =
    readUrlState();

  loadContentIndex()
    .then((items) => {
      contentIndex = items;
      isReady = true;

      renderResults(
        contentIndex,
        initialState.query,
        initialState.category
      );
    })
    .catch((error) => {
      console.error(
        "Search initialization failed:",
        error
      );

      status.textContent =
        "Search is temporarily unavailable. Please use the category pages to browse the site.";

      resultsContainer.innerHTML = `
        <article class="category-card">
          <h2>
            Content index unavailable
          </h2>

          <p>
            The search index could not be loaded.
            The rest of the website remains available
            through the main navigation.
          </p>

          <a
            class="button"
            href="index.html"
          >
            Return Home
          </a>
        </article>
      `;

      resultsContainer.setAttribute(
        "aria-busy",
        "false"
      );
    });
});
