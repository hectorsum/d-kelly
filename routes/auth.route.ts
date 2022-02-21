import { Router } from 'express'
import { CustomerController } from '../controllers/customer.controller';

const app = Router()
const controller = new CustomerController()

//* @route  GET api/auth
//* @des    Get User Info
//* @access Public
app.get('/', controller.getAll);

//* @route  POST api/auth
//* @des    Authenticate user & get token
//* @access Public
app.get('/:id', controller.getOne);

export default app;