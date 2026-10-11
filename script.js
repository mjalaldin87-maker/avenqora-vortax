document.addEventListener("DOMContentLoaded", () => {
  // Site-wide language switcher: translates the current page at runtime.
  // Because this is shared by the site's pages, future articles using script.js
  // will receive the same language selector automatically.
  const navigationForLanguage = document.querySelector("[data-navigation]");
  if (navigationForLanguage && !navigationForLanguage.querySelector(".av-language-control")) {
    const languageControl = document.createElement("div");
    languageControl.className = "av-language-control";
    languageControl.innerHTML = '<span class="av-language-label">Language</span><div class="gtranslate_wrapper"></div>';
    navigationForLanguage.appendChild(languageControl);

    window.gtranslateSettings = {
      default_language: "en",
      native_language_names: true,
      detect_browser_language: false,
      languages: [
        "en","ar","bg","zh-CN","zh-TW","hr","cs","da","nl","fi","fr","de","el","hi","it",
        "ja","ko","no","pl","pt","ro","ru","es","sv","ca","tl","iw","id","lv","lt","sr",
        "sk","sl","uk","vi","sq","et","gl","hu","mt","th","tr","fa","af","ms","sw","ga",
        "cy","be","is","mk","yi","hy","az","eu","ka","ht","ur","bn","bs","ceb","eo","gu",
        "ha","hmn","ig","jw","kn","km","lo","la","mi","mr","mn","ne","pa","so","ta","te",
        "yo","zu","my","ny","kk","mg","ml","si","st","su","tg","uz","am","co","haw","ku",
        "ky","lb","ps","sm","gd","sn","sd","fy","xh"
      ],
      wrapper_selector: ".gtranslate_wrapper"
    };

    const translationScript = document.createElement("script");
    translationScript.src = "https://cdn.gtranslate.net/widgets/latest/dropdown.js";
    translationScript.defer = true;
    translationScript.onerror = () => {
      languageControl.setAttribute("data-translation-status", "unavailable");
      const notice = document.createElement("span");
      notice.className = "av-language-fallback";
      notice.textContent = "Translation unavailable right now";
      languageControl.appendChild(notice);
    };
    document.head.appendChild(translationScript);
  }

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
      if (window.innerWidth > 900) closeNavigation();
    });
  }

  // Lightweight desktop cursor: disabled automatically for touch devices and reduced motion.
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  if (!reducedMotion && finePointer) {
    const dot = document.createElement("span");
    const ring = document.createElement("span");

    dot.className = "cursor-dot";
    ring.className = "cursor-ring";
    document.body.append(dot, ring);

    let targetX = -100;
    let targetY = -100;
    let ringX = -100;
    let ringY = -100;
    let visible = false;
    let frameRequested = false;

    const render = () => {
      frameRequested = false;
      ringX += (targetX - ringX) * 0.16;
      ringY += (targetY - ringY) * 0.16;

      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

      if (Math.abs(targetX - ringX) > 0.2 || Math.abs(targetY - ringY) > 0.2) {
        requestAnimationFrame(render);
        frameRequested = true;
      }
    };

    document.addEventListener("pointermove", (event) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }

      if (!frameRequested) {
        requestAnimationFrame(render);
        frameRequested = true;
      }
    }, { passive: true });

    document.addEventListener("pointerleave", () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
      visible = false;
    });

    document.querySelectorAll("a, button, input, textarea, select").forEach((element) => {
      element.addEventListener("pointerenter", () => ring.classList.add("is-hovering"));
      element.addEventListener("pointerleave", () => ring.classList.remove("is-hovering"));
    });
  }
});
