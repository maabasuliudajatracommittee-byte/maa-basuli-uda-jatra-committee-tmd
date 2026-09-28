/* Maa Basuli Uda Jatra Committee
   Common Website Language System
   English = default | Odia | Hindi
   Google Translate removed
*/

(function () {
  "use strict";

  const STORAGE_KEY = "maaBasuliLanguage";
  const SUPPORTED = ["en", "or", "hi"];

  function getLanguage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return SUPPORTED.includes(saved) ? saved : "en";
  }

  function updateButtons(lang) {
    document.querySelectorAll("[data-site-lang]").forEach(function (button) {
      const value = button.getAttribute("data-site-lang");
      const active = value === lang;

      button.classList.toggle("active", active);
      button.setAttribute(
        "aria-pressed",
        active ? "true" : "false"
      );
    });
  }

  function applyTranslations(lang) {

    document.querySelectorAll("[data-lang-en]").forEach(function (element) {

      const value =
        element.getAttribute("data-lang-" + lang);

      if (value !== null) {

        if (
          element.tagName === "INPUT" ||
          element.tagName === "TEXTAREA"
        ) {

          element.value = value;

        } else if (element.tagName === "IMG") {

          element.alt = value;

        } else {

          element.textContent = value;

        }
      }
    });


    document
      .querySelectorAll("[data-placeholder-en]")
      .forEach(function (element) {

        const value =
          element.getAttribute(
            "data-placeholder-" + lang
          );

        if (value !== null) {
          element.setAttribute(
            "placeholder",
            value
          );
        }

      });


    document.documentElement.setAttribute(
      "lang",
      lang
    );
  }


  window.setSiteLanguage = function (lang) {

    if (!SUPPORTED.includes(lang)) {
      lang = "en";
    }

    localStorage.setItem(
      STORAGE_KEY,
      lang
    );

    updateButtons(lang);
    applyTranslations(lang);
  };


  function addStyles() {

    if (
      document.getElementById(
        "maa-language-style"
      )
    ) {
      return;
    }

    const style =
      document.createElement("style");

    style.id =
      "maa-language-style";

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

    if (
      document.getElementById(
        "maa-language-switcher"
      )
    ) {
      return;
    }


    const box =
      document.createElement("div");

    box.id =
      "maa-language-switcher";

    box.setAttribute(
      "aria-label",
      "Website Language"
    );


    box.innerHTML = `

      <button
        type="button"
        data-site-lang="en"
        onclick="setSiteLanguage('en')"
      >
        🇬🇧 English
      </button>

      <button
        type="button"
        data-site-lang="or"
        onclick="setSiteLanguage('or')"
      >
        ଓଡ଼ିଆ
      </button>

      <button
        type="button"
        data-site-lang="hi"
        onclick="setSiteLanguage('hi')"
      >
        हिन्दी
      </button>

    `;


    const target =
      document.querySelector(
        "#language-switcher"
      ) ||
      document.querySelector(
        ".language-switcher"
      );


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


  function init() {

    addStyles();

    createSwitcher();

    const lang =
      getLanguage();

    document.documentElement.setAttribute(
      "lang",
      lang
    );

    updateButtons(lang);

    applyTranslations(lang);
  }


  if (
    document.readyState === "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      init
    );

  } else {

    init();

  }

})();
