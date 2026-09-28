/* =====================================================
   Maa Basuli Uda Jatra Committee
   COMMON WEBSITE LANGUAGE SYSTEM

   English = Default
   Odia
   Hindi

   Google Translate = NOT USED
   ===================================================== */

(function () {

  "use strict";

  const STORAGE_KEY = "maaBasuliLanguage";

  const SUPPORTED_LANGUAGES = [
    "en",
    "or",
    "hi"
  ];


  /* =====================================================
     GET SAVED LANGUAGE
     ===================================================== */

  function getLanguage() {

    const saved =
      localStorage.getItem(STORAGE_KEY);

    if (
      SUPPORTED_LANGUAGES.includes(saved)
    ) {
      return saved;
    }

    return "en";
  }


  /* =====================================================
     UPDATE LANGUAGE BUTTONS
     ===================================================== */

  function updateButtons(lang) {

    document
      .querySelectorAll("[data-site-lang]")
      .forEach(function (button) {

        const value =
          button.getAttribute("data-site-lang");

        const active =
          value === lang;

        button.classList.toggle(
          "active",
          active
        );

        button.setAttribute(
          "aria-pressed",
          active ? "true" : "false"
        );

      });

  }


  /* =====================================================
     APPLY TRANSLATIONS
     ===================================================== */

  function applyTranslations(lang) {

    document
      .querySelectorAll("[data-lang-en]")
      .forEach(function (element) {

        const translatedText =
          element.getAttribute(
            "data-lang-" + lang
          );

        if (
          translatedText === null
        ) {
          return;
        }


        /* INPUT / TEXTAREA */

        if (
          element.tagName === "INPUT" ||
          element.tagName === "TEXTAREA"
        ) {

          element.value =
            translatedText;

          return;
        }


        /* IMAGE ALT */

        if (
          element.tagName === "IMG"
        ) {

          element.alt =
            translatedText;

          return;
        }


        /* NORMAL TEXT */

        element.textContent =
          translatedText;

      });


    /* =================================================
       PLACEHOLDERS
       ================================================= */

    document
      .querySelectorAll("[data-placeholder-en]")
      .forEach(function (element) {

        const placeholder =
          element.getAttribute(
            "data-placeholder-" + lang
          );

        if (
          placeholder !== null
        ) {

          element.setAttribute(
            "placeholder",
            placeholder
          );

        }

      });


    /* HTML LANGUAGE */

    document.documentElement
      .setAttribute(
        "lang",
        lang
      );

  }


  /* =====================================================
     PUBLIC LANGUAGE FUNCTION
     ===================================================== */

  window.setSiteLanguage =
    function (lang) {

      if (
        !SUPPORTED_LANGUAGES.includes(lang)
      ) {

        lang = "en";

      }


      /* SAVE LANGUAGE */

      localStorage.setItem(
        STORAGE_KEY,
        lang
      );


      /* UPDATE BUTTON */

      updateButtons(lang);


      /* TRANSLATE PAGE */

      applyTranslations(lang);

    };


  /* =====================================================
     LANGUAGE SWITCHER CSS
     ===================================================== */

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

      /* LANGUAGE BOX */

      #maa-language-switcher{

        display:inline-flex;

        align-items:center;

        gap:4px;

        padding:4px;

        border-radius:9px;

        background:#ffffff;

        border:1px solid #dddddd;

        box-shadow:
          0 2px 8px rgba(0,0,0,.10);

        z-index:999999;

      }


      /* LANGUAGE BUTTON */

      #maa-language-switcher button{

        border:0;

        background:transparent;

        color:#333333;

        cursor:pointer;

        font-weight:800;

        font-size:13px;

        line-height:1;

        padding:9px 10px;

        border-radius:7px;

        transition:.2s;

      }


      /* ACTIVE LANGUAGE */

      #maa-language-switcher
      button.active{

        background:#8b0000;

        color:#ffffff;

      }


      /* HOVER */

      #maa-language-switcher
      button:hover{

        background:#f1e5e5;

      }


      #maa-language-switcher
      button.active:hover{

        background:#a41414;

      }


      /* MOBILE */

      @media(max-width:600px){

        #maa-language-switcher{

          gap:2px;

          padding:3px;

        }

        #maa-language-switcher
        button{

          font-size:12px;

          padding:8px 8px;

        }

      }

    `;


    document.head.appendChild(
      style
    );

  }


  /* =====================================================
     CREATE LANGUAGE SWITCHER
     ===================================================== */

  function createSwitcher() {

    /* Already exists */

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


    /* =================================================
       FIND PAGE LANGUAGE CONTAINER
       ================================================= */

    const target =
      document.querySelector(
        "#language-switcher"
      ) ||
      document.querySelector(
        ".language-switcher"
      );


    /* =================================================
       IF CONTAINER EXISTS
       ================================================= */

    if (target) {

      target.appendChild(box);

      return;

    }


    /* =================================================
       FALLBACK
       ================================================= */

    box.style.position =
      "fixed";

    box.style.top =
      "12px";

    box.style.right =
      "12px";

    box.style.zIndex =
      "999999";


    document.body.appendChild(
      box
    );

  }


  /* =====================================================
     INITIALIZE
     ===================================================== */

  function init() {

    /* CSS */

    addStyles();


    /* LANGUAGE BUTTON */

    createSwitcher();


    /* SAVED LANGUAGE */

    const lang =
      getLanguage();


    /* HTML LANG */

    document.documentElement
      .setAttribute(
        "lang",
        lang
      );


    /* ACTIVE BUTTON */

    updateButtons(lang);


    /* TRANSLATE */

    applyTranslations(lang);

  }


  /* =====================================================
     PAGE READY
     ===================================================== */

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
