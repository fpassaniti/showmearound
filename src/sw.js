import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

import {CacheableResponsePlugin} from 'workbox-cacheable-response';
import {CacheFirst} from 'workbox-strategies';
import {ExpirationPlugin} from 'workbox-expiration';

cleanupOutdatedCaches()

precacheAndRoute(self.__WB_MANIFEST)

registerRoute(
  ({ url }) => url.pathname.startsWith('/api/v2'),
  new StaleWhileRevalidate({
    cacheName: 'ods-requests',
  }),
);

registerRoute(
  ({request}) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 600,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
);