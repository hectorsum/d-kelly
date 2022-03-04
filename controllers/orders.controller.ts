import { Request, Response } from 'express'
import { IOrder, Order } from '../models/order.model'
import { IProduct, Product } from '../models/product.model';

interface IProductCart {
  id: string
  name: string
  qty: number
}
export class OrderController {
  constructor(){}
  async add (req: Request, res: Response){
    try {
      let total: number;
      let arrayPromises: number[];
      let arrayPrices: number[];
      const {products, customer, notes} = req.body;
      const errors = [] as Array<{msg: string}>;
      
      //* Validating stock availability
      const promisesResponse = products.map(async(item: IProductCart) => {
        const { name, qty:currentStock } = await Product.findOne({_id: item.id}) as IProduct;
        if (item.qty > currentStock) {
          console.log(true);
          errors.push({
            "msg": `No hay stock suficiente para ${name}, stock disponible(${currentStock})`
          })
        }
      })
      await Promise.all(promisesResponse).then(data => data).catch(err => err);
      if (errors.length > 0) return res.status(500).json({errors: errors});
      
      //* Getting the total amount
      arrayPromises = products.map(async(item: IProductCart) => {
        const {price} = await Product.findOne({_id:item.id}) as IProduct;
        let amount = price * item.qty;
        return amount;
      })
    
      arrayPrices = await Promise.all<Array<number>>(arrayPromises);
      total = arrayPrices.reduce((total, num) => {
        return total + num;
      },0);

      //* Updating products stock
      const updatedStock = products.map(async(item: IProductCart) => {
        return await Product.findByIdAndUpdate(item.id, {
          $inc: { qty: -item.qty }
        })
      })
      await Promise.all(updatedStock).then(data => data).catch(err => err);
      
      const soldProducts = products.map((item: IProductCart) => {
        return {
          name: item.name,
          qty: item.qty
        }
      }) as Array<string>;
      const order = await Order.create({
        products: soldProducts,
        customer,
        notes,
        total
      });
      res.json({
        ok: true,
        msg:"Pedido registrada satisfactoriamente!",
        data: order
      });
    } catch (error) {
      console.log(error)
      res.json({
        ok: false,
        msg: error
      })
    }
  }
  async update (req: Request, res: Response){
    try {
      const {products} = req.body;
      const exists = await Order.exists({_id: req.params.id});
      if (!exists) return res.status(500).send("Orden de pedido no existe");
      const order = await Order.findByIdAndUpdate(req.params.id,products, {new: true});
      res.json({
        ok: true,
        msg:"Boleta editada satisfactoriamente!",
        data: order
      })
    } catch (error) {
      console.log(error)
      res.json({
        ok: false,
        msg: error
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
        msg: error
      })
    }
  }
  async getAll (req: Request, res: Response){
    try {
      const orders = await Order.find().sort({date: -1}).exec() as IOrder[];
      res.json({
        ok: true,
        data: orders
      })
    } catch (error) {
      console.log(error)
      res.json({
        ok: false,
        msg: error
      })
    }
  }
  async getOne (req: Request, res: Response){
    try {
      const order = await Order.findById({_id: req.params.id}) as IOrder;
      res.json({
        ok: true,
        data: order
      })
    } catch (error) {
      console.log(error)
      res.json({
        ok: false,
        msg: error
      })
    }
  }
}