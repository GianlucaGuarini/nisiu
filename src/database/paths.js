export function userPasswords(userId) {
  return `${userId}/passwords`
}

export function userPassword(userId, passwordId) {
  return `${userPasswords(userId)}/${passwordId}`
}

export function userKey(userId) {
  return `${userId}/key`
}