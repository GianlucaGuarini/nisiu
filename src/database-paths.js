export function userPasswords(userId) {
  return `/user-passwords/${userId}`
}

export function userPassword(userId, passwordId) {
  return `${userPasswords(userId)}/${passwordId}`
}

export function userMasterPassword(userId) {
  return `/user-master-password/${userId}`
}