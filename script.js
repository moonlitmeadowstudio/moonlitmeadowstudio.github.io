(function () {
  const storageKey = "developer-site-language";
  const supported = ["ru", "en"];
  const saved = localStorage.getItem(storageKey);
  const initial = supported.includes(saved) ? saved : "ru";

  function setLanguage(lang) {
    const next = supported.includes(lang) ? lang : "ru";
    document.documentElement.lang = next;
    localStorage.setItem(storageKey, next);

    document.querySelectorAll("[data-i18n-ru]").forEach((node) => {
      const value = node.getAttribute(`data-i18n-${next}`);
      if (value !== null) {
        node.textContent = value;
      }
    });

    document.querySelectorAll("[data-i18n-alt-ru]").forEach((node) => {
      const value = node.getAttribute(`data-i18n-alt-${next}`);
      if (value !== null) {
        node.setAttribute("alt", value);
      }
    });

    document.querySelectorAll("[data-lang-panel]").forEach((node) => {
      node.classList.toggle("active", node.getAttribute("data-lang-panel") === next);
    });

    document.querySelectorAll("[data-lang-button]").forEach((button) => {
      button.classList.toggle("active", button.getAttribute("data-lang-button") === next);
    });
  }

  document.querySelectorAll("[data-lang-button]").forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.getAttribute("data-lang-button")));
  });

  setLanguage(initial);
})();
