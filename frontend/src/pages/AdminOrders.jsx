import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setOrders(data);
        } else {
          alert(data.message || "Error al cargar órdenes ❌");
        }
      } catch (err) {
        alert("Error de conexión con el servidor");
      }
    };

    fetchOrders();
  }, [navigate]);

  return (
    <div className="admin-orders">
      <h2>📦 Órdenes de Usuarios</h2>
      <button type="button" onClick={() => navigate(-1)}>
      ← Regresar
      </button>
      {orders.length === 0 ? (
        <p>No hay órdenes registradas</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID Orden</th>
              <th>Usuario</th>
              <th>Total</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} onClick={() => navigate(`/orders/${order.id}`)}>
                <td>{order.id}</td>
                <td>Usuario #{order.user_id}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>{order.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminOrders;
