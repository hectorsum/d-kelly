import { Schema, model, Document } from 'mongoose'

const ProductSchema = new Schema({
  name:{
    type: String,
    required: [true, 'icecream is required']
  },
  measuretype:{
    type: String,
    required: [true, 'type is required']
  },
  qty:{
    type: Number,
    required: [true, 'quantity is required']
  },
  price:{
    type: Number,
    required: [true, 'quantity is required']
  },
})
interface IProduct {
  name: string
  measuretype: string //kilograms, grams, unit
  qty: number
  price: number
}

export const Product = model<IProduct>('product', ProductSchema)