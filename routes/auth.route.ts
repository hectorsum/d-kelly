import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller';
import { AuthRequest } from '../types';

const app = Router()
const controller = new AuthController()

//* @route  GET api/auth
//* @des    Get User Info
//* @access Public
app.get('/', controller.getOne);

//* @route  POST api/auth
//* @des    Authenticate user & get token
//* @access Public
app.get('/:id', controller.login);

export default app;