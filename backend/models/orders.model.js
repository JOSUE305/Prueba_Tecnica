import db from "../config/db.js";

// Crear un nuevo pedido con items y actualizar stock
export const createOrder = (userId, total, items, callback) => {
  const queryOrder = `INSERT INTO orders (user_id, total, created_at) VALUES (?, ?, datetime('now'))`;

  db.run(queryOrder, [userId, total], function (err) {
    if (err) return callback(err);

    const orderId = this.lastID;

    items.forEach((item) => {
      // validar stock
      const checkStock = `SELECT stock FROM products WHERE id = ?`;
      db.get(checkStock, [item.product_id], (err, row) => {
        if (err) return callback(err);
        if (!row || row.stock < item.quantity) {
          return callback(new Error(`Stock insuficiente para producto ${item.product_id}`));
        }

        // insertar item
        const queryItem = `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)`;
        db.run(queryItem, [orderId, item.product_id, item.quantity, item.price]);

        // descontar stock
        const queryStock = `UPDATE products SET stock = stock - ? WHERE id = ?`;
        db.run(queryStock, [item.quantity, item.product_id]);
      });
    });

    callback(null, { id: orderId, message: "Orden creada y stock actualizado" });
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
