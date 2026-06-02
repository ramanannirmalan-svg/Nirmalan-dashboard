// Minimal service worker — PWA install only, no caching
// App always loads fresh from network so Supabase sync works perfectly

self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    // Clear any old caches if they exist
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(k) { return caches.delete(k); }));
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// No fetch handler — all requests go straight to network
// This means: always fresh, always synced, Supabase works perfectly
