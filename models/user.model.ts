import { Schema, model, Document } from 'mongoose'

const UserSchema = new Schema({
  email:{
    type: String,
    required: [true, 'email is required']
  },
  password:{
    type: String,
    required: [true, 'password is required']
  }
})

export interface IUser extends Document{
  user?: string
  email: string
  password: string
}

export const User = model<IUser>('user', UserSchema);