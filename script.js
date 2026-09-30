document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector("[data-menu-button]");
  const navigation = document.querySelector("[data-navigation]");
  const closeNavigation = () => {
    if (!navigation || !menuButton) return;
    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  };
  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });
    navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNavigation));
    document.addEventListener("click", (event) => {
      if (navigation.classList.contains("is-open") && !navigation.contains(event.target) && !menuButton.contains(event.target)) closeNavigation();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") { closeNavigation(); menuButton.focus(); }
    });
    window.addEventListener("resize", () => { if (window.innerWidth > 900) closeNavigation(); });
  }

  const fallbackImage = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=85";
  const imageMap = {
    "tech-article-1.jpg":"https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=85",
    "tech-article-2.jpg":"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=85",
    "tech-article-3.jpg":"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=85",
    "tech-article-4.jpg":"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1600&q=85",
    "tech-article-5.jpg":"https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1600&q=85",
    "tech-article-6.jpg":"https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85",
    "tech-article-7.jpg":"https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1600&q=85",
    "tech-article-8.jpg":"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85",
    "tech-article-9.jpg":"https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=85",
    "tech-article-10.jpg":"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85",
    "tech-article-11.jpg":"https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1600&q=85",
    "cyber-article-1.jpg":"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85",
    "cyber-article-2.jpg":"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=85",
    "cyber-article-3.jpg":"https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1600&q=85",
    "cyber-article-4.jpg":"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=85",
    "cyber-article-5.jpg":"https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=85",
    "cyber-article-6.jpg":"https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1600&q=85",
    "cyber-article-7.jpg":"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85",
    "cyber-article-8.jpg":"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=85",
    "cyber-article-9.jpg":"https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85",
    "cyber-article-10.jpg":"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85",
    "cyber-article-11.jpg":"https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1600&q=85",
    "b2b-article-1.jpg":"https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=85",
    "b2b-article-2.jpg":"https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85",
    "b2b-article-3.jpg":"https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=85",
    "b2b-article-4.jpg":"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85",
    "b2b-article-5.jpg":"https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85",
    "b2b-article-6.jpg":"https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=85",
    "b2b-article-7.jpg":"https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=85",
    "b2b-article-8.jpg":"https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=85",
    "b2b-article-9.jpg":"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=85",
    "b2b-article-10.jpg":"https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85",
    "b2b-article-11.jpg":"https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=85",
    "technology-network.jpg":"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=85",
    "technology-oop.jpg":"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=85",
    "technology-api.jpg":"https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1600&q=85",
    "cybersecurity-fundamentals.jpg":"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85",
    "password-security.jpg":"https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1600&q=85",
    "cybersecurity-mfa.jpg":"https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1600&q=85",
    "business-fundamentals.jpg":"https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=85",
    "business-operations.jpg":"https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=85",
    "business-lead-generation.jpg":"https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=85",
    "digital-literacy.jpg":"https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1600&q=85",
    "digital-productivity.jpg":"https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1600&q=85",
    "digital-research.jpg":"https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1600&q=85"
  };

  const getImageKey = (value) => {
    if (!value) return null;
    const cleanValue = value.split("?")[0].split("#")[0];
    const parts = cleanValue.split("/");
    return parts[parts.length - 1] || null;
  };

  document.querySelectorAll("img[src]").forEach((image) => {
    const currentSrc = image.getAttribute("src");
    const key = getImageKey(currentSrc);
    const liveUrl = imageMap[key] || fallbackImage;
    image.setAttribute("src", liveUrl);
    image.removeAttribute("srcset");
    image.setAttribute("loading", "lazy");
    image.setAttribute("decoding", "async");
    image.setAttribute("referrerpolicy", "no-referrer");
    image.addEventListener("error", () => {
      if (image.dataset.fallbackApplied === "true") return;
      image.dataset.fallbackApplied = "true";
      image.setAttribute("src", fallbackImage);
    }, { once: true });
  });

  document.querySelectorAll('meta[property="og:image"], meta[name="twitter:image"]').forEach((meta) => {
    const key = getImageKey(meta.getAttribute("content"));
    const liveUrl = imageMap[key] || fallbackImage;
    meta.setAttribute("content", liveUrl);
  });

  document.querySelectorAll('script[type="application/ld+json"]').forEach((script) => {
    try {
      const json = JSON.parse(script.textContent);
      let changed = false;
      const replaceImage = (value) => {
        if (typeof value !== "string") return value;
        const key = getImageKey(value);
        const liveUrl = imageMap[key];
        if (liveUrl) { changed = true; return liveUrl; }
        return value;
      };
      if (json && json.image) {
        if (Array.isArray(json.image)) json.image = json.image.map(replaceImage);
        else json.image = replaceImage(json.image);
      }
      if (changed) script.textContent = JSON.stringify(json, null, 2);
    } catch (error) { return; }
  });
});
