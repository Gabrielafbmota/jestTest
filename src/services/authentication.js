import jwt from 'jsonwebtoken'
import { jwtConfig } from '../config'
import { promisify } from 'util'

export async function createToken(params, expiresIn = false) {
  try {
    if (expiresIn) {
      const token = jwt.sign({ ...params }, jwtConfig.secret, { expiresIn: jwtConfig.expiration })
      return token
    }
    const token = jwt.sign({ ...params }, jwtConfig.secret)
    return token
  } catch (error) {
    return error
  }
}
export async function verifyToken(token) {
  const decoded = promisify(jwt.verify)(token, jwtConfig.secret)
  if (!decoded) return null
  return decoded
}
