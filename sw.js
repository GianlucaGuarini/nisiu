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
    "revision": "8e881000484eeb17cc44be2ef3c30060"
  },
  {
    "url": "favicon/android-chrome-512x512.png",
    "revision": "4dee7dab8e271d5e3fc70998a0a672c6"
  },
  {
    "url": "favicon/apple-touch-icon.png",
    "revision": "43d187d421adb9ec5d9a2fc0fc860e1c"
  },
  {
    "url": "favicon/favicon-16x16.png",
    "revision": "4c0a5e0c967308f0fca774f8f09d3186"
  },
  {
    "url": "favicon/favicon-32x32.png",
    "revision": "abb555d6205f34c25edfbf2ed9410552"
  },
  {
    "url": "favicon/mstile-150x150.png",
    "revision": "ac8db4e96e3fb6373d7e278134047e5c"
  },
  {
    "url": "images/nisiu-icon.png",
    "revision": "4692e5a2967e3d80abed53da330ba4a1"
  },
  {
    "url": "images/nisiu.png",
    "revision": "71b377967fd813b817c37a14943156d9"
  },
  {
    "url": "vendor/css/dialog-polyfill.css",
    "revision": "25ed5309ec766a20117e71237ae2cdf1"
  },
  {
    "url": "vendor/css/material.css",
    "revision": "b423e4c4fb5b498e26e329e38565b987"
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