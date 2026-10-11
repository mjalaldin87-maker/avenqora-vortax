document.addEventListener("DOMContentLoaded", () => {
  // Site-wide translation helper. It opens Google's website-translation view
  // for the current URL, so it also works for future pages using this shared script.
  // This avoids embedding a third-party free widget whose terms may restrict commercial use.
  const navigationForLanguage = document.querySelector("[data-navigation]");
  if (navigationForLanguage && !navigationForLanguage.querySelector(".av-language-control")) {
    const translationLanguages = [
      ["en", "English"], ["ar", "Arabic"], ["bg", "Bulgarian"],
      ["zh-CN", "Chinese (Simplified)"], ["zh-TW", "Chinese (Traditional)"],
      ["hr", "Croatian"], ["cs", "Czech"], ["da", "Danish"], ["nl", "Dutch"],
      ["fi", "Finnish"], ["fr", "French"], ["de", "German"], ["el", "Greek"],
      ["hi", "Hindi"], ["it", "Italian"], ["ja", "Japanese"], ["ko", "Korean"],
      ["no", "Norwegian"], ["pl", "Polish"], ["pt", "Portuguese"], ["ro", "Romanian"],
      ["ru", "Russian"], ["es", "Spanish"], ["sv", "Swedish"], ["ca", "Catalan"],
      ["tl", "Filipino"], ["iw", "Hebrew"], ["id", "Indonesian"], ["lv", "Latvian"],
      ["lt", "Lithuanian"], ["sr", "Serbian"], ["sk", "Slovak"], ["sl", "Slovenian"],
      ["uk", "Ukrainian"], ["vi", "Vietnamese"], ["sq", "Albanian"], ["et", "Estonian"],
      ["gl", "Galician"], ["hu", "Hungarian"], ["mt", "Maltese"], ["th", "Thai"],
      ["tr", "Turkish"], ["fa", "Persian"], ["af", "Afrikaans"], ["ms", "Malay"],
      ["sw", "Swahili"], ["ga", "Irish"], ["cy", "Welsh"], ["be", "Belarusian"],
      ["is", "Icelandic"], ["mk", "Macedonian"], ["yi", "Yiddish"], ["hy", "Armenian"],
      ["az", "Azerbaijani"], ["eu", "Basque"], ["ka", "Georgian"], ["ht", "Haitian Creole"],
      ["ur", "Urdu"], ["bn", "Bengali"], ["bs", "Bosnian"], ["ceb", "Cebuano"],
      ["eo", "Esperanto"], ["gu", "Gujarati"], ["ha", "Hausa"], ["hmn", "Hmong"],
      ["ig", "Igbo"], ["jw", "Javanese"], ["kn", "Kannada"], ["km", "Khmer"],
      ["lo", "Lao"], ["la", "Latin"], ["mi", "Maori"], ["mr", "Marathi"],
      ["mn", "Mongolian"], ["ne", "Nepali"], ["pa", "Punjabi"], ["so", "Somali"],
      ["ta", "Tamil"], ["te", "Telugu"], ["yo", "Yoruba"], ["zu", "Zulu"],
      ["my", "Myanmar (Burmese)"], ["ny", "Chichewa"], ["kk", "Kazakh"],
      ["mg", "Malagasy"], ["ml", "Malayalam"], ["si", "Sinhala"], ["st", "Sesotho"],
      ["su", "Sundanese"], ["tg", "Tajik"], ["uz", "Uzbek"], ["am", "Amharic"],
      ["co", "Corsican"], ["haw", "Hawaiian"], ["ku", "Kurdish (Kurmanji)"],
      ["ky", "Kyrgyz"], ["lb", "Luxembourgish"], ["ps", "Pashto"], ["sm", "Samoan"],
      ["gd", "Scottish Gaelic"], ["sn", "Shona"], ["sd", "Sindhi"],
      ["fy", "Frisian"], ["xh", "Xhosa"]
    ];

    const languageControl = document.createElement("div");
    languageControl.className = "av-language-control";
    const label = document.createElement("label");
    label.className = "av-language-label";
    label.htmlFor = "av-language-select";
    label.textContent = "Translate";
    const select = document.createElement("select");
    select.id = "av-language-select";
    select.setAttribute("aria-label", "Translate this page into");
    const prompt = document.createElement("option");
    prompt.value = "";
    prompt.textContent = "Choose language";
    select.appendChild(prompt);

    translationLanguages.forEach(([code, name]) => {
      const option = document.createElement("option");
      option.value = code;
      option.textContent = name;
      select.appendChild(option);
    });

    select.addEventListener("change", () => {
      const language = select.value;
      if (!language || language === "en") {
        select.value = "";
        return;
      }
      const translatedUrl = new URL("https://translate.google.com/translate");
      translatedUrl.searchParams.set("sl", "en");
      translatedUrl.searchParams.set("tl", language);
      translatedUrl.searchParams.set("u", window.location.href);
      const destination = translatedUrl.toString();
      const opened = window.open(destination, "_blank", "noopener,noreferrer");
      if (!opened) window.location.assign(destination);
      select.value = "";
    });

    languageControl.append(label, select);
    navigationForLanguage.appendChild(languageControl);
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
