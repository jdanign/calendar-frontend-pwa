import {
    cleanupOutdatedCaches,
    createHandlerBoundToURL,
    precacheAndRoute,
} from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';
import { NavigationRoute, registerRoute } from 'workbox-routing';
  

cleanupOutdatedCaches();

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST);

// to allow work offline
registerRoute(
  new NavigationRoute(createHandlerBoundToURL('index.html'), {
    denylist: [/^\/backoffice/],
  })
);

self.skipWaiting();

clientsClaim();


/** Evento de instalación del Service Worker. */
self.addEventListener('install', async event => {
  // Aquí lo que se quiere llevar al cache
  const cache = await caches.open('cache-1');
  await cache.addAll([
    'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    '/vite.svg',
  ]);
});



/** Array con las URLs para interceptar el fetch. */
const apiOfflineFallbacks = [
  'http://localhost:4000/api/auth/renew',
  'http://localhost:4000/api/events',
];


/** Cualquier consulta a un servidor pasa por aquí. */
self.addEventListener('fetch', event =>{
  // Network first with cache fallback
  if (!apiOfflineFallbacks.includes(event.request.url)) return;

  const resp = fetch(event.request)
  .then(response =>{
    if (response){
      // Guarda en caché la respuesta. Si existe la instancia, la sobrescribe
      caches.open('cache-dynamic').then(cache => 
        cache.put(event.request, response)
      );

      return response.clone();
    }
    // Si la respuesta del servidor no existe
    else
      return caches.match(event.request);
  }).catch(err =>{
    console.error('Offline response');
    return caches.match(event.request);
  });

  event.respondWith(resp);
});