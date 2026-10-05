/* Diaspora Care z.s. — офлайн-режим. При изменении файлов сайта увеличьте номер версии. */
const VERSION = "dc-v5-6";
const FILES = [
 "./",
 "./assets/app.js",
 "./assets/boot.js",
 "./assets/content.js",
 "./assets/docs/Stanovy_Diaspora_Care_zs.pdf",
 "./assets/fonts/inter-400.woff",
 "./assets/fonts/inter-600.woff",
 "./assets/fonts/inter-700.woff",
 "./assets/fonts/lora-italic.woff",
 "./assets/fonts/lora.woff",
 "./assets/i18n.js",
 "./assets/img/banner.jpg",
 "./assets/img/icon-180.png",
 "./assets/img/icon-192.png",
 "./assets/img/icon-512.png",
 "./assets/img/logo.jpg",
 "./assets/root.js",
 "./assets/style.css",
 "./cs/index.html",
 "./en/index.html",
 "./index.html",
 "./manifest.webmanifest",
 "./ru/index.html",
 "./uk/index.html"
];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if(req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  if(req.mode === "navigate"){
    e.respondWith(fetch(req).then(r => { if(r.ok && r.type === "basic"){ const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); } return r; })
      .catch(() => caches.match(req).then(r => r || caches.match("./index.html"))));
    return;
  }
  e.respondWith(caches.match(req, {ignoreSearch: true}).then(r => r || fetch(req).then(res => { if(res.ok && res.type === "basic"){ const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); } return res; })));
});
