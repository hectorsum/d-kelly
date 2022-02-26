import { Router } from 'express'
import { CustomerController } from '../controllers/customer.controller';
import { EmployeeController } from '../controllers/employee.controller';
const app = Router();
const controller = new EmployeeController();
const auth = require('../middlewares/auth.middleware');

// @route  GET api/employee
// @des    Get All Employees
// @access Private
app.get('/', auth, controller.getAll);

// @route  GET api/employee/:id
// @des    Get Employee by id
// @access Private
app.get('/:id', auth, controller.getOne);

// @route  POST api/employee
// @des    Add Employee
// @access Private
app.post('/', auth, controller.add);

// @route  PUT api/employee/:id
// @des    Edit Employee by id
// @access Private
app.put('/:id', auth, controller.update);

// @route  DELETE api/employee/:id
// @des    Remove Employee by id
// @access Private
app.delete('/:id', auth, controller.delete);


export default app;