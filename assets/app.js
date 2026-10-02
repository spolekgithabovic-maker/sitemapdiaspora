/* Diaspora Care z.s. — v5 */
(function(){
"use strict";
const LANG = document.documentElement.lang in window.T ? document.documentElement.lang : "ru";
const L = window.T[LANG];
const ORG = window.ORG || {};
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const isEasy = () => document.documentElement.classList.contains("easy");
const SPEECH = { ru:"ru", uk:"uk", cs:"cs", en:"en" };

/* ---------- Язык ---------- */
try{ localStorage.setItem("dc_lang", LANG); }catch(e){}
$$(".langs a").forEach(a => a.addEventListener("click", () => {
  try{ localStorage.setItem("dc_lang", a.getAttribute("hreflang")); }catch(e){}
  if(location.hash) a.href = a.getAttribute("href").split("#")[0] + location.hash;
}));

/* ---------- Режим «Проще читать» ---------- */
const easyBtn = $("#easyBtn");
function syncEasy(){
  const on = isEasy();
  easyBtn.setAttribute("aria-pressed", String(on));
  const label = on ? L.easy_off : L.easy_on;
  easyBtn.setAttribute("aria-label", label); easyBtn.title = label;
}
easyBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("easy");
  try{ sessionStorage.setItem("dc_easy", isEasy() ? "1" : "0"); }catch(e){}
  syncEasy(); requestAnimationFrame(layoutStory);
});
syncEasy();

/* ---------- Меню и шапка ---------- */
const header = $("header.site"), menuToggle = $("#menuToggle"), mainNav = $("#mainNav");
function closeMenu(){ mainNav.classList.remove("open"); menuToggle.setAttribute("aria-expanded","false"); }
menuToggle.addEventListener("click", () => menuToggle.setAttribute("aria-expanded", String(mainNav.classList.toggle("open"))));
$$("a", mainNav).forEach(a => a.addEventListener("click", closeMenu));
document.addEventListener("click", e => { if(!header.contains(e.target)) closeMenu(); });

/* ---------- Реквизиты, e-mail, политика ---------- */
function orgRows(){
  const pend = '<dd class="pending">'+esc(L.org_pending)+'</dd>';
  return [
    [L.org_name_l, '<dd>'+esc(ORG.name)+'</dd>'],
    [L.org_seat_l, '<dd>'+esc(L.contact_city)+'</dd>'],
    [L.org_ico_l, ORG.ico ? '<dd>'+esc(ORG.ico)+'</dd>' : pend],
    [L.org_reg_l, ORG.registered ? '<dd>'+esc(ORG.registered)+'</dd>' : pend],
    [L.org_email_l, '<dd><a href="mailto:'+esc(ORG.email)+'">'+esc(ORG.email)+'</a></dd>']
  ].map(r => '<div><dt>'+esc(r[0])+'</dt>'+r[1]+'</div>').join("");
}
$("#orgList").innerHTML = orgRows();
$("#footOrg").innerHTML = orgRows();
$$(".js-email").forEach(el => el.textContent = ORG.email);
$$(".js-mail").forEach(el => el.href = "mailto:" + ORG.email);
$("#privacyBody").innerHTML = window.POLICY[LANG]
  .replace(/\{ICO\}/g, ORG.ico ? esc(ORG.ico) : esc(L.org_pending))
  .replace(/\{EMAIL\}/g, '<a href="mailto:'+esc(ORG.email)+'">'+esc(ORG.email)+'</a>');

/* ---------- Фото основателей ---------- */
const PH = window.PHOTOS || {};
const NAME_KEY = {tereza:"c1_name", hanna:"c2_name", tana:"c3_name"};
Object.keys(PH).forEach(p => {
  if(!PH[p]) return;
  const slot = $('.story-avatar[data-person="'+p+'"]'); if(!slot) return;
  const img = new Image(); img.src = "../assets/img/" + PH[p]; img.alt = L[NAME_KEY[p]]; img.loading = "lazy";
  img.onload = () => { slot.innerHTML = ""; slot.appendChild(img); };
});

/* ---------- Живая акварель ---------- */
(function wash(){
  const cv = $("#wash"); if(!cv || reduce) return;
  const ctx = cv.getContext("2d"); if(!ctx) return;
  const blobs = [
    {x:.10,y:.12,r:.50,c:"255,126,31",a:.30,s:.00021,p:0,d:.06},
    {x:.24,y:.30,r:.32,c:"243,162,77",a:.26,s:.00029,p:2,d:.10},
    {x:.90,y:.86,r:.55,c:"47,102,219",a:.20,s:.00018,p:4,d:.05},
    {x:.72,y:1.0,r:.38,c:"53,104,176",a:.20,s:.00025,p:1,d:.08},
    {x:.52,y:.46,r:.26,c:"255,190,140",a:.14,s:.00033,p:3,d:.12},
    {x:.95,y:.12,r:.22,c:"120,170,240",a:.12,s:.00027,p:5,d:.09}
  ];
  let w=0, h=0, run=false, mx=0, my=0, tx=0, ty=0, last=0;
  function size(){ const r = cv.getBoundingClientRect(), dpr = Math.min(1.5, devicePixelRatio||1); w = Math.max(1, r.width*dpr*.5); h = Math.max(1, r.height*dpr*.5); cv.width = w; cv.height = h; }
  function frame(t){
    if(!run) return;
    requestAnimationFrame(frame);
    if(t - last < 33) return; last = t;
    mx += (tx-mx)*.05; my += (ty-my)*.05;
    ctx.clearRect(0,0,w,h);
    const m = Math.max(w,h);
    for(const b of blobs){
      const x = (b.x + Math.sin(t*b.s + b.p)*.05 + mx*b.d) * w;
      const y = (b.y + Math.cos(t*b.s*1.3 + b.p)*.05 + my*b.d) * h;
      const r = b.r * m * (1 + Math.sin(t*b.s*2 + b.p)*.06);
      const g = ctx.createRadialGradient(x,y,0,x,y,r);
      g.addColorStop(0,"rgba("+b.c+","+b.a+")"); g.addColorStop(.55,"rgba("+b.c+","+(b.a*.35)+")"); g.addColorStop(1,"rgba("+b.c+",0)");
      ctx.fillStyle = g; ctx.fillRect(0,0,w,h);
    }
  }
  function start(){ if(!run && !isEasy()){ run = true; requestAnimationFrame(frame); } }
  function stop(){ run = false; }
  size(); addEventListener("resize", size);
  addEventListener("pointermove", e => { tx = e.clientX/innerWidth - .5; ty = e.clientY/innerHeight - .5; }, {passive:true});
  addEventListener("deviceorientation", e => { if(e.gamma == null) return; tx = Math.max(-.5, Math.min(.5, e.gamma/60)); ty = Math.max(-.5, Math.min(.5, (e.beta-40)/80)); }, {passive:true});
  new IntersectionObserver(es => es[0].isIntersecting ? start() : stop()).observe(cv);
  document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());
})();

/* ---------- Появление при прокрутке ---------- */
if("IntersectionObserver" in window && !reduce){
  const io = new IntersectionObserver(es => es.forEach(en => { if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); } }), {rootMargin:"0px 0px -8% 0px"});
  $$(".reveal").forEach(el => io.observe(el));
} else $$(".reveal").forEach(el => el.classList.add("in"));

/* ---------- Линия истории ---------- */
const bubbles = $("#bubbles"), sp = $("#storyPath");
let pathLen = 0;
function layoutStory(){
  if(!bubbles || !sp) return;
  const box = bubbles.getBoundingClientRect();
  const pts = $$(".story-avatar, .next-you .slot", bubbles).map(el => {
    const r = el.getBoundingClientRect(); return [r.left - box.left + r.width/2, r.top - box.top + r.height/2];
  });
  if(pts.length < 2) return;
  let d = "M"+pts[0][0]+" "+pts[0][1];
  for(let i=1;i<pts.length;i++){
    const [x0,y0] = pts[i-1], [x1,y1] = pts[i], dy = (y1-y0)/2;
    d += " C"+x0+" "+(y0+dy)+" "+x1+" "+(y1-dy)+" "+x1+" "+y1;
  }
  sp.setAttribute("viewBox", "0 0 "+box.width+" "+box.height);
  $$("path", sp).forEach(p => p.setAttribute("d", d));
  const draw = $(".draw", sp); pathLen = draw.getTotalLength();
  draw.style.strokeDasharray = pathLen; progressStory();
}
function progressStory(){
  if(!pathLen) return;
  const r = bubbles.getBoundingClientRect();
  let p = (innerHeight*.7 - r.top) / r.height;
  if(reduce || isEasy()) p = 1;
  p = Math.max(0, Math.min(1, p));
  $(".draw", sp).style.strokeDashoffset = pathLen * (1-p);
}
addEventListener("scroll", () => { header.classList.toggle("scrolled", scrollY > 8); progressStory(); }, {passive:true});
addEventListener("resize", layoutStory);
addEventListener("load", layoutStory);
if(document.fonts) document.fonts.ready.then(layoutStory);
setTimeout(layoutStory, 300);

/* ---------- Плавное раскрытие направлений ---------- */
$$("details.service-group").forEach(d => {
  const summary = $("summary", d), body = $(".group-body", d);
  let anim = null;
  summary.addEventListener("click", e => {
    if(reduce || isEasy() || !body.animate) return;
    e.preventDefault();
    if(anim) anim.cancel();
    if(!d.open){
      d.open = true;
      anim = body.animate([{height:"0px",opacity:0},{height:body.scrollHeight+"px",opacity:1}], {duration:320, easing:"cubic-bezier(.2,.7,.3,1)"});
      anim.onfinish = () => { anim = null; layoutStory(); };
    } else {
      anim = body.animate([{height:body.scrollHeight+"px",opacity:1},{height:"0px",opacity:0}], {duration:240, easing:"ease-in"});
      anim.onfinish = () => { d.open = false; anim = null; layoutStory(); };
    }
  });
});

/* ---------- Озвучка ---------- */
const synth = window.speechSynthesis;
let voices = [];
const hasVoice = code => voices.some(v => (v.lang||"").toLowerCase().replace("_","-").startsWith(code));
const voiceFor = code => voices.find(v => (v.lang||"").toLowerCase().replace("_","-").startsWith(code));
let speakingBtn = null;
function stopSpeak(){ if(synth) synth.cancel(); if(speakingBtn){ speakingBtn.classList.remove("playing"); speakingBtn = null; } }
function speak(text, code, btn, rate){
  if(!synth) return;
  if(speakingBtn === btn){ stopSpeak(); return; }
  stopSpeak();
  const u = new SpeechSynthesisUtterance(text);
  const v = voiceFor(code); if(v) u.voice = v;
  u.lang = v ? v.lang : code; u.rate = rate || 1;
  u.onend = u.onerror = () => { if(speakingBtn === btn) stopSpeak(); };
  speakingBtn = btn; if(btn) btn.classList.add("playing");
  synth.speak(u);
}
const SPK = '<svg viewBox="0 0 24 24"><path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/></svg>';
function sectionText(sec){
  return $$("h2,h3,h4,p,li,.tag,.handoff,.badge,dt,dd", sec)
    .filter(el => el.offsetParent !== null && !el.closest("form,.listen,.tabs,.bigphrase") && !el.querySelector("h2,h3,h4,p,li"))
    .map(el => el.textContent.trim()).filter(Boolean).join(". ");
}
function addListenButtons(){
  if(!synth || !hasVoice(SPEECH[LANG])) return;
  $$("main section").forEach(sec => {
    const head = $(".section-head", sec); if(!head || $(".listen", head)) return;
    const b = document.createElement("button");
    b.type = "button"; b.className = "listen"; b.innerHTML = SPK + "<span>"+esc(L.listen)+"</span>";
    b.addEventListener("click", () => speak(sectionText(sec), SPEECH[LANG], b, isEasy() ? .9 : 1));
    head.appendChild(b);
  });
}
function onVoices(){
  voices = synth ? synth.getVoices() : [];
  if(!voices.length) return;
  addListenButtons();
  const czOk = hasVoice("cs");
  $("#phNoVoice").hidden = czOk;
  document.body.classList.toggle("no-cz-voice", !czOk);
  $$(".js-play").forEach(b => b.hidden = !czOk);
  $("#bigPlay").hidden = !czOk;
}
if(synth){ onVoices(); synth.addEventListener ? synth.addEventListener("voiceschanged", onVoices) : (synth.onvoiceschanged = onVoices); }
else { $("#phNoVoice").hidden = false; $("#bigPlay").hidden = true; }

/* ---------- Разговорник ---------- */
const CATS = ["basic","office","doctor","school","home","work"];
const TR_IDX = {ru:2, uk:3, cs:3, en:4};
const PHR = window.PHRASES;
const phTabs = $("#phTabs"), phGrid = $("#phGrid");
let curCat = "basic";
function phraseCard(p){
  const czOk = voices.length ? hasVoice("cs") : !!synth;
  return '<div class="phrase"><div><p class="cz" lang="cs">'+esc(p[1])+'</p><p class="tr">'+esc(p[TR_IDX[LANG]])+'</p></div>'+
    '<div class="ph-btns"><button type="button" class="icon-btn js-play" data-cz="'+esc(p[1])+'" aria-label="'+esc(L.ph_play)+'" title="'+esc(L.ph_play)+'"'+(czOk?'':' hidden')+'>'+SPK+'</button>'+
    '<button type="button" class="icon-btn js-big" data-cz="'+esc(p[1])+'" data-tr="'+esc(p[TR_IDX[LANG]])+'" aria-label="'+esc(L.ph_show)+'" title="'+esc(L.ph_show)+'"><svg viewBox="0 0 24 24"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg></button></div></div>';
}
function renderPhrases(){
  phTabs.innerHTML = CATS.map(c => '<button type="button" role="tab" class="tab" aria-selected="'+(c===curCat)+'" data-cat="'+c+'">'+esc(L["ph_c_"+c])+'</button>').join("");
  phGrid.innerHTML = PHR.filter(p => p[0] === curCat).map(phraseCard).join("");
}
phTabs.addEventListener("click", e => { const b = e.target.closest(".tab"); if(!b) return; curCat = b.dataset.cat; renderPhrases(); });
phTabs.addEventListener("keydown", e => {
  if(!["ArrowRight","ArrowLeft"].includes(e.key)) return;
  const i = CATS.indexOf(curCat) + (e.key === "ArrowRight" ? 1 : -1);
  curCat = CATS[(i + CATS.length) % CATS.length]; renderPhrases(); $('.tab[aria-selected="true"]', phTabs).focus();
});
renderPhrases();
const big = $("#bigPhrase");
document.addEventListener("click", e => {
  const play = e.target.closest(".js-play"); if(play){ speak(play.dataset.cz, "cs", play, .85); return; }
  const bg = e.target.closest(".js-big");
  if(bg){ $("#bigCz").textContent = bg.dataset.cz; $("#bigTr").textContent = bg.dataset.tr; big.classList.add("open"); document.body.style.overflow = "hidden"; $("#bigClose").focus(); }
});
$("#bigPlay").addEventListener("click", e => speak($("#bigCz").textContent, "cs", e.currentTarget, .8));
function closeBig(){ big.classList.remove("open"); document.body.style.overflow = ""; stopSpeak(); }
$("#bigClose").addEventListener("click", closeBig);

/* ---------- Навигатор «С чего начать?» ---------- */
const TOPICS = [
  {k:"t_docs", item:"g1_i1", cat:"office", ic:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>'},
  {k:"t_translate", item:"g1_i2", cat:"basic", ic:'<path d="M4 5h8M8 3v2M6 5c0 4 3 7 6 8M10 5c0 3-3 7-6 8"/><path d="m13 21 4-9 4 9M14.5 18h5"/>'},
  {k:"t_legal", item:"g1_i3", cat:"office", ic:'<path d="M12 3v18M5 21h14M6 7h12"/><path d="m6 7-3 6a3 3 0 0 0 6 0zM18 7l-3 6a3 3 0 0 0 6 0z"/>'},
  {k:"t_housing", item:"g2_i1", cat:"home", ic:'<path d="M4 11 12 4l8 7"/><path d="M6 9.5V20h12V9.5"/><path d="M10 20v-5h4v5"/>'},
  {k:"t_work", item:"g2_i2", cat:"work", ic:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/>'},
  {k:"t_soul", item:"g3_i1", cat:null, ic:'<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z"/>'},
  {k:"t_treat", item:"g3_i2", cat:"doctor", ic:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>'},
  {k:"t_school", item:"g4_i1", cat:"school", ic:'<path d="M3 9.5 12 5l9 4.5-9 4.5z"/><path d="M7 11.5v4c1.5 1.5 3 2 5 2s3.5-.5 5-2v-4"/>'},
  {k:"t_czech", item:"g5_i1", cat:"basic", ic:'<path d="M5 5h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-6l-4 3.5V15H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"/>'},
  {k:"t_people", item:"g5_i2", cat:null, ic:'<circle cx="9" cy="8" r="3.2"/><circle cx="16.5" cy="9" r="2.6"/><path d="M3.5 19c.6-3.4 3-5.4 5.5-5.4s4.9 2 5.5 5.4"/><path d="M14.5 14.2c2.6-.5 5.2 1 5.9 4.8"/>'}
];
const TIMES = ["a2_new","a2_year","a2_long","a2_helper"];
const LANGHELP = ["a3_yes","a3_some","a3_no"];
const nav = {step:0, topics:new Set(), time:null, lang:null, err:false};
const navEl = $("#navigator");
const svgI = p => '<svg viewBox="0 0 24 24">'+p+'</svg>';
function progress(n){ return '<div class="nav-progress"><div class="nav-dots">'+[0,1,2].map(i => '<i class="'+(i<=n?'on':'')+'"></i>').join("")+'</div><span>'+esc(L.step_of.replace("{n}", n+1))+'</span></div>'; }
function renderNav(focus){
  let h = "";
  if(nav.step === 0){
    h = progress(0)+'<div class="nav-step"><h3>'+esc(L.q1)+'</h3><p class="hint">'+esc(L.q1_hint)+'</p><div class="chips">'+
      TOPICS.map(t => '<button type="button" class="chip" data-topic="'+t.k+'" aria-pressed="'+nav.topics.has(t.k)+'"><span class="ci">'+svgI(t.ic)+'</span>'+esc(L[t.k])+'</button>').join("")+
      '</div>'+(nav.err?'<p class="nav-error" role="alert">'+esc(L.plan_empty)+'</p>':'')+'</div><div class="nav-actions"><span></span><button type="button" class="btn btn-primary" data-go="1">'+esc(L.next)+svgI('<path d="M5 12h14M13 6l6 6-6 6"/>')+'</button></div>';
  } else if(nav.step === 1 || nav.step === 2){
    const opts = nav.step === 1 ? TIMES : LANGHELP, field = nav.step === 1 ? "time" : "lang";
    h = progress(nav.step)+'<div class="nav-step"><h3 id="nq">'+esc(L[nav.step===1?"q2":"q3"])+'</h3><div class="chips" role="radiogroup" aria-labelledby="nq">'+
      opts.map(o => '<button type="button" class="chip" role="radio" data-'+field+'="'+o+'" aria-checked="'+(nav[field]===o)+'">'+esc(L[o])+'</button>').join("")+
      '</div></div><div class="nav-actions"><button type="button" class="btn btn-ghost" data-go="'+(nav.step-1)+'">'+esc(L.back)+'</button>'+
      '<button type="button" class="btn btn-primary" data-go="'+(nav.step===1?2:3)+'">'+esc(nav.step===1?L.next:L.show_plan)+svgI('<path d="M5 12h14M13 6l6 6-6 6"/>')+'</button></div>';
  } else {
    const sel = TOPICS.filter(t => nav.topics.has(t.k));
    const intro = {a2_new:"plan_intro_new", a2_year:"plan_intro_year", a2_long:"plan_intro_long", a2_helper:"plan_intro_helper"}[nav.time] || "plan_intro_year";
    const cats = []; sel.forEach(t => { if(t.cat && !cats.includes(t.cat)) cats.push(t.cat); });
    if(!cats.length) cats.push("basic");
    let phr = []; cats.forEach(c => phr = phr.concat(PHR.filter(p => p[0]===c).slice(0, cats.length>2?1:2)));
    phr = phr.slice(0,4);
    const needLang = nav.lang && nav.lang !== "a3_no";
    let n = 1;
    h = '<div class="plan"><h3>'+esc(L.plan_title)+'</h3><p class="plan-intro">'+esc(L[intro])+'</p>'+
      '<div class="plan-block"><h4><span class="num">'+(n++)+'</span>'+esc(L.plan_topics)+'</h4><div class="plan-items">'+
      sel.map(t => '<div class="item"><h4>'+esc(L[t.item+"_t"])+'</h4><p>'+esc(L[t.item+"_d"])+'</p></div>').join("")+'</div>'+
      (needLang ? '<p class="plan-note">'+svgI('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>')+'<span>'+esc(L.plan_lang)+'</span></p>' : '')+'</div>'+
      '<div class="plan-block"><h4><span class="num">'+(n++)+'</span>'+esc(L.plan_phrases)+'</h4><div class="plan-phrases">'+
      phr.map(p => '<div class="pp"><div><b lang="cs">'+esc(p[1])+'</b><span>'+esc(p[TR_IDX[LANG]])+'</span></div><button type="button" class="icon-btn js-play" data-cz="'+esc(p[1])+'" aria-label="'+esc(L.ph_play)+'"'+(voices.length && !hasVoice("cs")?' hidden':'')+'>'+SPK+'</button></div>').join("")+'</div></div>'+
      '<div class="plan-block"><h4><span class="num">'+(n++)+'</span>'+esc(L.plan_next)+'</h4><p>'+esc(L.plan_next_d)+'</p></div>'+
      '<div class="nav-actions"><button type="button" class="btn btn-ghost" data-restart>'+esc(L.restart)+'</button><div class="cta-row">'+
      '<button type="button" class="btn btn-ghost" data-print>'+svgI('<path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="7"/>')+esc(L.plan_print)+'</button>'+
      '<button type="button" class="btn btn-primary" data-send>'+esc(L.plan_send)+svgI('<path d="M5 12h14M13 6l6 6-6 6"/>')+'</button></div></div></div>';
  }
  navEl.innerHTML = h;
  if(focus){ const f = $("h3", navEl); if(f){ f.tabIndex = -1; f.focus({preventScroll:true}); } navEl.scrollIntoView({behavior: reduce?"auto":"smooth", block:"start"}); }
}
navEl.addEventListener("click", e => {
  const b = e.target.closest("button"); if(!b) return;
  if(b.dataset.topic){ const k = b.dataset.topic; nav.topics.has(k) ? nav.topics.delete(k) : nav.topics.add(k); nav.err = false; b.setAttribute("aria-pressed", String(nav.topics.has(k))); const er = $(".nav-error", navEl); if(er) er.remove(); return; }
  if(b.dataset.time){ nav.time = b.dataset.time; renderNav(); return; }
  if(b.dataset.lang){ nav.lang = b.dataset.lang; renderNav(); return; }
  if(b.dataset.go != null){
    const to = +b.dataset.go;
    if(nav.step === 0 && to === 1 && !nav.topics.size){ nav.err = true; renderNav(); return; }
    nav.step = to; renderNav(true); return;
  }
  if(b.hasAttribute("data-restart")){ nav.step = 0; nav.topics.clear(); nav.time = nav.lang = null; renderNav(true); return; }
  if(b.hasAttribute("data-print")){ document.body.classList.add("print-plan"); window.print(); return; }
  if(b.hasAttribute("data-send")){
    const sel = TOPICS.filter(t => nav.topics.has(t.k)).map(t => L[t.k]).join(", ");
    const msg = L.plan_msg_intro+"\n\n"+L.plan_msg_topics+": "+sel+"\n"+(nav.time?L.plan_msg_time+": "+L[nav.time]+"\n":"")+(nav.lang?L.plan_msg_lang+": "+L[nav.lang]+"\n":"")+"\n";
    goToMessage(msg, true);
  }
});
addEventListener("afterprint", () => document.body.classList.remove("print-plan"));
renderNav();

function goToMessage(text, replace){
  const m = $("#fMsg");
  if(replace || !m.value.trim()) m.value = text;
  $("#contact").scrollIntoView({behavior: reduce?"auto":"smooth"});
  const f = $("#fMsgField"); f.classList.remove("flash"); void f.offsetWidth; f.classList.add("flash");
  setTimeout(() => { m.focus({preventScroll:true}); m.setSelectionRange(m.value.length, m.value.length); }, reduce?0:700);
}
$("#partnerBtn").addEventListener("click", e => { e.preventDefault(); goToMessage(L.prefill_partner+"\n\n"); });

/* ---------- Волонтёры ---------- */
const volBtn = $("#volBtn"), volWrap = $("#volFormWrap");
function openVol(scroll){
  volWrap.classList.add("open"); volBtn.setAttribute("aria-expanded","true");
  if(scroll) setTimeout(() => { volWrap.scrollIntoView({behavior: reduce?"auto":"smooth", block:"start"}); $("#vName").focus({preventScroll:true}); }, 50);
}
volBtn.addEventListener("click", () => volWrap.classList.contains("open") ? (volWrap.classList.remove("open"), volBtn.setAttribute("aria-expanded","false")) : openVol(true));
$$("[data-open-vol]").forEach(a => a.addEventListener("click", () => openVol(false)));

/* ---------- Встречи ---------- */
function fmtDate(d, opts){ try{ return new Intl.DateTimeFormat(LANG === "uk" ? "uk-UA" : LANG, opts).format(d); }catch(e){ return d.toDateString(); } }
function pad(n){ return String(n).padStart(2,"0"); }
function icsFor(ev){
  const [y,mo,da] = ev.date.split("-").map(Number); const [hh,mm] = (ev.time||"10:00").split(":").map(Number);
  const s = new Date(y, mo-1, da, hh, mm), e = new Date(s.getTime() + (ev.duration||90)*60000);
  const f = d => d.getFullYear()+pad(d.getMonth()+1)+pad(d.getDate())+"T"+pad(d.getHours())+pad(d.getMinutes())+"00";
  const clean = s => String(s||"").replace(/[\\,;]/g, m => "\\"+m).replace(/\n/g,"\\n");
  return ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Diaspora Care z.s.//CS","BEGIN:VEVENT","UID:"+ev.date+"-"+Math.random().toString(36).slice(2)+"@diasporacare","DTSTAMP:"+f(new Date()),
    "DTSTART;TZID=Europe/Prague:"+f(s),"DTEND;TZID=Europe/Prague:"+f(e),"SUMMARY:"+clean(ev.title&&ev.title[LANG]),"LOCATION:"+clean(ev.place&&ev.place[LANG]),
    "DESCRIPTION:"+clean(ev.text&&ev.text[LANG]),"END:VEVENT","END:VCALENDAR"].join("\r\n");
}
(function renderEvents(){
  const box = $("#eventList");
  const today = new Date(); today.setHours(0,0,0,0);
  const list = (window.EVENTS||[]).filter(ev => ev && ev.date && new Date(ev.date+"T23:59") >= today).sort((a,b) => a.date.localeCompare(b.date));
  if(!list.length){
    box.innerHTML = '<div class="empty-state">'+svgI('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4M12 14v3M10.5 15.5h3"/>')+'<p>'+esc(L.events_empty)+'</p><a class="btn btn-ghost btn-sm" href="#contact">'+esc(L.nav_contact)+'</a></div>';
    return;
  }
  box.innerHTML = '<div class="event-list">'+list.map((ev,i) => {
    const d = new Date(ev.date+"T12:00");
    return '<article class="event"><div class="ev-date"><b>'+d.getDate()+'</b><span>'+esc(fmtDate(d,{month:"short"}))+'</span></div><div>'+
      '<h3>'+esc(ev.title&&ev.title[LANG])+'</h3><div class="ev-meta"><span>'+esc(fmtDate(d,{weekday:"long"}))+(ev.time?' · '+esc(ev.time):'')+'</span>'+
      (ev.place&&ev.place[LANG]?'<span>'+esc(L.ev_where)+': '+esc(ev.place[LANG])+'</span>':'')+'</div>'+
      (ev.text&&ev.text[LANG]?'<p>'+esc(ev.text[LANG])+'</p>':'')+
      '<button type="button" class="btn btn-ghost btn-sm" data-ics="'+i+'">'+svgI('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>')+esc(L.ev_add)+'</button></div></article>';
  }).join("")+'</div>';
  box.addEventListener("click", e => {
    const b = e.target.closest("[data-ics]"); if(!b) return;
    const ev = list[+b.dataset.ics];
    const url = URL.createObjectURL(new Blob([icsFor(ev)], {type:"text/calendar"}));
    const a = document.createElement("a"); a.href = url; a.download = "diaspora-care-"+ev.date+".ics"; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  });
})();

/* ---------- Пожертвования ---------- */
(function donate(){
  const D = window.DONATE || {};
  if(D.url){ const b = $("#donateBtn"); b.href = D.url; b.hidden = false; $("#donateNote").hidden = true; }
  if(D.goal > 0){
    const nf = new Intl.NumberFormat(LANG === "uk" ? "uk-UA" : LANG);
    $("#goalBox").hidden = false;
    $("#goalTitle").textContent = (D.title && D.title[LANG]) || "";
    $("#goalRaised").textContent = L.don_raised + ": " + nf.format(D.raised||0) + " Kč";
    $("#goalOf").textContent = L.don_of + " " + nf.format(D.goal) + " Kč";
    const pct = Math.max(0, Math.min(100, (D.raised||0) / D.goal * 100));
    new IntersectionObserver((es, o) => { if(es[0].isIntersecting){ $("#goalFill").style.width = pct + "%"; o.disconnect(); } }).observe($("#goalBox"));
  }
})();

/* ---------- Новости ---------- */
(function news(){
  const N = window.NEWS || [];
  if(!N.length){ $("#news").hidden = true; return; }
  if(!N.some(n => n.example)) $("#newsNote").hidden = true;
  const IC = {news:'<path d="M4 5h13v14H6a2 2 0 0 1-2-2z"/><path d="M17 9h3v8a2 2 0 0 1-2 2"/><path d="M8 9h5M8 13h5"/>',
    hands:'<path d="m11 17 2 2a1.4 1.4 0 0 0 2-2"/><path d="m14 14 2.5 2.5a1.4 1.4 0 0 0 2-2l-3.8-3.8a3 3 0 0 0-4.2 0l-.9.9a1.4 1.4 0 0 1-2-2l2.8-2.8a5 5 0 0 1 6-.8l.5.3a3 3 0 0 0 2 .4H21"/><path d="M3 3 2 14l6.5 6.5a1.4 1.4 0 0 0 2-2"/>',
    people:'<circle cx="9" cy="8" r="3.2"/><circle cx="16.5" cy="9" r="2.6"/><path d="M3.5 19c.6-3.4 3-5.4 5.5-5.4s4.9 2 5.5 5.4"/><path d="M14.5 14.2c2.6-.5 5.2 1 5.9 4.8"/>'};
  $("#newsGrid").innerHTML = N.map(n => '<article class="news-card reveal in"><div class="news-thumb" aria-hidden="true">'+svgI(IC[n.icon]||IC.news)+'</div><div class="news-body">'+
    (n.example?'<span class="news-tag">'+esc(L.news_tag)+'</span>':(n.date?'<span class="news-tag">'+esc(fmtDate(new Date(n.date+"T12:00"),{day:"numeric",month:"long",year:"numeric"}))+'</span>':''))+
    '<h3>'+esc(n.title&&n.title[LANG])+'</h3><p>'+esc(n.text&&n.text[LANG])+'</p></div></article>').join("");
})();

/* ---------- Политика: окно ---------- */
const modal = $("#privacyModal"); let lastFocus = null;
function openModal(){ lastFocus = document.activeElement; modal.classList.add("open"); modal.setAttribute("aria-hidden","false"); document.body.style.overflow = "hidden"; $("#privacyClose").focus(); }
function closeModal(){ modal.classList.remove("open"); modal.setAttribute("aria-hidden","true"); document.body.style.overflow = ""; if(lastFocus) lastFocus.focus(); }
$$("[data-privacy]").forEach(b => b.addEventListener("click", openModal));
$("#privacyClose").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if(e.target === modal) closeModal(); });
document.addEventListener("keydown", e => {
  if(e.key === "Escape"){ if(modal.classList.contains("open")) closeModal(); if(big.classList.contains("open")) closeBig(); closeMenu(); stopSpeak(); }
  if(e.key === "Tab" && modal.classList.contains("open")){
    const f = $$("button, a[href]", modal), first = f[0], last = f[f.length-1];
    if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
  }
});

/* ---------- Формы → FormSubmit ---------- */
function wireForm(form, statusEl, btn, build, check, okKey){
  const setStatus = (k, t) => { statusEl.className = "form-status " + k; statusEl.textContent = t; };
  form.addEventListener("submit", async e => {
    e.preventDefault();
    if(form.elements["_honey"].value) return;
    if(!form.checkValidity()){ setStatus("err", L.f_invalid); form.reportValidity(); return; }
    const extra = check && check(); if(extra){ setStatus("err", extra); return; }
    const span = $("span", btn); btn.disabled = true; span.textContent = L.f_sending;
    try{
      const res = await fetch(window.FORM_ENDPOINT, {method:"POST", headers:{"Content-Type":"application/json","Accept":"application/json"},
        body: JSON.stringify(Object.assign(build(), {language:LANG.toUpperCase(), _template:"table", _captcha:"false", _honey:""}))});
      const data = await res.json().catch(() => ({}));
      if(res.ok && String(data.success) !== "false"){ setStatus("ok", L[okKey]); form.reset(); }
      else throw new Error("send");
    }catch(err){ setStatus("err", L.f_err.replace("{EMAIL}", ORG.email)); }
    finally{ btn.disabled = false; span.textContent = btn.id === "vSubmit" ? L.vf_submit : L.f_submit; }
  });
}
const cf = $("#contactForm");
wireForm(cf, $("#formStatus"), $("#fSubmit"), () => ({
  name: cf.elements["name"].value.trim(), email: cf.elements["email"].value.trim(), message: cf.elements["message"].value.trim(),
  _subject: "Diaspora Care — " + L.f_subject + " (" + LANG.toUpperCase() + ")", _replyto: cf.elements["email"].value.trim()
}), null, "f_ok");
const vf = $("#volForm");
const checked = (name, useKey) => $$('input[name="'+name+'"]:checked', vf).map(i => useKey ? L[i.dataset.key] : i.value);
wireForm(vf, $("#volStatus"), $("#vSubmit"), () => ({
  name: vf.elements["name"].value.trim(), email: vf.elements["email"].value.trim(),
  languages: checked("langs").concat(vf.elements["langs_other"].value.trim() ? [vf.elements["langs_other"].value.trim()] : []).join(", "),
  help: checked("ways", true).join("; "), time: checked("time", true).join(", "),
  message: vf.elements["message"].value.trim(),
  _subject: "Diaspora Care — " + L.vf_subject + " (" + LANG.toUpperCase() + ")", _replyto: vf.elements["email"].value.trim()
}), () => checked("ways").length ? null : L.vf_pick, "vf_ok");

/* ---------- Офлайн и установка ---------- */
if("serviceWorker" in navigator && /^https?:$/.test(location.protocol)){
  addEventListener("load", () => navigator.serviceWorker.register("../sw.js", {scope:"../"}).catch(() => {}));
}
let deferred = null;
addEventListener("beforeinstallprompt", e => { e.preventDefault(); deferred = e; $("#installBtn").hidden = false; });
$("#installBtn").addEventListener("click", async () => { if(!deferred) return; deferred.prompt(); await deferred.userChoice.catch(() => {}); deferred = null; $("#installBtn").hidden = true; });
})();
