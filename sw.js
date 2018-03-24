/* global importScripts workbox */

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "css/form.css",
    "revision": "d4538dad51fbdae93b356abef8ba7359"
  },
  {
    "url": "css/icons.css",
    "revision": "edee98a741ff69ff82c3d5063109d726"
  },
  {
    "url": "css/style.css",
    "revision": "55a639b11de5c8a4ca2657c9139fabb0"
  },
  {
    "url": "favicon/android-chrome-192x192.png",
    "revision": "6b5b810a35960cac5ff3e23f062d728d"
  },
  {
    "url": "favicon/android-chrome-512x512.png",
    "revision": "1c3b8bf98ef5f9249e7e0309a99de3ad"
  },
  {
    "url": "favicon/apple-touch-icon.png",
    "revision": "7ff3c91b858dd47a3158fd5312878be4"
  },
  {
    "url": "favicon/favicon-16x16.png",
    "revision": "655c61583cc50f39ad0e3d143de0ced4"
  },
  {
    "url": "favicon/favicon-32x32.png",
    "revision": "a31ddecddf5d9222f06b84460f093f6b"
  },
  {
    "url": "favicon/mstile-150x150.png",
    "revision": "7d8a1c0a1f3abd8a10a20713a4086935"
  },
  {
    "url": "images/nisiu-icon.png",
    "revision": "d39cb4845db978d8a2a62cc48d6996ca"
  },
  {
    "url": "images/nisiu.png",
    "revision": "cb24880a5e34a9e645a48af976eab262"
  },
  {
    "url": "vendor/css/dialog-polyfill.css",
    "revision": "25ed5309ec766a20117e71237ae2cdf1"
  },
  {
    "url": "vendor/css/material.css",
    "revision": "f8ec986bbb8fd342369cf621d072e9b5"
  },
  {
    "url": "vendor/css/reset.css",
    "revision": "2a87bfc51a385bf8494dce56e7ce0616"
  },
  {
    "url": "vendor/js/material.js",
    "revision": "60f3ee61721d5bbac709fad9c239f2ac"
  }
])