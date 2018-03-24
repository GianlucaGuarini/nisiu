<img width='100%' src='https://rawgit.com/GianlucaGuarini/nisiu/master/logo.jpg' alt='nisiu logo'/>

[![Build Status][travis-image]][travis-url]

[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]

Personal firebase based password manager written with Riot.js - WIP

# General info

Nisiu was designed only for a personal use but it can be customized in order to be used by your friends and your family with a few steps.

## Goals

- ✅ Built to __let you own and manage your passwords__
- ✅ Designed __only for modern browsers__
- ✅ It's available online with __no additional installation__
- ✅ It tores your data on firebase and __you can set up easily your own private DB instance__ via [env credentials](.env)
- ✅ __It's secure__, it uses the [AES algorithm](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) for all the stored data by default
- ✅ __Google as authentication__ system
- ✅ Completely __open source__ [under MIT license](LICENSE)

## Caveats

- ❌ Doesn't work on old browser that do not support ES2017 javascript features
- ❌ It's a clientside application so it needs javascript to be enabled
- ❌ It doesn't work offline yet

# Configuration

## Google Account Creation

Make sure to have a [google account](https://myaccount.google.com/intro). If you don't have any just create one

## Firebase API Creation

You will need to set your own firebase credentials in the [.env file](.env). To do so you need to create an new project using the [firebase console](https://console.firebase.google.com/)

1. Click on the add project button
2. Click on the "Add Firebase to your web app" button
3. Replace the app credentials in the [.env file](.env)

## Build step

Once you have done all the steps above you are ready to start using nisiu. The last step is needed to build again the app using your new credentials.

1. Install the npm dependencies `npm i`
2. Run `make build`
3. Open `index.html` with any modern browser and voilà!

# Setup your DB Rules

With firebase you can easily control you application DB whitelisting the users that can read and write from it.

### Easy rules

A simple way to configure your DB is to add the following rules via firebase console

```json
{
  "rules": {
    "$user": {
      ".read": "auth.uid === $user",
      ".write": "auth.uid === $user"
    }
  }
}
```

[More info about firebase database rules](https://firebase.google.com/docs/reference/security/database)

### Strict rules

You can enhance the security of your nisiu database using complexer rules like:

```json
{
  "rules": {
    "$user": {
      ".read": "auth.uid === $user && root.child('whitelist').hasChild(auth.uid)",
      ".write": "auth.uid === $user && root.child('whitelist').hasChild(auth.uid)",
      "passwords": {
        "$id": {
          ".validate": "newData.child('value').isString() && newData.child('value').val().length > 0"
        }
      },
      "key": {
        ".validate": "newData.isString() && newData.val().length >= 64"
      },
    },
    "whitelist": {
      ".read": false,
      ".write": false
    }
  }
}
```

With the rules above only users belonging to the "whitelist" will be able to use your application

# TODO

- [x] Whitelist users
- [ ] Add small unit test
- [ ] Add import vs export feature via drag and drop
- [x] PWA enhancements
- [x] Add favicon

[travis-image]:https://img.shields.io/travis/GianlucaGuarini/nisiu.svg?style=flat-square
[travis-url]:https://travis-ci.org/GianlucaGuarini/nisiu

[license-image]:http://img.shields.io/badge/license-MIT-000000.svg?style=flat-square
[license-url]:LICENSE

[npm-version-image]:http://img.shields.io/npm/v/nisiu.svg?style=flat-square
[npm-downloads-image]:http://img.shields.io/npm/dm/nisiu.svg?style=flat-square
[npm-url]:https://npmjs.org/package/nisiu