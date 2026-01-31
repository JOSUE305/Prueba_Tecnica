import db from '../config/db.js';

// Crear un nuevo producto
export const createProduct = (product, callback) => {
    const { name, price, category_id } = product;
    db.run(
        `INSERT INTO products (name, price, category_id) VALUES (?, ?, ?)`,
        [name, price, category_id],
        function (err) {
            callback(err, { id: this.lastID, ...product });
        }
    );
};

// Obtener todos los productos
export const getProducts = (callback) => {
    db.all(`SELECT * FROM products`, [], (err, rows) => {
        callback(err, rows);
    });
};

// Actualizar un producto
export const updateProduct = (id, product, callback) => {
    const { name, price, category_id } = product;
    db.run(
        `UPDATE products SET name = ?, price = ?, category_id = ? WHERE id = ?`,
        [name, price, category_id, id],
        function (err) {
            callback(err, { id, ...product });
        }
    );
};

// Eliminar un producto
export const deleteProduct = (id, callback) => {
    db.run(`DELETE FROM products WHERE id = ?`, id, function (err) {
        callback(err);
    });
};