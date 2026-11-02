/* Diaspora Care z.s. — согласие на cookies + Google Analytics 4 (только после согласия) + конверсии.
   GA ID меняется здесь. Выбор посетителя хранится в localStorage ("dc_consent": "granted" | "denied"). */
(function(){
  "use strict";
  var GA_ID = "G-X804Y5WMHD";
  var KEY = "dc_consent";
  var lang = (document.documentElement.lang || "cs").slice(0, 2);

  var T = {
    ru: {
      title: "Файлы cookies",
      text: "Мы хотим понимать, сколько людей приходит на сайт и что им полезно. Для этого, только с вашего согласия, используем Google Analytics (статистические cookies). Без согласия сайт работает так же.",
      accept: "Согласен", reject: "Только необходимые", more: "Подробнее", settings: "Настройки cookies"
    },
    uk: {
      title: "Файли cookies",
      text: "Ми хочемо розуміти, скільки людей заходить на сайт і що їм корисно. Для цього, лише з вашої згоди, використовуємо Google Analytics (статистичні cookies). Без згоди сайт працює так само.",
      accept: "Погоджуюсь", reject: "Лише необхідні", more: "Детальніше", settings: "Налаштування cookies"
    },
    cs: {
      title: "Soubory cookies",
      text: "Chceme vědět, kolik lidí web navštěvuje a co jim pomáhá. K tomu používáme, jen s vaším souhlasem, Google Analytics (statistické cookies). Bez souhlasu web funguje stejně.",
      accept: "Souhlasím", reject: "Jen nezbytné", more: "Více informací", settings: "Nastavení cookies"
    },
    en: {
      title: "Cookies",
      text: "We want to know how many people visit the site and what helps them. For this, only with your consent, we use Google Analytics (statistics cookies). Without consent the site works the same.",
      accept: "Accept", reject: "Necessary only", more: "Learn more", settings: "Cookie settings"
    }
  };
  var L = T[lang] || T.cs;

  function get(){ try{ return localStorage.getItem(KEY); }catch(e){ return null; } }
  function set(v){ try{ localStorage.setItem(KEY, v); }catch(e){} }

  /* ---------- Google Analytics ---------- */
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.dcTrack = function(){};
  var loaded = false;

  function loadGA(){
    if(loaded) return; loaded = true;
    gtag("consent", "default", {
      ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
      analytics_storage: "granted"
    });
    gtag("js", new Date());
    gtag("config", GA_ID, { allow_google_signals: false, allow_ad_personalization_signals: false });
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
    window.dcTrack = function(name, params){ gtag("event", name, params || {}); };
  }

  function clearGA(){
    /* при отказе — удаляем cookies Google Analytics на этом домене */
    var host = location.hostname.replace(/^www\./, "");
    document.cookie.split(";").forEach(function(c){
      var n = c.split("=")[0].trim();
      if(/^_ga/.test(n)){
        ["", "; domain=" + host, "; domain=." + host].forEach(function(d){
          document.cookie = n + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/" + d;
        });
      }
    });
  }

  /* ---------- Баннер ---------- */
  var banner = null;
  function el(tag, cls, txt){ var e = document.createElement(tag); if(cls) e.className = cls; if(txt) e.textContent = txt; return e; }

  function showBanner(){
    if(banner){ banner.hidden = false; return; }
    banner = el("div", "cc-banner");
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-live", "polite");
    banner.setAttribute("aria-label", L.title);
    var box = el("div", "cc-box");
    box.appendChild(el("p", "cc-title", L.title));
    var p = el("p", "cc-text", L.text + " ");
    var more = el("button", "cc-more", L.more);
    more.type = "button";
    more.addEventListener("click", function(){
      var b = document.querySelector("[data-privacy]");
      if(b) b.click();
    });
    p.appendChild(more);
    box.appendChild(p);
    var btns = el("div", "cc-btns");
    var no = el("button", "btn btn-ghost btn-sm", L.reject); no.type = "button";
    var yes = el("button", "btn btn-primary btn-sm", L.accept); yes.type = "button";
    no.addEventListener("click", function(){ set("denied"); clearGA(); banner.hidden = true; });
    yes.addEventListener("click", function(){ set("granted"); banner.hidden = true; loadGA(); });
    btns.appendChild(no); btns.appendChild(yes);
    box.appendChild(btns);
    banner.appendChild(box);
    document.body.appendChild(banner);
  }

  /* Кнопка «Настройки cookies» в подвале */
  function addFooterLink(){
    var links = document.querySelector(".foot-links");
    if(!links) return;
    var b = el("button", "", L.settings); b.type = "button";
    b.addEventListener("click", showBanner);
    links.appendChild(b);
  }

  /* ---------- Конверсии ---------- */
  var FORM_EVENTS = { f_ok: "contact_form_submit", vf_ok: "volunteer_form_submit", fb_ok: "feedback_submit" };
  window.addEventListener("dc:conv", function(e){
    var name = FORM_EVENTS[e.detail] || "form_submit";
    window.dcTrack(name, { form: e.detail });
    window.dcTrack("generate_lead", { form: name });
  });
  document.addEventListener("click", function(e){
    var a = e.target.closest ? e.target.closest("a, button") : null;
    if(!a) return;
    if(a.id === "donateBtn") window.dcTrack("donate_click", { method: "online" });
    else if(a.classList.contains("bank-copy")) window.dcTrack("donate_bank_copy", {});
    else if((a.getAttribute("href") || "").indexOf("mailto:") === 0) window.dcTrack("email_click", {});
    else if((a.getAttribute("href") || "").indexOf("tel:") === 0) window.dcTrack("phone_click", {});
  }, true);

  /* ---------- Старт ---------- */
  function init(){
    addFooterLink();
    var c = get();
    if(c === "granted") loadGA();
    else if(c !== "denied") showBanner();
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
