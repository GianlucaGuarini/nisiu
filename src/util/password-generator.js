function dec2hex (dec) {
  return ('0' + dec.toString(16)).substr(-2)
}

export default function generate(length) {
  const array = new Uint32Array((length || 40) / 2)
  const result = window.crypto.getRandomValues(array)

  return Array.from(result, dec2hex).join('')
}