// QA Studio service worker.
// - Same-origin GET requests only (never touches POSTs to the AI proxy).
// - Libraries and fonts in /vendor/ are versioned by file name -> cache first.
// - Everything else -> network first (so updates show up), cache as offline fallback.
// - The CI workflow replaces the version below with the commit id on every deploy.
const CACHE = "qa-studio-v126";

// Relative to this file, so it works at /qa-studio/ and on localhost alike.
const PRECACHE = [
  "./",
  "index.html",
  "app.html",
  "app.js",
  "landing.js",
  "manifest.json",
  "icon.svg",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
  "icons/apple-touch-icon.png",
  "vendor/lucide-1.16.0.min.js",
  "vendor/chart-4.4.7.umd.js",
  "vendor/xlsx-0.18.5.full.min.js",
  "vendor/inter.css",
  "vendor/fonts/inter-latin-wght-normal.woff2",
  "vendor/fonts/inter-latin-ext-wght-normal.woff2",
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // One missing file must not stop the whole install (cache.addAll is all-or-nothing).
    const results = await Promise.allSettled(
      PRECACHE.map((url) => cache.add(new Request(url, { cache: "reload" })))
    );
    results.forEach((r, i) => {
      if (r.status === "rejected") console.warn("[sw] could not precache", PRECACHE[i]);
    });
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys.filter((k) => k.startsWith("qa-studio-") && k !== CACHE).map((k) => caches.delete(k))
    );
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(url.pathname.includes("/vendor/") ? cacheFirst(req) : networkFirst(req));
});

async function store(req, res) {
  if (res && res.ok && res.type === "basic") {
    const copy = res.clone();
    const cache = await caches.open(CACHE);
    await cache.put(req, copy);
  }
  return res;
}

async function cacheFirst(req) {
  const hit = await caches.match(req);
  if (hit) return hit;
  return store(req, await fetch(req));
}

async function networkFirst(req) {
  try {
    // "no-cache" = revalidate with the server, so the browser's HTTP cache cannot serve stale code
    return await store(req, await fetch(req, { cache: "no-cache" }));
  } catch (err) {
    const hit = await caches.match(req, { ignoreSearch: true });
    if (hit) return hit;
    if (req.mode === "navigate") {
      const page = new URL(req.url).pathname.endsWith("app.html") ? "app.html" : "index.html";
      const fallback = (await caches.match(page)) || (await caches.match("app.html"));
      if (fallback) return fallback;
    }
    throw err;
  }
}
