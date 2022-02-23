import { Router } from 'express'
import { UserController } from '../controllers/user.controller';
const auth = require('../middlewares/auth.middleware');
const app = Router()
const controller = new UserController()

//* @route  GET /api/user
//* @des    Get User Info By ID
//* @access Private
app.get('/:id', auth, controller.getOne);

//* @route  GET /api/user
//* @des    Show all users
//* @access Private
app.get('/', auth, controller.getAll);

//* @route  POST /api/user
//* @des    Add new user
//* @access Private
app.post('/', auth, controller.add);

//* @route  PUT /api/user
//* @des    Update user
//* @access Private
app.put('/:id', auth, controller.update);

//* @route  DELETE /api/user
//* @des    Delete user
//* @access Private
app.delete('/:id', auth, controller.delete);

export default app;