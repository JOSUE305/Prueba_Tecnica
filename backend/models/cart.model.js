import db from '../config/db.js';

// Agregar producto al carrito (tabla temporal o directamente order_items sin order_id aún)
export const addToCart = (userId, productId, quantity, price, callback) => {
  const query = `
    INSERT INTO order_items (order_id, product_id, quantity, price)
    VALUES (NULL, ?, ?, ?)
  `;
  db.run(query, [productId, quantity, price], function (err) {
    callback(err, { id: this.lastID });
  });
};


// Obtener carrito del usuario (items sin order_id confirmado)
export const getCart = (userId, callback) => {
  const query = `
    SELECT oi.id, oi.product_id, p.name, oi.quantity, oi.price, p.stock
    FROM order_items oi
    JOIN products p ON oi.product_id = p.id
    WHERE oi.order_id IS NULL
  `;
  db.all(query, [], (err, rows) => {
    callback(err, rows);
  });
};


// Actualizar cantidad
export const updateCartItem = (id, quantity, callback) => {
  const query = `UPDATE order_items SET quantity = ? WHERE id = ? AND order_id IS NULL`;
  db.run(query, [quantity, id], function (err) {
    callback(err, { changes: this.changes });
  });
};

// Eliminar item
export const removeFromCart = (id, callback) => {
  const query = `DELETE FROM order_items WHERE id = ? AND order_id IS NULL`;
  db.run(query, [id], function (err) {
    callback(err, { changes: this.changes });
  });
};
