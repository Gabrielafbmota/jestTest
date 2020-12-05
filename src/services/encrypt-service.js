import argon2 from 'argon2'

export default function encrypt(password) {
  return argon2.hash(password)
}
