import { Request, Response } from 'express';
import {EmployeeSchedule} from '../models/employee-schedule.model'

export class EmployeeScheduleController {
  constructor(){}
  async setCheckout(req: Request, res: Response) {
    try {
      await EmployeeSchedule.create(req.body);
      res.json({
        ok: true,
        msg:"Horario de salida fijado!"
      })
    } catch (error) {
      res.json({
        ok:false,
        msg: error
      })
    }
  }
  async seeCheckoutByEmployee(req: Request, res: Response){
    try {
      const checkouts = await EmployeeSchedule.findById(req.params.id);
      res.json({
        ok: true,
        data: checkouts
      })
    } catch (error) {
      res.json({
        ok:false,
        msg: error
      })
    }
  }
  async seeAllCheckouts(req: Request, res: Response){
    try {
      const checkouts = await EmployeeSchedule.find({date: new Date()});
      res.json({
        ok: true,
        data: checkouts
      })
    } catch (error) {
      res.json({
        ok:false,
        msg: error
      })
    }
  }
}