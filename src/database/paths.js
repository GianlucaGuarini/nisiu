export function userPasswords(userId) {
  return `/user-passwords/${userId}`
}

export function userPassword(userId, passwordId) {
  return `${userPasswords(userId)}/${passwordId}`
}

export function userKeys(userId) {
  return `/users-encrypted-keys/${userId}`
}