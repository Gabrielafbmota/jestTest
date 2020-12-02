import cuid from 'cuid'
import User from '../models/UserModel'

import UserSchema from '../models/UserModel'

export async function create({ name, email, password }) {
  const newUser = new UserSchema({
    userId: cuid(),
    name,
    email,
    password,
  })

  return newUser.save()
}

export async function findAll(){
  return UserSchema.find()
}