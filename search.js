document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("site-search-form");
  const input = document.getElementById("site-search");
  const categorySelect = document.getElementById("search-category");
  const resultsContainer = document.getElementById("search-results");
  const status = document.getElementById("search-status");

  if (!form || !input || !categorySelect || !resultsContainer || !status) return;

  const BASE_URL = "https://avenqoravortax.com/";
  const SITEMAP_URL = `${BASE_URL}sitemap.xml`;
  let contentIndex = [];
  let isReady = false;

  const escapeHtml = (value = "") => String(value)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#039;");

  const normalize = (value = "") => String(value).toLowerCase()
    .normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, " ").replace(/\s+/g, " ").trim();

  const getCategory = (url, title = "") => {
    const u = normalize(url), t = normalize(title);
    if (u.includes("/articles/tech/")) return "tech";
    if (u.includes("/articles/cybersecurity/")) return "cybersecurity";
    if (u.includes("/articles/b2b/")) return "b2b";
    if (u.includes("/student-hub/")) return "student";
    if (t.includes("tech") || t.includes("saas")) return "tech";
    if (t.includes("cyber")) return "cybersecurity";
    if (t.includes("b2b")) return "b2b";
    if (t.includes("student") || t.includes("lesson")) return "student";
    return "pages";
  };

  const labels = { tech: "Tech & SaaS", cybersecurity: "Cybersecurity", b2b: "B2B Solutions", student: "Student Hub", pages: "Avenqora Vortax" };

  const getDocumentData = (doc, url) => {
    const title = doc.querySelector("title")?.textContent?.trim() || doc.querySelector("h1")?.textContent?.trim() || "Avenqora Vortax";
    const description = doc.querySelector('meta[name="description"]')?.getAttribute("content")?.trim() || "";
    const root = doc.querySelector(".article-content") || doc.querySelector("main") || doc.body;
    const text = root?.textContent?.replace(/\s+/g, " ").trim() || "";
    const category = getCategory(url, title);
    let date = "";
    const time = doc.querySelector("time[datetime]");
    if (time) date = time.getAttribute("datetime") || "";
    return { url, title, description, text: text.slice(0, 12000), category, date };
  };

  const loadIndex = async () => {
    const response = await fetch(SITEMAP_URL, { cache: "no-cache" });
    if (!response.ok) throw new Error(`Sitemap ${response.status}`);
    const xml = new DOMParser().parseFromString(await response.text(), "application/xml");
    if (xml.querySelector("parsererror")) throw new Error("Invalid sitemap XML");
    const urls = [...xml.querySelectorAll("loc")]
      .map(node => node.textContent.trim())
      .filter(url => url.endsWith(".html") && !url.endsWith("/404.html") && !url.endsWith("/search.html"));
    const unique = [...new Set(urls)];
    const results = [];
    for (let i = 0; i < unique.length; i += 5) {
      const batch = unique.slice(i, i + 5);
      const loaded = await Promise.allSettled(batch.map(async url => {
        const response = await fetch(url, { cache: "default" });
        if (!response.ok) throw new Error(String(response.status));
        return getDocumentData(new DOMParser().parseFromString(await response.text(), "text/html"), url);
      }));
      loaded.forEach(item => { if (item.status === "fulfilled") results.push(item.value); });
      status.textContent = `Indexing content… ${Math.min(i + batch.length, unique.length)} of ${unique.length}`;
    }
    return results;
  };

  const render = (query, category) => {
    const q = normalize(query);
    let results = contentIndex.filter(item => category === "all" || item.category === category);
    if (q) {
      const tokens = q.split(/\s+/).filter(Boolean);
      results = results.map(item => {
        const title = normalize(item.title), description = normalize(item.description), text = normalize(item.text);
        let score = 0;
        tokens.forEach(token => {
          if (title.includes(token)) score += 80;
          if (description.includes(token)) score += 30;
          if (text.includes(token)) score += 10;
        });
        return { item, score };
      }).filter(x => x.score > 0).sort((a,b) => b.score - a.score).map(x => x.item);
    } else {
      results.sort((a,b) => new Date(b.date || 0) - new Date(a.date || 0));
    }

    resultsContainer.innerHTML = "";
    if (!results.length) {
      status.textContent = "No matching content found.";
      resultsContainer.innerHTML = `<article class="category-card"><h2>No matching content found</h2><p>Try broader keywords or choose another category.</p></article>`;
      resultsContainer.setAttribute("aria-busy", "false");
      return;
    }

    const fragment = document.createDocumentFragment();
    results.forEach(item => {
      const article = document.createElement("article");
      article.className = "article-card";
      const description = item.description || item.text.slice(0, 240);
      const type = item.category === "student" ? "Lesson" : item.url.includes("/articles/") ? "Article" : "Page";
      article.innerHTML = `<div class="article-card-content"><span class="eyebrow">${escapeHtml(labels[item.category] || labels.pages)}</span><h2><a href="${escapeHtml(item.url)}">${escapeHtml(item.title)}</a></h2><p>${escapeHtml(description.slice(0, 260))}</p><div class="article-meta"><span>${type}</span></div><a class="button button-secondary" href="${escapeHtml(item.url)}">Open Content</a></div>`;
      fragment.appendChild(article);
    });
    resultsContainer.appendChild(fragment);
    status.textContent = q ? `${results.length} result${results.length === 1 ? "" : "s"} found for "${query}".` : `${results.length} searchable resources available.`;
    resultsContainer.setAttribute("aria-busy", "false");
  };

  const runSearch = () => {
    if (!isReady) { status.textContent = "The search index is still loading."; return; }
    render(input.value.trim(), categorySelect.value);
  };

  form.addEventListener("submit", event => { event.preventDefault(); runSearch(); });
  input.addEventListener("input", () => { if (isReady) { clearTimeout(input._searchTimer); input._searchTimer = setTimeout(runSearch, 180); } });
  categorySelect.addEventListener("change", runSearch);

  loadIndex().then(items => {
    contentIndex = items;
    isReady = true;
    render(input.value.trim(), categorySelect.value);
  }).catch(error => {
    console.error("Search initialization failed:", error);
    isReady = false;
    status.textContent = "Search is temporarily unavailable. Please use the main navigation.";
    resultsContainer.innerHTML = `<article class="category-card"><h2>Content index unavailable</h2><p>The search index could not be loaded. The rest of Avenqora Vortax remains available through the main navigation.</p><a class="button" href="index.html">Return Home</a></article>`;
    resultsContainer.setAttribute("aria-busy", "false");
  });
});