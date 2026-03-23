import { userPasswords, userPassword, userKey } from './paths.js'
import { encrypt } from '../util/crypto.js'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref } from 'firebase/database'

const database = {
  firebaseApp: null,
  api: null,

  init() {
    const firebaseConfig = {
      apiKey: '<@API_KEY@>',
      authDomain: '<@AUTH_DOMAIN@>',
      databaseURL: '<@DATABASE_URL@>',
      projectId: '<@PROJECT_ID@>',
      storageBucket: '<@STORAGE_BUCKET@>',
      messagingSenderId: '<@MESSAGING_SENDER_ID@>',
    }

    this.firebaseApp = initializeApp(firebaseConfig)
    this.api = getDatabase(this.firebaseApp)
  },

  account: {
    delete(user) {
      return Promise.all([
        user.delete(),
        ref(userKey(user.uid)).remove(),
        ref(userPasswords(user.uid)).remove(),
      ])
    },
    getPasswords(user) {
      return ref(userPasswords(user.uid)).once('value')
    },
  },

  key: {
    get(user) {
      return ref(userKey(user.uid)).once('value')
    },
    set(user, key, password) {
      return ref().update({
        [userKey(user.uid)]: encrypt(key, password),
      })
    },
  },

  password: {
    delete(user, id) {
      return ref(userPassword(user.uid, id)).remove()
    },
    set(user, key, password) {
      const { id, username, name, value, comment } = password


      return ref().update({
        [userPassword(user.uid, id)]: {
          id,
          name: encrypt(name, key),
          username: encrypt(username, key),
          value: encrypt(value, key),
          comment: encrypt(comment, key),
        },
      })
    },
  },
}

export default database
