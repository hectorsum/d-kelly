import { Schema, model, Document } from 'mongoose'

const ProductSchema = new Schema({
  name:{
    type: String,
    required: [true, 'icecream is required']
  },
  qty:{
    type: Number,
    required: [true, 'quantity is required']
  },
  price:{
    type: Number,
    required: [true, 'price is required']
  },
  type:{
    type: String,
    required: false,
    default:"helado"
  }
})
export interface IProduct {
  name: string
  qty: number
  price: number
  type: string
}

export const Product = model<IProduct>('product', ProductSchema)