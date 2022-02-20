import { Schema, model, Document } from 'mongoose'

const OrderSchema = new Schema({
    customer: {
      type: Schema.Types.ObjectId,
      ref: "customer",
      required: [true, 'customer is required']
    },
    icecream: {
      type: String,
      required: [true, 'icecream is required']
    },
    amountcharged: {
      type: Number,
      required: [true, 'amount is required']
    },
    notes: {
      type: String,
      required: false
    },
})

interface IOrder extends Document {
    customer: string
    icecream: string
    amountcharged: number,
    notes?:string
}


export const Order = model<IOrder>('order', OrderSchema)