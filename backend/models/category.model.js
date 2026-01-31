// models/category.model.js
import db from '../config/db.js';

// Crear categoría
export const createCategory = (data, callback) => {
  const { name } = data;
  const sql = `INSERT INTO categories (name) VALUES (?)`;
  db.run(sql, [name], function(err) {
    if (err) return callback(err);
    callback(null, { id: this.lastID, name });
  });
};

// Obtener todas las categorías
export const getCategories = (callback) => {
  const sql = `SELECT * FROM categories`;
  db.all(sql, [], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
};

// Actualizar categoría
export const updateCategory = (id, data, callback) => {
  const { name } = data;
  const sql = `UPDATE categories SET name = ? WHERE id = ?`;
  db.run(sql, [name, id], function(err) {
    if (err) return callback(err);
    callback(null, { id, name });
  });
};

// Eliminar categoría
export const deleteCategory = (id, callback) => {
  const sql = `DELETE FROM categories WHERE id = ?`;
  db.run(sql, [id], function(err) {
    if (err) return callback(err);
    callback(null);
  });
};
