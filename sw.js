const CACHE = "qa-studio-v121";
const PRECACHE_URLS = [
  "/qa-studio/",
  "/qa-studio/index.html",
  "/qa-studio/app.html",
  "/qa-studio/app.js",
  "/qa-studio/manifest.json",
  "/qa-studio/icon.svg",
  "/qa-studio/preview.png",
  "https://unpkg.com/lucide@1.16.0/dist/umd/lucide.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js",
  "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE_URLS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
