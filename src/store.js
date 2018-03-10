import { observable } from 'riot'
import { userPasswords, userPassword, userMasterPassword } from './database-paths'
import crypto from 'crypto-js'

const MASTER_PASSWORD_DECRYPTION_RESULT = 'nisiu'

export default observable({
  masterPassword: false,
  hasMaster: false,
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
          this.fetchMaster().then(() => resolve(user))
        } else {
          reject()
        }
      })
    })
  },
  async login() {
    const provider = new firebase.auth.GoogleAuthProvider()

    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

    return firebase.auth().signInWithPopup(provider).then(result => {
      return this.fetchMaster().then(() => {
        this.trigger('login')
        return result
      })
    })
  },
  logout() {
    return firebase.auth().signOut().then(result => {
      this.trigger('logout')
      this.lock()
      return result
    })
  },
  deleteAccount() {
    if (!this.user) return Promise.reject()

    const isConfirmed = window.confirm('Are you sure you want to delete your account? All your old passwords will be deleted')

    if (isConfirmed) return Promise.all([
      this.database.ref(userMasterPassword(this.user.uid)).remove(),
      this.database.ref(userPasswords(this.user.uid)).remove(),
      this.user.delete()
    ]).then(() => this.lock())

    return Promise.reject()
  },
  isLocked() {
    return !this.masterPassword
  },
  setPassword(id, value, comment) {
    if (!this.user || this.isLocked()) return Promise.reject()

    return this.database.ref().update({
      [userPassword(this.user.uid, id)]: {
        id,
        value: this.encrypt(value, this.masterPassword),
        comment
      }
    })
  },
  fetchPasswords() {
    if (!this.user || this.isLocked()) return Promise.reject()

    return this.database
      .ref(userPasswords(this.user.uid))
      .once('value')
      .then(snapshot => {
        return snapshot.val() && snapshot.val().passwords || []
      })
  },
  setMasterPassword(password) {
    if (!this.user) return Promise.reject()

    return this.database
      .ref().update({
        [userMasterPassword(this.user.uid)]: this.encrypt(MASTER_PASSWORD_DECRYPTION_RESULT, password)
      }).then((result) => {
        this.masterPassword = password
        this.trigger('unlock')
        return result
      })
  },
  encrypt(value, key) {
    return crypto.AES.encrypt(value, key).toString()
  },
  decrypt(value, key) {
    return crypto.AES.decrypt(value, key).toString(crypto.enc.Utf8)
  },
  fetchMaster() {
    if (!this.user) return Promise.reject()

    return this.database
      .ref(userMasterPassword(this.user.uid))
      .once('value')
      .then(snapshot => {
        if (snapshot.val()) {
          this.hasMaster = true
        }
      })
  },
  unlock(password) {
    if (!this.user) return Promise.reject()

    return this.database
      .ref(userMasterPassword(this.user.uid))
      .once('value')
      .then(snapshot => {
        if (this.decrypt(snapshot.val(), password) === MASTER_PASSWORD_DECRYPTION_RESULT)  {
          this.masterPassword = password
          this.trigger('unlock')
          return true
        }

        return Promise.reject(false)
      })
  },
  lock() {
    this.masterPassword = false
    this.trigger('lock')
  },
  get database() {
    return firebase.database()
  },
  get user() {
    return firebase.auth().currentUser
  }
})