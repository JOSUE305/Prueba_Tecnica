import * as Orders from '../models/orders.model.js';
import db from '../config/db.js';

// Confirmar pedido desde el carrito
export const confirmOrder = (req, res) => {
  const userId = req.user.id;

  const queryCart = `
    SELECT oi.id, oi.product_id, oi.quantity, oi.price
    FROM order_items oi
    WHERE oi.order_id IS NULL
  `;

  db.all(queryCart, [], (err, items) => {
    if (err) return res.status(500).json({ error: err.message });
    if (items.length === 0) return res.status(400).json({ message: "Carrito vacío" });

    const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

        Orders.createOrder(userId, total, items, (err, order) => {
    if (err) return res.status(500).json({ error: err.message });

    const updateItems = `UPDATE order_items SET order_id = ? WHERE order_id IS NULL`;
    db.run(updateItems, [order.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        res.json({
        message: "Pedido confirmado",
        order_id: order.id,
        total,
        items
         });
        });
    });
  });
};

// Ver todos los pedidos del usuario
export const getOrders = (req, res) => {
  const userId = req.user.id;

  Orders.getOrdersByUser(userId, (err, orders) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(orders);
  });
};

// Ver detalle de un pedido
export const getOrderById = (req, res) => {
  const { id } = req.params;

  Orders.getOrderDetails(id, (err, details) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(details);
  });
};
