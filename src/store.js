import { decrypt } from './util/crypto.js'
import generatePassword from './util/password-generator.js'
import generateRandomId from './util/random-id.js'
import EventEmitter from 'tiny-emitter'
import { getAuth, onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth'
import database from './database/index.js'

export const USER_KEY_LENGHT = 64

function createStore() {
  const emitter = new EventEmitter()
  
  const store = {
    encryptedKey: false,
    key: false,
    _listeners: {},
    
    init() {
      database.init()

      return new Promise((resolve, reject) => {
        onAuthStateChanged(getAuth(database.firebaseApp), (user) => {
          if (user) {
            this.fetchEncryptedKey()
              .then(() => resolve(user))
              .catch((e) => this.showLoginFailure(e))
          } else {
            reject()
          }
        })
      })
    },
    async login() {
      const provider = new GoogleAuthProvider()

      await signInWithPopup(getAuth(database.firebaseApp), provider)

      return this.fetchEncryptedKey()
        .then((key) => {
          emitter.emit('login')
          return key
        })
        .catch((e) => this.showLoginFailure(e))
    },
    async fetchEncryptedKey() {
      const key = await database.key.get(this.user)

      this.encryptedKey = key.val()

      return this.encryptedKey
    },
    async logout() {
      await signOut(getAuth(database.firebaseApp))

      emitter.emit('logout')
      this.lock()
    },
    async deleteAccount() {
      const isConfirmed = window.confirm(
        'Are you sure you want to delete your account? All your old passwords will be deleted',
      )

      if (isConfirmed) {
        await database.account.delete(this.user)
        this.lock()
      }

      return isConfirmed
    },
    async addPassword({ name, username, value, comment }) {
      try {
        await database.password.set(this.user, this.key, {
          id: generateRandomId(),
          name,
          username,
          value,
          comment,
        })
      } catch (error) {
        this.openModal('error-alert', { error })
      }

      return emitter.emit('password:added')
    },

    async editPassword({ id, name, username, value, comment }) {
      try {
        await database.password.set(this.user, this.key, {
          id,
          name,
          username,
          value,
          comment,
        })
      } catch (error) {
        this.openModal('error-alert', { error })
      }

      return emitter.emit('password:edited')
    },
    async deletePassword(id) {
      await database.password.delete(this.user, id)

      emitter.emit('password:deleted')
    },
    async fetchPasswords() {
      const snapshot = await database.account.getPasswords(this.user)

      return (snapshot.val() && Object.values(snapshot.val())) || []
    },

    async setEncryptedKey(password) {
      const key = this.key || generatePassword(USER_KEY_LENGHT)

      await database.key.set(this.user, key, password)

      this.key = key
      this.encryptedKey = (await database.key.get(this.user)).val()

      emitter.emit('unlock')

      return { key: key, encryptedKey: this.encryptedKey }
    },
    async unlock(password) {
      const encryptedKey = (await database.key.get(this.user)).val()

      if (!encryptedKey) return false

      const key = decrypt(encryptedKey, password)

      if (key) {
        this.key = key
        emitter.emit('unlock')
        return true
      }

      return false
    },
    showLoginFailure(error) {
      this.openModal('error-alert', {
        error,
        solution: `Make sure your "uid" is whitelisted via firebase console.
    Or contact directly the admin to solve the issue <@ADMIN_EMAIL@>`,
      })
    },
    openModal(component, data) {
      emitter.emit('modal:open', component, data)
    },
    closeModal() {
      emitter.emit('modal:close')
    },
    decrypt(value) {
      return decrypt(value, this.key)
    },
    lock() {
      this.key = false
      emitter.emit('lock')
    },
    isLocked() {
      return !this.key
    },
    user() {
      return getAuth(database.firebaseApp)?.currentUser
    },
    on(event, callback) {
      emitter.on(event, callback)
      return this
    },
    off(event, callback) {
      emitter.off(event, callback)
      return this
    },
    // eslint-disable-next-line fp/no-rest-parameters
    trigger(event, ...args) {
      emitter.emit(event, ...args)
      return this
    }
  }

  return store
}

export default createStore()
