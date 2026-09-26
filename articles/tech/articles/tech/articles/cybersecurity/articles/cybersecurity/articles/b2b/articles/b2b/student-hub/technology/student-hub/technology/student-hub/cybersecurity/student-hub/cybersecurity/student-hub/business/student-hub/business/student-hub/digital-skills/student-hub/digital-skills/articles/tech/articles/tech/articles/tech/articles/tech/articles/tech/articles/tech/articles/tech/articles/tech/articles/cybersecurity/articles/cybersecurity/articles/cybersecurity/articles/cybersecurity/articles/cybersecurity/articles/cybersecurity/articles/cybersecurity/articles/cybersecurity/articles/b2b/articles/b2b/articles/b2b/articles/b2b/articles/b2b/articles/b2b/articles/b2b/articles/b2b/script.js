

document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     MOBILE NAVIGATION
  ========================== */

  const menuButton = document.querySelector("[data-menu-button]");
  const navigation = document.querySelector("[data-navigation]");

  const closeNavigation = () => {
    if (!navigation || !menuButton) {
      return;
    }

    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  };

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("is-open");

      menuButton.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeNavigation);
    });

    document.addEventListener("click", (event) => {
      if (
        navigation.classList.contains("is-open") &&
        !navigation.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {
        closeNavigation();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeNavigation();
        menuButton.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        closeNavigation();
      }
    });
  }

  /* =========================
     LIVE IMAGE URL SYSTEM
     Unsplash download URLs
  ========================== */

  const imageMap = {
    /* =========================
       TECH & SAAS
    ========================== */

    "tech-article-1.jpg":
      "https://unsplash.com/photos/hpjSkU2UYSU/download?force=true&keywords=saas-business-software",

    "tech-article-2.jpg":
      "https://unsplash.com/photos/yqaskj8lQBE/download?force=true&keywords=cloud-computing",

    "tech-article-3.jpg":
      "https://unsplash.com/photos/m_HRfLhgABo/download?force=true&keywords=software-development",

    "tech-article-4.jpg":
      "https://unsplash.com/photos/qwtCeJ5cLYs/download?force=true&keywords=artificial-intelligence",

    "tech-article-5.jpg":
      "https://unsplash.com/photos/Uz8THWPXwhI/download?force=true&keywords=digital-productivity",

    "tech-article-6.jpg":
      "https://unsplash.com/photos/nApaSgkzaxg/download?force=true&keywords=data-analytics",

    "tech-article-7.jpg":
      "https://unsplash.com/photos/Uz8THWPXwhI/download?force=true&keywords=remote-work-technology",

    "tech-article-8.jpg":
      "https://unsplash.com/photos/hpjSkU2UYSU/download?force=true&keywords=business-software",

    "tech-article-9.jpg":
      "https://unsplash.com/photos/3iZ5u1rEEr8/download?force=true&keywords=digital-transformation",

    "tech-article-10.jpg":
      "https://unsplash.com/photos/yqaskj8lQBE/download?force=true&keywords=technology-strategy",

    /* =========================
       CYBERSECURITY
    ========================== */

    "cyber-article-1.jpg":
      "https://unsplash.com/photos/EUsVwEOsblE/download?force=true&keywords=cybersecurity-fundamentals",

    "cyber-article-2.jpg":
      "https://unsplash.com/photos/iar-afB0QQw/download?force=true&keywords=phishing",

    "cyber-article-3.jpg":
      "https://unsplash.com/photos/mT7lXZPjk7U/download?force=true&keywords=ransomware",

    "cyber-article-4.jpg":
      "https://unsplash.com/photos/EUsVwEOsblE/download?force=true&keywords=network-security",

    "cyber-article-5.jpg":
      "https://unsplash.com/photos/yqaskj8lQBE/download?force=true&keywords=cloud-security",

    "cyber-article-6.jpg":
      "https://unsplash.com/photos/mT7lXZPjk7U/download?force=true&keywords=identity-access-management",

    "cyber-article-7.jpg":
      "https://unsplash.com/photos/iar-afB0QQw/download?force=true&keywords=endpoint-security",

    "cyber-article-8.jpg":
      "https://unsplash.com/photos/mT7lXZPjk7U/download?force=true&keywords=data-privacy",

    "cyber-article-9.jpg":
      "https://unsplash.com/photos/EUsVwEOsblE/download?force=true&keywords=security-monitoring",

    "cyber-article-10.jpg":
      "https://unsplash.com/photos/mT7lXZPjk7U/download?force=true&keywords=zero-trust",

    /* =========================
       B2B SOLUTIONS
       Topic keywords are matched
       directly to each article.
    ========================== */

    "b2b-article-1.jpg":
      "https://unsplash.com/photos/3iZ5u1rEEr8/download?force=true&keywords=b2b-process-automation",

    "b2b-article-2.jpg":
      "https://unsplash.com/photos/qwtCeJ5cLYs/download?force=true&keywords=b2b-data-driven-decision-making",

    "b2b-article-3.jpg":
      "https://unsplash.com/photos/hpjSkU2UYSU/download?force=true&keywords=b2b-crm-customer-relationships",

    "b2b-article-4.jpg":
      "https://unsplash.com/photos/3iZ5u1rEEr8/download?force=true&keywords=b2b-business-automation",

    "b2b-article-5.jpg":
      "https://unsplash.com/photos/qwtCeJ5cLYs/download?force=true&keywords=b2b-data-driven-decision-making",

    "b2b-article-6.jpg":
      "https://unsplash.com/photos/4le7k9XVYjE/download?force=true&keywords=b2b-customer-retention",

    "b2b-article-7.jpg":
      "https://unsplash.com/photos/Uz8THWPXwhI/download?force=true&keywords=b2b-project-management",

    "b2b-article-8.jpg":
      "https://unsplash.com/photos/yqaskj8lQBE/download?force=true&keywords=b2b-digital-transformation",

    "b2b-article-9.jpg":
      "https://unsplash.com/photos/AT5vuPoi8vc/download?force=true&keywords=b2b-procurement-vendor-management",

    "b2b-article-10.jpg":
      "https://unsplash.com/photos/yqaskj8lQBE/download?force=true&keywords=b2b-business-performance-kpis",

    /* =========================
       STUDENT HUB
    ========================== */

    "technology-network.jpg":
      "https://unsplash.com/photos/yqaskj8lQBE/download?force=true&keywords=technology-network",

    "technology-oop.jpg":
      "https://unsplash.com/photos/m_HRfLhgABo/download?force=true&keywords=object-oriented-programming",

    "cybersecurity-fundamentals.jpg":
      "https://unsplash.com/photos/EUsVwEOsblE/download?force=true&keywords=cybersecurity-fundamentals",

    "password-security.jpg":
      "https://unsplash.com/photos/mT7lXZPjk7U/download?force=true&keywords=password-security",

    "business-fundamentals.jpg":
      "https://unsplash.com/photos/AT5vuPoi8vc/download?force=true&keywords=business-fundamentals",

    "business-operations.jpg":
      "https://unsplash.com/photos/Uz8THWPXwhI/download?force=true&keywords=business-operations",

    "digital-literacy.jpg":
      "https://unsplash.com/photos/8qEB0fTe9Vw/download?force=true&keywords=digital-literacy",

    "digital-productivity.jpg":
      "https://unsplash.com/photos/hpjSkU2UYSU/download?force=true&keywords=digital-productivity"
  };

  const getImageKey = (value) => {
    if (!value) {
      return null;
    }

    const withoutQuery = value.split("?")[0].split("#")[0];
    const parts = withoutQuery.split("/");

    return parts[parts.length - 1] || null;
  };

  const updateImage = (image) => {
    if (!image || !image.getAttribute("src")) {
      return;
    }

    const key = getImageKey(image.getAttribute("src"));
    const liveUrl = imageMap[key];

    if (!liveUrl) {
      return;
    }

    image.setAttribute("src", liveUrl);
    image.removeAttribute("srcset");
    image.setAttribute("loading", "lazy");
    image.setAttribute("decoding", "async");
    image.setAttribute("referrerpolicy", "no-referrer");
  };

  document.querySelectorAll("img[src]").forEach(updateImage);

  /* =========================
     OPEN GRAPH / TWITTER IMAGE
  ========================== */

  document
    .querySelectorAll(
      'meta[property="og:image"], meta[name="twitter:image"]'
    )
    .forEach((meta) => {
      const currentValue = meta.getAttribute("content");

      if (!currentValue) {
        return;
      }

      const key = getImageKey(currentValue);
      const liveUrl = imageMap[key];

      if (liveUrl) {
        meta.setAttribute("content", liveUrl);
      }
    });

  /* =========================
     JSON-LD IMAGE
  ========================== */

  document
    .querySelectorAll('script[type="application/ld+json"]')
    .forEach((script) => {
      try {
        const json = JSON.parse(script.textContent);
        let changed = false;

        const replaceJsonImage = (value) => {
          if (typeof value !== "string") {
            return value;
          }

          const key = getImageKey(value);
          const liveUrl = imageMap[key];

          if (liveUrl) {
            changed = true;
            return liveUrl;
          }

          return value;
        };

        if (json && json.image) {
          if (Array.isArray(json.image)) {
            json.image = json.image.map(replaceJsonImage);
          } else {
            json.image = replaceJsonImage(json.image);
          }
        }

        if (changed) {
          script.textContent = JSON.stringify(json, null, 2);
        }
      } catch (error) {
        /* Leave unrelated JSON-LD unchanged. */
      }
    });
});
