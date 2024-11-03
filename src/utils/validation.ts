export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const usernamePattern = /^[a-zA-Z0-9_]{3,16}$/
export const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/

export function validateEmail(email: string | null) {
  return emailPattern.test(email || '')
}

export function validateUsername(username: string | null) {
  return usernamePattern.test(username || '')
}

export function validatePassword(password: string | null) {
  return passwordPattern.test(password || '')
}