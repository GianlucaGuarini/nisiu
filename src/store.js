import { observable } from 'riot'

export default observable({
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
  get database() {
    return firebase.database()
  },
  get user() {
    return firebase.auth().currentUser
  }
})