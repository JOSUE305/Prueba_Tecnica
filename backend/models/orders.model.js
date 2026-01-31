import db from '../config/db.js';

// Crear un nuevo pedido
export const createOrder = (userId, total, callback) => {
  const query = `INSERT INTO orders (user_id, total) VALUES (?, ?)`;
  db.run(query, [userId, total], function (err) {
    callback(err, { id: this.lastID });
  });
};

// Obtener todos los pedidos de un usuario
export const getOrdersByUser = (userId, callback) => {
  const query = `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`;
  db.all(query, [userId], (err, rows) => {
    callback(err, rows);
  });
};

// Obtener detalle de un pedido con sus productos
export const getOrderDetails = (orderId, callback) => {
  const query = `
    SELECT o.id as order_id, o.total, o.created_at,
           oi.id as item_id, oi.product_id, p.name, oi.quantity, oi.price
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    JOIN products p ON oi.product_id = p.id
    WHERE o.id = ?
  `;
  db.all(query, [orderId], (err, rows) => {
    callback(err, rows);
  });
};
