/* Стартовая страница: открыть сайт на языке посетителя. */
(function () {
  var L = ["ru", "uk", "cs", "en"], pick = null;
  try { var s = localStorage.getItem("dc_lang"); if (L.indexOf(s) > -1) pick = s; } catch (e) {}
  if (!pick) {
    var langs = navigator.languages || [navigator.language || ""];
    for (var i = 0; i < langs.length && !pick; i++) {
      var c = (langs[i] || "").slice(0, 2).toLowerCase();
      if (c === "sk") c = "cs";
      if (L.indexOf(c) > -1) pick = c;
    }
  }
  var base = document.documentElement.getAttribute("data-base") || "";
  location.replace(base + (pick || "ru") + "/index.html");
})();
