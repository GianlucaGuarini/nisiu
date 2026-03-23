import CryptoJS from 'crypto-js'

export function encrypt(value: string, key: string): string {
  return CryptoJS.AES.encrypt(value, key).toString()
}

export function decrypt(encrypted: string, key: string): string {
  const bytes = CryptoJS.AES.decrypt(encrypted, key)
  return bytes.toString(CryptoJS.enc.Utf8)
}
