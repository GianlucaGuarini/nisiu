import crypto from 'crypto-js'

export function encrypt(value, key) {
  return crypto.AES.encrypt(value, key).toString()
}

export function decrypt(value, key) {
  return crypto.AES.decrypt(value, key).toString(crypto.enc.Utf8)
}