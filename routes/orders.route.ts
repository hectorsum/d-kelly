import { Router } from 'express'
import { OrderController } from '../controllers/orders.controller';

const app = Router()
const controller = new OrderController()

// @route  GET api/order
// @des    Get All Orders
// @access Private
app.get('/', controller.getAll);

// @route  GET api/order/:id
// @des    Get order by id
// @access Private
app.get('/:id', controller.getOne);

// @route  POST api/order
// @des    Add order
// @access Private
app.post('/', controller.add);

// @route  PUT api/order/:id
// @des    Edit order by id
// @access Private
app.put('/:id', controller.update);

// @route  DELETE api/order/:id
// @des    Remove order by id
// @access Private
app.delete('/:id', controller.delete);

export default app;