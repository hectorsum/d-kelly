import { Schema, model, Document } from 'mongoose'

const CustomerSchema = new Schema({
  fullname: {
    type: String,
    required: [true, 'fullname is required']
  },
  cellphone: {
    type: String,
    required: false
  },
  company: {
    type: String,
    required: false
  },
})

export interface ICustomer extends Document {
  fullname: string
  cellphone: string
  company: String
}


export const Customer = model<ICustomer>('customer', CustomerSchema);