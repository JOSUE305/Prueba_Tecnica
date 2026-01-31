// controllers/category.controller.js
import * as categoryModel from '../models/category.model.js';

// Crear
export const createCategory = (req, res) => {
  categoryModel.createCategory(req.body, (err, category) => {
    if (err) return res.status(400).json({ message: err.message });
    res.status(201).json(category);
  });
};

// Leer
export const getCategories = (req, res) => {
  categoryModel.getCategories((err, categories) => {
    if (err) return res.status(400).json({ message: err.message });
    res.status(200).json(categories);
  });
};

// Actualizar
export const updateCategory = (req, res) => {
  categoryModel.updateCategory(req.params.id, req.body, (err, category) => {
    if (err) return res.status(400).json({ message: err.message });
    res.status(200).json(category);
  });
};

// Eliminar
export const deleteCategory = (req, res) => {
  categoryModel.deleteCategory(req.params.id, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    res.status(204).send();
  });
};
