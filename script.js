document.addEventListener("DOMContentLoaded", () => {
  const main=document.querySelector("main");
  if(main && !main.id) main.id="main-content";
  if(main && !document.querySelector(".skip-to-content")){
    const skip=document.createElement("a"); skip.className="skip-to-content"; skip.href="#main-content"; skip.textContent="Skip to content"; document.body.prepend(skip);
  }
  document.querySelectorAll('a[href^="http"]').forEach((link)=>{
    if(link.origin !== window.location.origin) link.rel="noopener";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  if (!document.querySelector('link[rel="icon"]')) {
    const icon=document.createElement("link"); icon.rel="icon"; icon.href="/images/favicon.svg"; icon.type="image/svg+xml"; document.head.appendChild(icon);
  }
  if (!document.querySelector('link[rel="apple-touch-icon"]')) {
    const apple=document.createElement("link"); apple.rel="apple-touch-icon"; apple.href="/images/og-default.png"; document.head.appendChild(apple);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector("[data-menu-button]");
  const navigation = document.querySelector("[data-navigation]");
  const closeNavigation = () => {
    if (!navigation || !menuButton) return;
    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  };
  if (!menuButton || !navigation) return;
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
});


// Centralized mailbox switching: update contact-config.js only when mailboxes change.
document.addEventListener("DOMContentLoaded", () => {
  const c = { general: "avenqoravortax@gmail.com", editorial: "avenqoravortax.editor@gmail.com" };
  document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
    const current = link.getAttribute("href");
    if (current === "mailto:avenqoravortax@gmail.com" && c.general) { link.href = "mailto:" + c.general; link.textContent = c.general; }
    if (current === "mailto:avenqoravortax.editor@gmail.com" && c.editorial) { link.href = "mailto:" + c.editorial; link.textContent = c.editorial; }
  });
});
