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

    database.init()

    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.fetchEncryptedKey().finally(() => resolve(user))
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

    return this.fetchEncryptedKey().finally(() => this.trigger('login'))
  },
  async fetchEncryptedKey() {
    const key = await database.key.get(this.user)

    this.encryptedKey = key.val()

    return this.encryptedKey
  },
  async logout() {
    await firebase.auth().signOut()

    this.trigger('logout')
    this.lock()
  },
  async deleteAccount() {
    const isConfirmed = window.confirm('Are you sure you want to delete your account? All your old passwords will be deleted')

    if (isConfirmed) {
      await database.account.delete(this.user)
      this.lock()
    }

    return isConfirmed
  },
  async addPassword(id, value, comment) {
    const snapshot = await database.password.set(this.user, this.key, { id, value, comment })

    this.trigger('password:added')

    return snapshot.val()
  },

  async editPassword(id, value, comment, mustDecrypt) {
    const snapshot = await database.password.set(this.user, this.key, {
      id,
      value: mustDecrypt ? decrypt(value, this.key) : value,
      comment
    })

    this.trigger('password:edited')

    return snapshot.val()
  },
  async deletePassword(id) {
    await database.password.delete(this.user, id)

    this.trigger('password:deleted')
  },
  async fetchPasswords() {
    const snapshot = await database.account.getPasswords(this.user)

    return snapshot.val() && Object.values(snapshot.val()) || []
  },

  async setEncryptedKey(password) {
    const key = this.key || generatePassword(USER_KEY_LENGHT)

    await database.key.set(this.user, key, password)

    this.key = key
    this.encryptedKey = (await database.key.get(this.user)).val()

    this.trigger('unlock')

    return { key: key, encryptedKey: this.encryptedKey }
  },
  async unlock(password) {
    const encryptedKey = (await database.key.get(this.user)).val()

    const key = decrypt(encryptedKey, password)

    if (key) {
      this.key = key
      this.trigger('unlock')

      return true
    }

    return false
  },
  openModal(component, data) {
    this.trigger('modal:open', component, data)
  },
  closeModal() {
    this.trigger('modal:close')
  },
  revealPassword(value) {
    return decrypt(value, this.key)
  },
  lock() {
    this.key = false
    this.trigger('lock')
  },
  get isLocked() {
    return !this.key
  },
  get user() {
    return firebase.auth().currentUser
  }
})