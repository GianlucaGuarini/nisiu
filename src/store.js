import { observable } from 'riot'
import { decrypt } from './util/crypto'
import generatePassword  from './util/password-generator'
import database from './database'

const USER_KEY_LENGHT = 64

export default observable({
  encryptedKey: false,
  key: false,
  init() {
    firebase.initializeApp({
      apiKey: '<@API_KEY@>',
      authDomain: '<@AUTH_DOMAIN@>',
      databaseURL: '<@DATABASE_URL@>',
      projectId: '<@PROJECT_ID@>',
      storageBucket: '<@STORAGE_BUCKET@>',
      messagingSenderId: '<@MESSAGING_SENDER_ID@>'
    })

    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.getEncryptedKey.finally(() => resolve(user))
        } else {
          reject()
        }
      })
    })
  },
  async login() {
    const provider = new firebase.auth.GoogleAuthProvider()

    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    await firebase.auth().signInWithPopup(provider)

    return this.getEncryptedKey.finally(() => this.trigger('login'))
  },
  async getEncryptedKey() {
    const key = database.key.get(this.user)
    this.encryptedKey = key.val()

    return this.encryptedKey
  },
  async logout() {
    const snapshot = await firebase.auth().signOut()

    this.trigger('logout')
    this.lock()

    return snapshot.val()
  },
  async deleteAccount() {
    const isConfirmed = window.confirm('Are you sure you want to delete your account? All your old passwords will be deleted')

    if (isConfirmed) {
      const snapshot = await database.account.delete(this.user)
      this.lock()

      return snapshot.val()
    }

    throw 'Error'
  },
  async addPassword(id, value, comment) {
    const snapshot = await database.password.set(this.user, this.key, { id, value, comment })

    this.trigger('password:added')

    return snapshot.val()
  },
  async deletePassword(id) {
    const snapshot = await database.password.delete(this.user, id)

    this.trigger('password:removed')

    return snapshot.val()
  },
  async fetchPasswords() {
    const snapshot = await database.account.getPasswords(this.user)

    return snapshot.val() && Object.values(snapshot.val()) || []
  },

  async setEncryptedKey(password) {
    const key = generatePassword(USER_KEY_LENGHT)
    const snapshot = await database.key.set(this.user, key, password)

    this.key = key
    this.encryptedKey = snapshot.val()

    return { key: key, encryptedKey: this.encryptedKey }
  },
  async unlock(password) {
    const encryptedKey = await database.key.get(this.user).val()
    const key = decrypt(encryptedKey, password)

    if (key) {
      this.key = key
      this.trigger('unlock')

      return true
    }

    return false
  },
  revealPassword(value) {
    return decrypt(value, this.key)
  },
  lock() {
    this.key = false
    this.trigger('lock')
  },
  isLocked() {
    return !this.key
  },
  get user() {
    return firebase.auth().currentUser
  }
})