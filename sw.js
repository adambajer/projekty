// sw.js (velmi jednoduchý PWA cache + push)
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open('v1').then(cache =>
      cache.addAll(['/', '/index.html', '/favicon.ico', '/site.webmanifest'])
    )
  );
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
// Notifikace - zpracování push
self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  event.waitUntil(
    self.registration.showNotification(data.title || 'Nová nabídka!', {
      body: data.body || '',
      icon: '/favicon-96x96.png',
      badge: '/favicon-96x96.png'
    })
  );
});
