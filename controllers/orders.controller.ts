import { Request, Response } from 'express'
import { IOrder, Order } from '../models/order.model'
import { IProduct, Product } from '../models/product.model';

interface IProductCart {
  _id: string
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
      const {products, customer, notes, hasPaid} = req.body;
      const errors = [] as Array<{msg: string}>;
      
      //* Validating stock availability
      console.log("products: ",products)
      const promisesResponse = products.map(async(item: IProductCart) => {
        const { name, qty:currentStock } = await Product.findOne({_id: item._id}) as IProduct;
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
        const {price} = await Product.findOne({_id:item._id}) as IProduct;
        let amount = price * item.qty;
        return amount;
      })
    
      arrayPrices = await Promise.all<Array<number>>(arrayPromises);
      total = arrayPrices.reduce((total, num) => {
        return total + num;
      },0);

      //* Updating products stock
      const updatedStock = products.map(async(item: IProductCart) => {
        return await Product.findByIdAndUpdate(item._id, {
          $inc: { qty: -item.qty }
        })
      })
      await Promise.all(updatedStock).then(data => data).catch(err => err);
      
      const soldProducts = products.map((item: IProductCart) => {
        return {
          _id: item._id,
          name: item.name,
          qty: item.qty
        }
      }) as Array<string>;
      const order = await Order.create({
        products: soldProducts,
        customer,
        notes,
        total,
        hasPaid
      });
      console.log("order: ",order);
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
      const {products, hasPaid} = req.body;
      let total: number;
      let arrayPromises: number[];
      let arrayPrices: number[];
      const oldOrder = await Order.findById({_id: req.params.id}) as IOrder;
      const errors = [] as Array<{msg: string}>;
      if (!products) return res.status(500).send("No hay productos");
      if (!oldOrder) return res.status(500).send("Orden de pedido no existe");
      
      //* Validating stock availability
      const promisesResponse = products.map(async(item: IProductCart) => {
        let productIsInCart = oldOrder.products.find(elem => (elem._id.toString() === item._id.toString()));
        let { name, qty:currentStock } = await Product.findOne({_id: item._id}) as IProduct;
        if (productIsInCart && (item.qty > productIsInCart.qty || item.qty < productIsInCart.qty)){ //if incoming qty is greater than the previous qty, when we sum
          currentStock += productIsInCart.qty; //returns back the stock 
        }
        if (item.qty > currentStock) {
          errors.push({
            "msg": `No hay stock suficiente para ${name}, stock disponible(${currentStock})`
          })
        }
      })

      await Promise.all(promisesResponse).then(data => data).catch(err => err);
      if (errors.length > 0) return res.status(500).json({errors: errors});

      //* Getting the total amount
      arrayPromises = products.map(async(item: IProductCart) => {
        const data = await Product.findOne({_id:item._id.toString()}) as IProduct;
        let amount = data.price * item.qty;
        return amount;
      })

      arrayPrices = await Promise.all<Array<number>>(arrayPromises);
      total = arrayPrices.reduce((total, num) => {
        return total + num;
      },0);

      // * Updating products stock
      const updatedStock = products.map(async(item: IProductCart) => {
        let productIsInCart = oldOrder.products.find(elem => (elem._id.toString() === item._id.toString()));
        let removedProductFromCart = oldOrder.products.find(elem => (elem._id.toString() !== item._id.toString()));
        if (productIsInCart){
          if(item.qty > productIsInCart.qty){
            let qtyToReturn = item.qty - productIsInCart.qty;
            return await Product.findByIdAndUpdate(item._id, {
              $inc: { qty: -qtyToReturn }
            })
          }else if (item.qty < productIsInCart.qty){
            let qtyToReturn = productIsInCart.qty - item.qty;
            return await Product.findByIdAndUpdate(item._id, {
              $inc: { qty: qtyToReturn }
            })
          }else if (item.qty === productIsInCart.qty){
            return await Product.findByIdAndUpdate(item._id, {
              $inc: { qty: 0 }
            })
          }
        }else if (removedProductFromCart){
          return await Product.findByIdAndUpdate(removedProductFromCart._id, {
            $inc: { qty: removedProductFromCart.qty }
          })
        }else{
          return await Product.findByIdAndUpdate(item._id, {
            $inc: { qty: -item.qty }
          })
        }
      })
      await Promise.all(updatedStock).then(data => data).catch(err => err);

      const order = await Order.findByIdAndUpdate(req.params.id,{
        products,
        total,
        hasPaid
      }, {new: true});
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
  async confirmPayment(req: Request, res: Response){
    try {
      const order = await Order.findByIdAndUpdate(req.params.id, { hasPaid: true }, {new: true});
      res.json({
        ok: true,
        msg: "Payment Confirmed",
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