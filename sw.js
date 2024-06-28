/* global importScripts workbox */
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js',
)

// Use Workbox modules from the global workbox object
workbox.precaching.precacheAndRoute([{"revision":"d4538dad51fbdae93b356abef8ba7359","url":"assets/css/form.css"},{"revision":"efc79c22f8bc4b69b06c2de3460dd6ad","url":"assets/css/icons.css"},{"revision":"21c05dbea3ee7cf3e958d0550ad0c5e6","url":"assets/css/style.css"},{"revision":"8e881000484eeb17cc44be2ef3c30060","url":"assets/favicon/android-chrome-192x192.png"},{"revision":"4dee7dab8e271d5e3fc70998a0a672c6","url":"assets/favicon/android-chrome-512x512.png"},{"revision":"43d187d421adb9ec5d9a2fc0fc860e1c","url":"assets/favicon/apple-touch-icon.png"},{"revision":"4c0a5e0c967308f0fca774f8f09d3186","url":"assets/favicon/favicon-16x16.png"},{"revision":"abb555d6205f34c25edfbf2ed9410552","url":"assets/favicon/favicon-32x32.png"},{"revision":"ac8db4e96e3fb6373d7e278134047e5c","url":"assets/favicon/mstile-150x150.png"},{"revision":"4692e5a2967e3d80abed53da330ba4a1","url":"assets/images/nisiu-icon.png"},{"revision":"7ad8cddabbbb55a385bd514e370a07d8","url":"assets/images/nisiu.png"},{"revision":"40634d6025b435bfd6e037c00a920459","url":"assets/vendor/css/dialog-polyfill.css"},{"revision":"b423e4c4fb5b498e26e329e38565b987","url":"assets/vendor/css/material.css"},{"revision":"537929c8d4d563eeb74eb93bd5096756","url":"assets/vendor/css/reset.css"},{"revision":"70ea3e0deb549dcd752b38b4b24b84c9","url":"assets/vendor/js/material.js"},{"revision":"3b81d8c257b1b5eae334758d2fdfa7fd","url":"index.html"},{"revision":"1eed5a190d45ca589daf2d1b43645dd1","url":"dist/main.js"}])

workbox.routing.registerRoute(
  /.*(?:googleapis|gstatic)\.com.*$/,
  new workbox.strategies.StaleWhileRevalidate(),
)
