import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller';
import { AuthRequest } from '../types';
const auth = require('../middlewares/auth.middleware');
const app = Router()
const controller = new AuthController()

//* @route  GET /api/auth
//* @des    Get User Info
//* @access Private
app.get('/', auth, controller.getOne);

//* @route  POST /api/auth
//* @des    Authenticate user & get token
//* @access Public
app.post('/', controller.login);

export default app;