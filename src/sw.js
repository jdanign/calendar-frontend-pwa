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

self.addEventListener('install', async (event) => {
  const cache = await caches.open('cache-1');
  await cache.addAll([
    // Aquí lo que se quiere llevar al cache
  ]);
});