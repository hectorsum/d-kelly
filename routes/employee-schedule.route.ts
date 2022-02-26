import { Router } from 'express'
import { EmployeeScheduleController } from '../controllers/employee-schedule.controller';
const app = Router();
const controller = new EmployeeScheduleController();
const auth = require('../middlewares/auth.middleware');

// @route  GET api/employee
// @des    Set Employee's checkout
// @access Private
app.post('/', auth, controller.setCheckout);

export default app;