/* Maa Basuli Uda Jatra Committee
   Common Website Language System
   English = default | Odia | Hindi
*/
(function () {
  "use strict";

  const STORAGE_KEY = "maaBasuliLanguage";
  const COOKIE_KEY = "googtrans";

  function setCookie(name, value) {
    document.cookie =
      name + "=" + encodeURIComponent(value) +
      "; path=/; max-age=31536000; SameSite=Lax";
  }

  function getLanguage() {
    return localStorage.getItem(STORAGE_KEY) || "en";
  }

  function updateButtons(lang) {
    document.querySelectorAll("[data-site-lang]").forEach(function (button) {
      const value = button.getAttribute("data-site-lang");
      button.classList.toggle("active", value === lang);
      button.setAttribute("aria-pressed", value === lang ? "true" : "false");
    });
  }

  function applyGoogleLanguage(lang) {
    const target = lang === "or" ? "or" : lang === "hi" ? "hi" : "en";

    if (target === "en") {
      setCookie(COOKIE_KEY, "/en/en");
    } else {
      setCookie(COOKIE_KEY, "/en/" + target);
    }

    const select = document.querySelector(".goog-te-combo");
    if (select) {
      select.value = target;
      select.dispatchEvent(new Event("change"));
    }
  }

  window.setSiteLanguage = function (lang) {
    if (!["en", "or", "hi"].includes(lang)) lang = "en";

    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.setAttribute("lang", lang);

    updateButtons(lang);
    applyGoogleLanguage(lang);

    setTimeout(function () {
      applyGoogleLanguage(lang);
    }, 500);

    setTimeout(function () {
      applyGoogleLanguage(lang);
    }, 1500);
  };

  function addStyles() {
    if (document.getElementById("maa-language-style")) return;

    const style = document.createElement("style");
    style.id = "maa-language-style";
    style.textContent = `
      #maa-language-switcher{
        display:inline-flex;
        align-items:center;
        gap:4px;
        padding:4px;
        border-radius:9px;
        background:#fff;
        border:1px solid #ddd;
        box-shadow:0 2px 8px rgba(0,0,0,.10);
        z-index:999999;
      }
      #maa-language-switcher button{
        border:0;
        background:transparent;
        color:#333;
        cursor:pointer;
        font-weight:800;
        font-size:13px;
        line-height:1;
        padding:9px 10px;
        border-radius:7px;
        transition:.2s;
      }
      #maa-language-switcher button.active{
        background:#8b0000;
        color:#fff;
      }
      #maa-language-switcher button:hover{
        background:#f1e5e5;
      }
      #maa-language-switcher button.active:hover{
        background:#a41414;
      }

      .goog-te-banner-frame,
      .goog-te-balloon-frame{
        display:none !important;
      }
      body{
        top:0 !important;
      }
      .goog-tooltip{
        display:none !important;
      }

      @media(max-width:600px){
        #maa-language-switcher button{
          font-size:12px;
          padding:8px 8px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function createSwitcher() {
    if (document.getElementById("maa-language-switcher")) return;

    const box = document.createElement("div");
    box.id = "maa-language-switcher";
    box.setAttribute("aria-label", "Website Language");

    box.innerHTML = `
      <button type="button" data-site-lang="en" onclick="setSiteLanguage('en')">🇬🇧 English</button>
      <button type="button" data-site-lang="or" onclick="setSiteLanguage('or')">ଓଡ଼ିଆ</button>
      <button type="button" data-site-lang="hi" onclick="setSiteLanguage('hi')">हिन्दी</button>
    `;

    /*
      If the page has an existing element with id/class intended for language
      controls, place the switcher there. Otherwise use a fixed top-right position.
    */
    const target =
      document.querySelector("#language-switcher") ||
      document.querySelector(".language-switcher");

    if (target) {
      target.appendChild(box);
      return;
    }

    box.style.position = "fixed";
    box.style.top = "12px";
    box.style.right = "12px";
    box.style.zIndex = "999999";
    document.body.appendChild(box);
  }

  function loadGoogleTranslate() {
    if (document.getElementById("google-translate-script")) return;

    window.googleTranslateElementInit = function () {
      if (
        window.google &&
        google.translate &&
        google.translate.TranslateElement
      ) {
        new google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,or,hi",
            autoDisplay: false
          },
          "google_translate_element"
        );

        setTimeout(function () {
          applyGoogleLanguage(getLanguage());
        }, 300);
      }
    };

    const holder = document.createElement("div");
    holder.id = "google_translate_element";
    holder.style.display = "none";
    document.body.appendChild(holder);

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.head.appendChild(script);
  }

  function init() {
    addStyles();
    createSwitcher();
    loadGoogleTranslate();

    const lang = getLanguage();
    document.documentElement.setAttribute("lang", lang);
    updateButtons(lang);

    /*
      If Google Translate is already available, apply immediately.
      Otherwise loadGoogleTranslate() will apply it after initialization.
    */
    setTimeout(function () {
      applyGoogleLanguage(lang);
    }, 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
