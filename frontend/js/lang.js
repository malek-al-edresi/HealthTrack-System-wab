fetch("frontend/js/translations.json")
  .then(res => res.json())
  .then(trans => {
    const selector = document.getElementById("languageSelector");
    if (!selector) return;

    // default language
    const defaultLang = "en";
    selector.value = defaultLang;
    applyLanguage(defaultLang, trans);

    selector.addEventListener("change", () => {
      applyLanguage(selector.value, trans);
    });
  })
  .catch(err => {
    console.error("Error loading translations:", err);
  });

function applyLanguage(lang, trans) {
  if (!trans[lang]) return;

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (trans[lang][key]) {
      el.textContent = trans[lang][key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (trans[lang][key]) {
      el.setAttribute("placeholder", trans[lang][key]);
    }
  });
}
