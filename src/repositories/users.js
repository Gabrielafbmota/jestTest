import UserSchema from '../models/UserModel'
import generateId from '../libs/generateId'

export function save({ username, email, password }) {
  const newUser = new UserSchema({
    userId: generateId(),
    username,
    email,
    password,
  })

  return newUser.save()
}

export function findAll() {
  return UserSchema.find()
}

export function findById({ userId }) {
  return UserSchema.findOne({ _id: userId })
}
