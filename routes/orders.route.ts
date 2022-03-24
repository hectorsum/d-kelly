import { Router } from 'express'
import { OrderController } from '../controllers/orders.controller';
const app = Router()
const controller = new OrderController()
const auth = require('../middlewares/auth.middleware');

// @route  GET api/order
// @des    Get All Orders
// @access Private
app.get('/', auth, controller.getAll);

// @route  GET api/order/missing
// @des    Get Missing Payments
// @access Private
app.get('/', auth, controller.getMissingPayments);

// @route  GET api/order/:id
// @des    Get order by id
// @access Private
app.get('/:id', auth, controller.getOne);

// @route  POST api/order
// @des    Add order
// @access Private
app.post('/', auth, controller.add);

// @route  PUT api/order/:id
// @des    Edit order by id
// @access Private
app.put('/:id', auth, controller.update);

// @route  DELETE api/order/:id
// @des    Remove order by id
// @access Private
app.delete('/:id', auth, controller.delete);

// @route  PUT api/order/payment/:id
// @des    Confirm Payment
// @access Private
app.put('/payment/:id', auth, controller.confirmPayment);

export default app;