import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Cart() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  // cargar carrito desde backend
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setItems(data);
      } catch (err) {
        alert("Error al cargar carrito ❌");
      }
    };

    fetchCart();
  }, [navigate]);

  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  // aumentar/disminuir cantidad con límite de stock
  const updateQuantity = async (id, newQuantity, stock) => {
    if (newQuantity < 1 || newQuantity > stock) return;
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:3000/api/cart/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity: newQuantity }),
    });
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // eliminar producto
  const removeItem = async (id) => {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:3000/api/cart/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // checkout con backend
  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión para confirmar tu compra ✅");
      navigate("/login");
      return;
    }

    const res = await fetch("http://localhost:3000/api/orders", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.ok) {
      alert("Compra confirmada 🚀");
      setItems([]);
    } else {
      alert(data.message || "Error al confirmar compra ❌");
    }
  };

  return (
    <div className="cart-page">
      <div className="cart">
        <h2>🛒 Mi Carrito</h2>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Tu carrito está vacío</p>
            <Link to="/#productos" className="btn-primary">
              Ver productos
            </Link>
          </div>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Stock</th>
                  <th>Subtotal</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>
                      <div className="quantity-controls">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1, item.stock)
                          }
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1, item.stock)
                          }
                          disabled={item.quantity >= item.stock}
                        >
                          +
                        </button>
                      </div>
                      <small className="stock-label">Stock disponible: {item.stock}</small>
                    </td>
                    <td>{item.stock}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button className="btn-remove" onClick={() => removeItem(item.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="cart-summary">
              <h3>Total: ${total.toFixed(2)}</h3>
              <button className="btn-checkout" onClick={handleCheckout}>
                Finalizar Compra
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
