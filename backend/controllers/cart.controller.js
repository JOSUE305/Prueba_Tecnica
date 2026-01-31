import * as Cart from '../models/cart.model.js';

// Agregar producto
export const addToCart = (req, res) => {
  const { product_id, quantity, price } = req.body;
  const userId = req.user.id;

  Cart.addToCart(userId, product_id, quantity, price, (err, item) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Producto agregado al carrito", item });
  });
};

// Ver carrito
export const getCart = (req, res) => {
  const userId = req.user.id;

  Cart.getCart(userId, (err, items) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(items);
  });
};

// Actualizar cantidad
export const updateCartItem = (req, res) => {
  const { quantity } = req.body;
  const { id } = req.params;

  Cart.updateCartItem(id, quantity, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Cantidad actualizada", result });
  });
};

// Eliminar item
export const removeFromCart = (req, res) => {
  const { id } = req.params;

  Cart.removeFromCart(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Producto eliminado del carrito", result });
  });
};
