import { Router } from 'express';
import * as productsController from '../controllers/products.controller.js';
import { verifyToken, isAdmin } from '../middlewares/user.middleware.js';

const router = Router();

// Crear producto (solo admin)
router.post('/', verifyToken, isAdmin, productsController.createProduct);

// Listar productos (cualquier usuario con token válido)
router.get('/', productsController.getProducts);

// Actualizar producto (solo admin)
router.put('/:id', verifyToken, isAdmin, productsController.updateProduct);

// Eliminar producto (solo admin)
router.delete('/:id', verifyToken, isAdmin, productsController.deleteProduct);

export default router;
