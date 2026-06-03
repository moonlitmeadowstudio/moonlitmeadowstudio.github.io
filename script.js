(function () {
  const languageStorageKey = "developer-site-language";
  const themeStorageKey = "developer-site-theme";
  const supported = ["ru", "en"];
  const themes = {
    domik: {
      logo: "assets/logo.png",
      name: "Moonlit Meadow Studio"
    },
    intima: {
      logo: "assets/intima/logo.png",
      name: "Moonlit Meadow Studio"
    }
  };
  const saved = localStorage.getItem(languageStorageKey);
  const initial = supported.includes(saved) ? saved : "ru";
  const pageTheme = document.body.getAttribute("data-page-app");
  const savedTheme = localStorage.getItem(themeStorageKey);
  const initialTheme = pageTheme && themes[pageTheme] ? pageTheme : (themes[savedTheme] ? savedTheme : "domik");

  function setLanguage(lang) {
    const next = supported.includes(lang) ? lang : "ru";
    document.documentElement.lang = next;
    localStorage.setItem(languageStorageKey, next);

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

  function setTheme(theme) {
    const next = themes[theme] ? theme : "domik";
    const config = themes[next];
    localStorage.setItem(themeStorageKey, next);
    document.documentElement.classList.toggle("theme-intima", next === "intima");
    document.documentElement.classList.toggle("theme-domik", next === "domik");
    document.documentElement.style.backgroundColor = next === "intima" ? "#09050a" : "#fbfff4";
    document.documentElement.style.colorScheme = next === "intima" ? "dark" : "light";
    document.body.classList.toggle("theme-intima", next === "intima");
    document.body.classList.toggle("theme-domik", next === "domik");

    document.querySelectorAll(".brand img").forEach((image) => {
      image.setAttribute("src", config.logo);
      image.setAttribute("alt", `${config.name} app icon`);
    });

    document.querySelectorAll(".brand span").forEach((label) => {
      label.textContent = config.name;
    });

    document.querySelectorAll('link[rel="icon"]').forEach((icon) => {
      icon.setAttribute("href", config.logo);
    });

    document.querySelectorAll("[data-theme-choice]").forEach((node) => {
      node.classList.toggle("is-selected", node.getAttribute("data-theme-choice") === next);
    });

    document.querySelectorAll("[data-preview-app]").forEach((node) => {
      const app = node.getAttribute("data-preview-app");
      node.style.order = app === next ? "1" : "2";
    });

    document.querySelectorAll(".screens-strip").forEach((strip) => {
      window.requestAnimationFrame(() => {
        strip.scrollTo({ left: 0, behavior: "smooth" });
      });
    });
  }

  function leaveTo(url) {
    window.location.href = url;
  }

  document.querySelectorAll("[data-theme-choice]").forEach((card) => {
    card.addEventListener("click", (event) => {
      const theme = card.getAttribute("data-theme-choice");
      const link = event.target.closest("a");
      if (link) {
        setTheme(theme);
        return;
      }

      setTheme(theme);
    });

    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      event.preventDefault();
      setTheme(card.getAttribute("data-theme-choice"));
    });
  });

  document.querySelectorAll("[data-theme-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const theme = link.getAttribute("data-theme-link");
      setTheme(theme);

      if (link.href && !link.href.includes("#")) {
        event.preventDefault();
        leaveTo(link.href);
      }
    });
  });

  document.querySelectorAll(".nav-links a, .brand, .button").forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || link.hasAttribute("data-theme-link")) {
        return;
      }

      const target = new URL(href, window.location.href);
      if (target.origin === window.location.origin && target.pathname !== window.location.pathname) {
        event.preventDefault();
        leaveTo(target.href);
      }
    });
  });

  document.querySelectorAll("[data-lang-button]").forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.getAttribute("data-lang-button")));
  });

  setTheme(initialTheme);
  setLanguage(initial);
  document.body.classList.add("is-ready");
})();
