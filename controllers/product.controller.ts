import { Request, Response } from 'express'
import { Product } from '../models/product.model'

export class ProductController {
  constructor() {}
  async add(req: Request, res: Response) {
    try {
      const product = await Product.create(req.body)
      res.json({
        ok: true,
        msg:"Producto agregado satisfactoriamente!",
        data: product
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
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
      res.json({
        ok: true,
        msg:"Producto actualizado satisfactoriamente!",
        data: updatedProduct
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
      await Product.findByIdAndDelete(req.params.id)
      res.json({
        ok: true,
        msg: "Producto eliminado satisfactoriamente!",
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
      const products = await Product.find().sort({date: -1}).exec();
      res.json({
        ok: true,
        data: products
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
      const product = await Product.findOne({_id: req.params.id});
      res.json({
        ok: true,
        data: product
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