(function () {

  const languageButton =
    document.getElementById("languageButton");

  let language =
    localStorage.getItem("masterCalculatorLanguage") || "ar";


  function applyLanguage() {

    const isEnglish =
      language === "en";

    document.documentElement.lang =
      isEnglish ? "en" : "ar";

    document.documentElement.dir =
      isEnglish ? "ltr" : "rtl";


    document.querySelectorAll(
      "[data-ar][data-en]"
    ).forEach(function (element) {

      element.textContent =
        isEnglish
          ? element.dataset.en
          : element.dataset.ar;

    });


    document.querySelectorAll(
      ".app-screen"
    ).forEach(function (image) {

      const source =
        isEnglish
          ? image.dataset.enSrc
          : image.dataset.arSrc;

      if (source) {
        image.src = source;
      }

    });


    if (languageButton) {

      languageButton.textContent =
        isEnglish ? "AR" : "EN";

    }


    localStorage.setItem(
      "masterCalculatorLanguage",
      language
    );

  }


  if (languageButton) {

    languageButton.addEventListener(
      "click",
      function () {

        language =
          language === "ar"
            ? "en"
            : "ar";

        applyLanguage();

      }
    );

  }


  applyLanguage();

})();
