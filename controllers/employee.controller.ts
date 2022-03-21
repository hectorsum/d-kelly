import { Request, Response } from 'express';
import {Employee, IEmployee} from '../models/employee.model'

export class EmployeeController {
  constructor() {}
  async getAll(req: Request, res: Response){
    try {
      const employees = await Employee.find();
      return res.status(200).json({
        ok:true,
        data: employees
      })
    } catch (error) {
      res.json({
          ok: false,
          msg: error
      })
    }
  }
  async getOne(req: Request, res: Response){
    try {
      const employee = await Employee.findById(req.params.id);
      return res.status(200).json({
        ok:true,
        data: employee
      })
    } catch (error) {
      res.json({
          ok: false,
          msg: error
      })
    }
  }
  async add(req: Request, res: Response) {
    try {
      const employee = await Employee.create(req.body)
      res.json({
        ok: true,
        msg:"Empleado agregado satisfactoriamente!",
        data: employee
      })
    } catch (error) {
      console.log(error)
      res.json({
          ok: false,
          error
      })
    }
  }
  async update(req: Request, res: Response) {
    try {
      const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, {new: true});
      res.json({
        ok: true,
        msg:"Empleado actualizado satisfactoriamente!",
        data: updatedEmployee
      })
    } catch (error) {
      console.log(error)
      res.json({
          ok: false,
          error
      })
    }
  }
  async delete(req: Request, res: Response) {
    try {
      await Employee.findByIdAndDelete(req.params.id)
      res.json({
        ok: true,
        msg: "Empleado eliminado satisfactoriamente!",
      })
    } catch (error) {
      console.log(error)
      res.json({
        ok: false,
        error
      })
    }
  }
}