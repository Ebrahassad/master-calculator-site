const languageButton = document.getElementById("languageButton");
const screenshots = document.getElementById("screenshots");

let language = localStorage.getItem("site-language") || "ar";

function updateLanguage() {

  const isArabic = language === "ar";

  document.documentElement.lang = language;
  document.documentElement.dir = isArabic ? "rtl" : "ltr";

  document.querySelectorAll("[data-ar][data-en]").forEach(element => {
    element.textContent = isArabic
      ? element.dataset.ar
      : element.dataset.en;
  });

  document.getElementById("privacy-ar")
    .classList.toggle("hidden", !isArabic);

  document.getElementById("privacy-en")
    .classList.toggle("hidden", isArabic);

  languageButton.textContent = isArabic ? "EN" : "AR";

  screenshots.innerHTML = "";

  const prefix = isArabic ? "a" : "e";

  for (let i = 1; i <= 6; i++) {

    const img = document.createElement("img");

    img.className = "screenshot";

    img.src = `assets/screens/${isArabic ? "ar" : "en"}/${prefix}_${i}.png`;

    img.alt = `Master Calculator ${prefix}_${i}`;

    img.loading = "lazy";

    img.onerror = () => {
      img.style.display = "none";
    };

    screenshots.appendChild(img);
  }
}

languageButton.addEventListener("click", () => {

  language = language === "ar" ? "en" : "ar";

  localStorage.setItem("site-language", language);

  updateLanguage();
});

updateLanguage();


/* ============================================================
   SCREENSHOT LANGUAGE SWITCHING
   ============================================================ */

(function () {
  function updateScreenshotLanguage(language) {
    document.querySelectorAll(".app-screen").forEach(function (image) {
      const source =
        language === "en"
          ? image.dataset.enSrc
          : image.dataset.arSrc;

      if (source) {
        image.src = source;
      }
    });

    document.querySelectorAll("[data-ar][data-en]").forEach(function (element) {
      element.textContent =
        language === "en"
          ? element.dataset.en
          : element.dataset.ar;
    });
  }

  window.updateScreenshotLanguage = updateScreenshotLanguage;

  const observer = new MutationObserver(function () {
    const language =
      document.documentElement.lang === "en" ? "en" : "ar";

    updateScreenshotLanguage(language);
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang", "dir"]
  });

  const initialLanguage =
    document.documentElement.lang === "en" ? "en" : "ar";

  updateScreenshotLanguage(initialLanguage);
})();
