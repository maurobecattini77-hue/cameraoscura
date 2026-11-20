// Camera oscura: il libro resta sul telefono e si apre anche senza internet
const CACHE = "camera-oscura-778450f1af";
const FILE = ["./", "index.html", "manifest.webmanifest", "icona-192.png", "icona-512.png", "icona-maskable-512.png", "apple-touch-icon.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILE)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(n => n !== CACHE).map(n => caches.delete(n)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request).then(n => {
    if (n.ok) { const c = n.clone(); caches.open(CACHE).then(k => k.put(e.request, c)); }
    return n;
  })));
});
