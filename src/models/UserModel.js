import mongoose from 'mongoose'
import mongooseHidden from 'mongoose-hidden'
import timestamps from 'mongoose-timestamp'

const { Schema } = mongoose

const UserSchema = new Schema({
  userId: { type: String, required: true, index: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
})

UserSchema.plugin(mongooseHidden(),
  {
    hidden:
  {
    _id: false,
    password: true,
  },
  })

UserSchema.plugin(timestamps)

const User = mongoose.model('User', UserSchema, 'User')

export default User