import { Schema, model, Document } from 'mongoose'

const EmployeeSchema = new Schema({
  fullname: {
    type: String,
    required: [true, 'fullname is required']
  },
  address:{
    type: String,
    required: false
  },
  cellphone: {
    type: String,
    required: false
  },
  weeklysalary: {
    type: Number,
    required: true
  }
})

export interface IEmployee extends Document {
  fullname: string
  address: String
  cellphone: string
}


export const Employee = model<IEmployee>('employee', EmployeeSchema);