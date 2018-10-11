/* global importScripts workbox */

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js')

workbox.routing.registerRoute(
  /.*(?:googleapis|gstatic)\.com.*$/,
  workbox.strategies.staleWhileRevalidate(),
)

workbox.precaching.precacheAndRoute([])
