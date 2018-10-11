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

workbox.precaching.precacheAndRoute([
  {
    "url": "assets/css/form.css",
    "revision": "d4538dad51fbdae93b356abef8ba7359"
  },
  {
    "url": "assets/css/icons.css",
    "revision": "edee98a741ff69ff82c3d5063109d726"
  },
  {
    "url": "assets/css/style.css",
    "revision": "55a639b11de5c8a4ca2657c9139fabb0"
  },
  {
    "url": "assets/favicon/android-chrome-192x192.png",
    "revision": "8e881000484eeb17cc44be2ef3c30060"
  },
  {
    "url": "assets/favicon/android-chrome-512x512.png",
    "revision": "4dee7dab8e271d5e3fc70998a0a672c6"
  },
  {
    "url": "assets/favicon/apple-touch-icon.png",
    "revision": "43d187d421adb9ec5d9a2fc0fc860e1c"
  },
  {
    "url": "assets/favicon/favicon-16x16.png",
    "revision": "4c0a5e0c967308f0fca774f8f09d3186"
  },
  {
    "url": "assets/favicon/favicon-32x32.png",
    "revision": "abb555d6205f34c25edfbf2ed9410552"
  },
  {
    "url": "assets/favicon/mstile-150x150.png",
    "revision": "ac8db4e96e3fb6373d7e278134047e5c"
  },
  {
    "url": "assets/images/nisiu-icon.png",
    "revision": "4692e5a2967e3d80abed53da330ba4a1"
  },
  {
    "url": "assets/images/nisiu.png",
    "revision": "7ad8cddabbbb55a385bd514e370a07d8"
  },
  {
    "url": "assets/vendor/css/dialog-polyfill.css",
    "revision": "25ed5309ec766a20117e71237ae2cdf1"
  },
  {
    "url": "assets/vendor/css/material.css",
    "revision": "b423e4c4fb5b498e26e329e38565b987"
  },
  {
    "url": "assets/vendor/css/reset.css",
    "revision": "2a87bfc51a385bf8494dce56e7ce0616"
  },
  {
    "url": "assets/vendor/js/material.js",
    "revision": "60f3ee61721d5bbac709fad9c239f2ac"
  },
  {
    "url": "index.html",
    "revision": "9338a0ee3c1460124acace47c470b9f6"
  },
  {
    "url": "dist/main.js",
    "revision": "799eb301009606dd95b46cdb19796d5c"
  }
])
