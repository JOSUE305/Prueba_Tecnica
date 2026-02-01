import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Cart() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  // aumentar/disminuir cantidad
  const updateQuantity = (id, delta) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // eliminar producto
  const removeItem = (id) => {
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

    try {
      const res = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: items.map((i) => ({
            product_id: i.id,
            quantity: i.quantity,
            price: i.price,
          })),
          total,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Compra confirmada 🚀");
        localStorage.removeItem("cart");
        setItems([]);
      } else {
        alert(data.message || "Error al confirmar compra");
      }
    } catch (err) {
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div className="cart-page">
      <div className="cart">
        <h2>🛒 Mi Carrito</h2>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Tu carrito está vacío</p>
            <Link to="/" className="btn-primary">
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
                        <button onClick={() => updateQuantity(item.id, -1)}>
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)}>
                          +
                        </button>
                      </div>
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        className="btn-remove"
                        onClick={() => removeItem(item.id)}
                      >
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
