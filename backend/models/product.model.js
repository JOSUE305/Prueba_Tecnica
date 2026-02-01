import db from "../config/db.js";

// Crear producto
export const createProduct = (product, callback) => {
  const { name, price, category_id, stock } = product;
  const sql = "INSERT INTO products (name, price, category_id, stock) VALUES (?, ?, ?, ?)";
  db.run(sql, [name, price, category_id, stock], function (err) {
    if (err) return callback(err);
    callback(null, { id: this.lastID, ...product });
  });
};

// Obtener productos
export const getProducts = (callback) => {
  const sql = "SELECT id, name, price, category_id, stock FROM products";
  db.all(sql, [], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
};

// Actualizar producto
export const updateProduct = (id, product, callback) => {
  const { name, price, category_id, stock } = product;
  const sql = "UPDATE products SET name = ?, price = ?, category_id = ?, stock = ? WHERE id = ?";
  db.run(sql, [name, price, category_id, stock, id], function (err) {
    if (err) return callback(err);
    callback(null, { id, ...product });
  });
};

// Eliminar producto
export const deleteProduct = (id, callback) => {
  const sql = "DELETE FROM products WHERE id = ?";
  db.run(sql, [id], function (err) {
    if (err) return callback(err);
    callback(null);
  });
};
