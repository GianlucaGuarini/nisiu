import { observable } from 'riot'
import { userPasswords, userPassword, userMasterPassword } from './database-paths'
import crypto from 'crypto-js'

const MASTER_PASSWORD_DECRYPTION_RESULT = 'nisiu'

export default observable({
  masterPassword: null,
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
          resolve(user)
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
      this.trigger('login')
      return result
    })
  },
  logout() {
    return firebase.auth().signOut().then(result => {
      this.trigger('logout')
      return result
    })
  },
  isLocked() {
    return !this.masterPassword
  },
  setPassword(id, value, comment) {
    if (!this.user || this.isLocked()) return Promise.reject()

    return firebase.database().ref().update({
      [userPassword(this.user.uid, id)]: {
        id,
        value: crypto.AES.encrypt(MASTER_PASSWORD_DECRYPTION_RESULT, value),
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

    return firebase.database().ref().update({
      [userMasterPassword(this.user.uid)]: crypto.AES.encrypt(MASTER_PASSWORD_DECRYPTION_RESULT, password).toString()
    }).then((result) => {
      this.masterPassword = password
      this.trigger('unlock')
      return result
    })
  },
  unlock(value) {
    if (!this.user) return Promise.reject()

    return this.database
      .ref(userMasterPassword(this.user.uid))
      .once('value')
      .then(snapshot => {
        console.log(snapshot.val(), crypto.AES.decrypt(snapshot.val(), value).toString(crypto.enc.Utf8))
        if (crypto.AES.decrypt(snapshot.val(), value).toString(crypto.enc.Utf8) === MASTER_PASSWORD_DECRYPTION_RESULT)  {
          this.masterPassword = value
          this.trigger('unlock')
          return true
        }

        return Promise.reject(false)
      })
  },
  lock() {
    this.masterPassword = null
    this.trigger('lock')
  },
  get database() {
    return firebase.database()
  },
  get user() {
    return firebase.auth().currentUser
  }
})