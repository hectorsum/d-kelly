import { Router } from 'express'
import { ProductController } from '../controllers/product.controller';
const app = Router();
const controller = new ProductController();
const auth = require('../middlewares/auth.middleware');

// @route  GET /api/product
// @des    Show all products
// @access Private
app.get('/', auth, controller.getAll);

// @route  GET /api/product/:id
// @des    Get Product by id
// @access Private
app.get('/:id', auth, controller.getOne);

// @route  POST /api/product
// @des    Add Product
// @access Private
app.post('/', auth, controller.add);

// @route  PUT /api/product/:id
// @des    Edit Product by id
// @access Private
app.put('/:id', auth, controller.update);

// @route  DELETE /api/product/:id
// @des    Remove Product by id
// @access Private
app.delete('/:id', auth, controller.delete);

export default app;