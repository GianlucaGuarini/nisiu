import { userPasswords, userPassword, userKeys } from './paths'
import { encrypt } from '../util/crypto'

const database = {
  init() {
    this.api = firebase.database()
  },
  account: {
    delete(user) {
      return Promise.all([
        user.delete(),
        database.api.ref(userKeys(user.uid)).remove(),
        database.api.ref(userPasswords(user.uid)).remove()
      ])
    },
    getPasswords(user) {
      return database.api.ref(userPasswords(user.uid)).once('value')
    }
  },
  key: {
    get(user) {
      return database.api.ref(userKeys(user.uid)).once('value')
    },
    set(user, key, password) {
      return database.api.ref().update({
        [userKeys(user.uid)]: encrypt(key, password)
      })
    }
  },
  password: {
    delete(user, id) {
      return database.api.ref(userPassword(user.uid, id)).remove()
    },
    set(user, key, password) {
      const { id, value, comment } = password

      return database.api.ref().update({
        [userPassword(user.uid, id)]: {
          id,
          value: encrypt(value, key),
          comment
        }
      })
    }
  }
}

export default database