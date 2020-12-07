import bcrypt from 'bcryptjs'

export function encrypt(password) {
  return bcrypt.hashSync(password)
}

export function decrypt(password, currentPassword) {
  return bcrypt.compareSync(password, currentPassword)
}
