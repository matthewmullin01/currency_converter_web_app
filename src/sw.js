// add other static data here
var urlsToPrefetch = ['/'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open('cache-v1')
      .then(cache => {
        return cache.addAll(urlsToPrefetch);
      })
      .then(_ => {
        console.log('[SW]: Installed');
      })
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches
      .match(event.request)
      .then(cached => {
        // Get from network eitehr way as to ensure data will update with fresh

        var networked = fetch(event.request)
          .then(async res => {
            try {
              (await caches.open('requests')).put(event.request, res.clone());
              console.log('[SW]: Updated in cache');
            } catch (error) {
              console.warn('[SW]', error);
            }
          })
          .catch(error => {
            console.warn('[SW]', error);
          });

        if (cached) {
          console.log('[SW]: Fetched from cache', event.request.url);
        } else {
          console.log('[SW]: Fetched from network', event.request.url);
        }
        return cached || networked;
      })
      .catch(error => {
        console.warn('[SW]', error);
      })
  );
});
