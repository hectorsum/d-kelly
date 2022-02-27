import { Schema, model, Document } from 'mongoose'

const OrderSchema = new Schema({
    customer: {
      type: Schema.Types.ObjectId,
      ref: "customer",
      required: [true, 'customer is required']
    },
    products:{
      type: [Schema.Types.ObjectId],
      ref: "customer",
      required: true
    },
    total: {
      type: Number,
      required: false
    },
    notes: {
      type: String,
      required: false
    },
    date:{
      type:Date,
      default: Date.now,
    }
})

interface IOrder extends Document {
    customer: string
    icecream: string
    amountcharged: number,
    notes?:string
}

export const Order = model<IOrder>('order', OrderSchema)