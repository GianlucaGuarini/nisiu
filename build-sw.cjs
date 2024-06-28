const workboxBuild = require('workbox-build')

// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () => {
  // This will return a Promise
  return workboxBuild.injectManifest({
    swSrc: 'src/sw.js',
    swDest: 'sw.js',
    globDirectory: '.',
    globPatterns: [
      'assets/**/*.{js,css,html,png}',
      '**/*.html',
      'dist/**/*.js',
    ],
  })
}

buildSW()
