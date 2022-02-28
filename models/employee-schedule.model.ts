import { Schema, model, Document } from 'mongoose'

const EmployeeScheduleSchema = new Schema({
  checkout: {
    type: Date,
    required: false
  },
  employeeid: {
    type: Schema.Types.ObjectId,
    ref: "employee",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
})

export interface IEmployeeSchedule extends Document {
  employeeid: string
  checkout: string
}


export const EmployeeSchedule = model<IEmployeeSchedule>('employee-schedule', EmployeeScheduleSchema);