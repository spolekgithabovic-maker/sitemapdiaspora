/* Выполняется до отрисовки: режим «Проще читать» и защита от встраивания сайта в чужие страницы. */
(function () {
  var d = document.documentElement;
  d.classList.remove("no-js");
  try { if (sessionStorage.getItem("dc_easy") === "1") d.classList.add("easy"); } catch (e) {}
  if (window.top !== window.self) {
    try { window.top.location.replace(window.self.location.href); }
    catch (e) { d.classList.add("framed"); }
  }
})();
