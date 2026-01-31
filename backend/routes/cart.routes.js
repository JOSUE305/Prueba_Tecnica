import { Router } from 'express';
import * as cartController from '../controllers/cart.controller.js';
import { verifyToken } from '../middlewares/user.middleware.js';

const router = Router();

router.post('/', verifyToken, cartController.addToCart);
router.get('/', verifyToken, cartController.getCart);
router.put('/:id', verifyToken, cartController.updateCartItem);
router.delete('/:id', verifyToken, cartController.removeFromCart);

export default router;
