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
        "en","ur","ar","hi","pa","bn","zh-CN","zh-TW","es","fr","de","pt","ru","ja","ko",
        "it","nl","tr","vi","id","ms","th","fa","he","uk","pl","ro","el","sv","no","da",
        "fi","cs","sk","hu","bg","sr","hr","sl","lt","lv","et","is","ga","cy","eu","ca",
        "gl","af","sq","am","hy","az","be","bs","my","km","lo","ka","kk","ky","uz","tg",
        "mn","ne","si","ta","te","ml","kn","gu","mr","or","as","ps","sd","yi","sw","so",
        "ha","ig","yo","zu","xh","st","sn","ny","rw","mg","mi","sm","to","fj","haw","ceb",
        "jv","su","tl","eo","la","ht","lb","mk","mt","gd","ku","ckb","ug","tt","ba","cv"
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
