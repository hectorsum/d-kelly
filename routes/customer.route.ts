import { Router } from 'express'
import { CustomerController } from '../controllers/customer.controller';

const app = Router()
const controller = new CustomerController()

// @route  GET api/customer
// @des    Get All Customers
// @access Private
app.get('/', controller.getAll);

// @route  GET api/customer/:id
// @des    Get Customer by id
// @access Private
app.get('/:id', controller.getOne);

// @route  POST api/customer
// @des    Add Customer
// @access Private
app.post('/', controller.add);

// @route  PUT api/customer/:id
// @des    Edit Customer by id
// @access Private
app.put('/:id', controller.update);

// @route  DELETE api/customer/:id
// @des    Remove customer by id
// @access Private
app.delete('/:id', controller.delete);


export default app;