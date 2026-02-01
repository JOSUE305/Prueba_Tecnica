import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setItems(savedCart);
  }, []);

  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  // aumentar cantidad
  const increaseQuantity = (index) => {
    const updated = [...items];
    updated[index].quantity += 1;
    setItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // disminuir cantidad
  const decreaseQuantity = (index) => {
    const updated = [...items];
    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
      setItems(updated);
      localStorage.setItem("cart", JSON.stringify(updated));
    }
  };

  // eliminar producto
  const removeItem = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

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
    <div className="cart">
      <h2>🛒 Mi Carrito</h2>

      {items.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                  <td>${item.quantity * item.price}</td>
                  <td>
                    <button onClick={() => increaseQuantity(idx)}>➕</button>
                    <button onClick={() => decreaseQuantity(idx)}>➖</button>
                    <button onClick={() => removeItem(idx)}>❌</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Total: ${total}</h3>
          <button onClick={handleCheckout}>Confirmar compra</button>
        </div>
      )}
    </div>
  );
}

export default Cart;
