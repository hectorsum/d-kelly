import { Request, Response } from 'express'
import { Order } from '../models/order.model'

export class OrderController {
  constructor(){}
  async add (req: Request, res: Response){
    try {
      const order = await Order.create(req.body)
      res.json({
        ok: true,
        msg:"Boleta registrada satisfactoriamente!",
        data: order
      })
    } catch (error) {
      console.log(error)
      res.json({
        ok: false,
        error
      })
    }
  }
  async update (req: Request, res: Response){
    try {
      const order = await Order.findByIdAndUpdate(req.params.id,req.body)
      res.json({
        ok: true,
        msg:"Boleta editada satisfactoriamente!",
        data: order
      })
    } catch (error) {
      console.log(error)
      res.json({
        ok: false,
        error
      })
    }
  }
  async delete (req: Request, res: Response){
    try {
      const order = await Order.findByIdAndDelete(req.params.id)
      res.json({
        ok: true,
        msg:"Boleta eliminada satisfactoriamente!",
        data: order
      })
    } catch (error) {
      console.log(error)
      res.json({
        ok: false,
        error
      })
    }
  }
  async getAll (req: Request, res: Response){
    try {
      const orders = await Order.find();
      res.json({
        ok: true,
        data: orders
      })
    } catch (error) {
      console.log(error)
      res.json({
        ok: false,
        error
      })
    }
  }
  async getOne (req: Request, res: Response){
    try {
      const order = await Order.findById({_id: req.params.id});
      res.json({
        ok: true,
        data: order
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