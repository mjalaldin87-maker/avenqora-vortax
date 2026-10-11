/* Avenqora Vortax translation prototype.
 * Not connected to production pages. Free public LibreTranslate-compatible
 * endpoints are best-effort; they can rate-limit, go offline, or change CORS.
 */
(() => {
  "use strict";

  const PROVIDERS = [
    "https://translate.argosopentech.com",
    "https://translate.mentality.rip",
    "https://translate.api.skitzen.com",
    "https://libretranslate.de"
  ];
  const STORAGE_PREFIX = "avx-translation-v1:";
  const EXCLUDED = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "CODE", "PRE", "TEXTAREA", "INPUT", "SELECT", "OPTION", "SVG", "CANVAS", "IFRAME"]);
  let activeProvider = null;
  let activeLanguage = "en";
  let busy = false;
  let observer = null;
  const originalText = new WeakMap();

  const selector = document.querySelector("#avx-language");
  const status = document.querySelector("#avx-translation-status");
  const translateButton = document.querySelector("#avx-translate-button");
  const resetButton = document.querySelector("#avx-reset-button");

  function setStatus(message, isError = false) {
    if (!status) return;
    status.textContent = message;
    status.dataset.state = isError ? "error" : "normal";
  }

  async function request(path, payload) {
    const providers = activeProvider
      ? [activeProvider, ...PROVIDERS.filter(p => p !== activeProvider)]
      : PROVIDERS;
    let lastError;
    for (const base of providers) {
      try {
        const response = await fetch(base + path, {
          method: payload ? "POST" : "GET",
          headers: payload ? { "Content-Type": "application/json" } : undefined,
          body: payload ? JSON.stringify(payload) : undefined,
          signal: AbortSignal.timeout(18000)
        });
        if (!response.ok) throw new Error("HTTP " + response.status);
        const data = await response.json();
        activeProvider = base;
        return data;
      } catch (error) {
        lastError = error;
      }
    }
    throw lastError || new Error("No translation provider responded");
  }

  async function loadLanguages() {
    setStatus("Loading available languages…");
    try {
      const languages = await request("/languages");
      const current = selector.value || "en";
      selector.replaceChildren();
      const english = document.createElement("option");
      english.value = "en";
      english.textContent = "English (original)";
      selector.append(english);
      for (const item of languages) {
        if (!item.code || item.code === "en") continue;
        const option = document.createElement("option");
        option.value = item.code;
        option.textContent = item.name + " (" + item.code + ")";
        selector.append(option);
      }
      selector.value = [...selector.options].some(o => o.value === current) ? current : "en";
      setStatus("Language list loaded. Choose a language and press Translate page.");
    } catch {
      setStatus("Could not load live language list. Use the fallback choices; public servers may be offline.", true);
      selector.replaceChildren();
      for (const [code, name] of [["en","English (original)"],["ur","Urdu"],["ar","Arabic"],["es","Spanish"],["fr","French"],["de","German"],["pt","Portuguese"],["ru","Russian"],["hi","Hindi"],["it","Italian"],["tr","Turkish"],["zh","Chinese"]]) {
        const option = document.createElement("option");
        option.value = code;
        option.textContent = name;
        selector.append(option);
      }
    }
  }

  function getTextNodes(root = document.body) {
    const nodes = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || EXCLUDED.has(parent.tagName) || parent.closest("[data-no-translate],script,style,noscript,code,pre,textarea,input,select,option,svg,canvas,iframe")) return NodeFilter.FILTER_REJECT;
        const value = node.nodeValue;
        if (!value || !value.trim()) return NodeFilter.FILTER_REJECT;
        if (!originalText.has(node)) originalText.set(node, value);
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    while (walker.nextNode()) nodes.push(walker.currentNode);
    return nodes;
  }

  function cacheKey(language, text) {
    return STORAGE_PREFIX + language + ":" + text;
  }

  function getCache(language, text) {
    try { return sessionStorage.getItem(cacheKey(language, text)); } catch { return null; }
  }

  function setCache(language, text, translated) {
    try { sessionStorage.setItem(cacheKey(language, text), translated); } catch {}
  }

  function escapeHtml(value) {
      return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }
  
    async function translateTexts(texts, target) {
      const output = new Array(texts.length);
      const missing = [];
      const missingIndexes = [];
      texts.forEach((text, index) => {
        const cached = getCache(target, text);
        if (cached !== null) output[index] = cached;
        else { missing.push(text); missingIndexes.push(index); }
      });
  
      // LibreTranslate's documented API accepts one q string. Wrap a small batch
      // in HTML so markup identifies each fragment; do not assume q accepts arrays.
      for (let start = 0; start < missing.length; start += 8) {
        const textBatch = missing.slice(start, start + 8);
        const indexBatch = missingIndexes.slice(start, start + 8);
        const markup = "<div>" + textBatch.map((value, i) =>
          '<p><span id="avx-fragment-' + i + '">' + escapeHtml(value) + "</span></p>"
        ).join("") + "</div>";
        const response = await request("/translate", {
          q: markup, source: "en", target, format: "html"
        });
        if (typeof response.translatedText !== "string") {
          throw new Error("Translation server returned an unexpected response");
        }
        const parsed = new DOMParser().parseFromString(response.translatedText, "text/html");
        const values = textBatch.map((_, i) => {
          const span = parsed.getElementById("avx-fragment-" + i);
          return span ? span.textContent : null;
        });
        if (values.some(value => typeof value !== "string")) {
          throw new Error("Translation server did not preserve batch markup");
        }
        values.forEach((value, j) => {
          const original = textBatch[j];
          output[indexBatch[j]] = value;
          setCache(target, original, value);
        });
      }
      return output;
    }

  async function applyTranslation() {
    if (busy) return;
    const target = selector.value;
    if (target === "en") { restoreEnglish(); return; }
    busy = true;
    translateButton.disabled = true;
    setStatus("Preparing page text…");
    try {
      const nodes = getTextNodes();
      const originals = nodes.map(node => originalText.get(node) ?? node.nodeValue);
      const targets = [];
      const indexes = [];
      originals.forEach((text, index) => {
        if (text.trim()) { targets.push(text); indexes.push(index); }
      });
      setStatus("Translating " + targets.length + " text fragments. Large pages may take time…");
      const translated = await translateTexts(targets, target);
      translated.forEach((text, i) => {
        const node = nodes[indexes[i]];
        if (node.isConnected) node.nodeValue = text;
      });
      activeLanguage = target;
      setStatus("Translation finished using " + (activeProvider || "a public translation server") + ". Review important wording; machine translation can be inaccurate.");
    } catch (error) {
      setStatus("Translation failed or a public server limit was reached. English content is preserved. Try again later. (" + (error?.message || "network error") + ")", true);
    } finally {
      busy = false;
      translateButton.disabled = false;
    }
  }

  function restoreEnglish() {
    for (const node of getTextNodes()) {
      const original = originalText.get(node);
      if (typeof original === "string") node.nodeValue = original;
    }
    activeLanguage = "en";
    setStatus("Original English content restored.");
  }

  if (translateButton && selector && status) {
    translateButton.addEventListener("click", applyTranslation);
    if (resetButton) resetButton.addEventListener("click", restoreEnglish);
    loadLanguages();
  }
})();