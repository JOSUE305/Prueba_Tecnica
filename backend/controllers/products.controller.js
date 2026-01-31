import * as productModel from '../models/product.model.js';

// Crear
export const createProduct = (req, res) => {
    productModel.createProduct(req.body, (err, product) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.status(201).json(product);
    });
};

// Leer
export const getProducts = (req, res) => {
    productModel.getProducts((err, products) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.status(200).json(products);
    });
};

// Actualizar
export const updateProduct = (req, res) => {
    productModel.updateProduct(req.params.id, req.body, (err, product) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.status(200).json(product);
    });
};

// Eliminar
export const deleteProduct = (req, res) => {
    productModel.deleteProduct(req.params.id, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.status(204).send();
    });
};