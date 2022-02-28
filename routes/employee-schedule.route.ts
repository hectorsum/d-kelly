import { Router } from 'express'
import { EmployeeScheduleController } from '../controllers/employee-schedule.controller';
const app = Router();
const controller = new EmployeeScheduleController();
const auth = require('../middlewares/auth.middleware');

// @route  GET api/employee
// @des    Set Employee's checkout
// @access Private
app.post('/', auth, controller.setCheckout);

// @route  GET api/employee
// @des    Show all checkouts by employee
// @access Private
app.get('/:id', auth, controller.seeCheckoutByEmployee);

// @route  GET api/employee
// @des    Show all checkouts from current date
// @access Private
app.get('/:id', auth, controller.seeAllCheckouts);

export default app;