import { Request, Response } from 'express'
import { Customer } from '../models/customer.model'

export class CustomerController {
  constructor() {}
  async add(req: Request, res: Response) {
    try {
      const customer = await Customer.create(req.body)
      res.json({
        ok: true,
        msg:"Cliente agregado satisfactoriamente!",
        data: customer
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
      const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, {new: true});
      res.json({
        ok: true,
        msg:"Cliente actualizado satisfactoriamente!",
        data: updatedCustomer
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
      await Customer.findByIdAndDelete(req.params.id)
      res.json({
        ok: true,
        msg: "Cliente eliminado satisfactoriamente!",
      })
    } catch (error) {
      console.log(error)
      res.json({
        ok: false,
        error
      })
    }
  }
  async getAll(req: Request, res: Response) {
    try {
      const customers = await Customer.find();
      res.json({
        ok: true,
        data: customers
      })
    } catch (error) {
      console.log(error)
      res.json({
          ok: false,
          error
      })
    }
  }
  async getOne(req: Request, res: Response) {
    try {
      const customer = await Customer.findOne({_id: req.params.id});
      res.json({
        ok: true,
        data: customer
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