import mongoose from 'mongoose'

const { Schema } = mongoose

const UserSchema = new Schema({
  userId: { type: String, required: true, index: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
})

const User = mongoose.model('User', UserSchema)

export default User
