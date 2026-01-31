import { Router } from 'express';
import * as ordersController from '../controllers/orders.controller.js';
import { verifyToken } from '../middlewares/user.middleware.js';

const router = Router();

router.post('/', verifyToken, ordersController.confirmOrder);
router.get('/', verifyToken, ordersController.getOrders);
router.get('/:id', verifyToken, ordersController.getOrderById);

export default router;
