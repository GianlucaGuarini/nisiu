/* global importScripts workbox */

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js')

workbox.routing.registerRoute(
  /.*(?:firebase)\.io.*$/,
  workbox.strategies.cacheFirst({
    cacheName: 'api-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
      }),
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  }),
)

workbox.routing.registerRoute(
  /.*(?:googleapis|gstatic)\.com.*$/,
  workbox.strategies.staleWhileRevalidate(),
)

workbox.precaching.precacheAndRoute([])
