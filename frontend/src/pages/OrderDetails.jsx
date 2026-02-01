import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";

function OrderDetails() {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchDetails = async () => {
      const res = await fetch(`http://localhost:3000/api/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setItems(data);
    };
    fetchDetails();
  }, [id]);

  return (
    <div>
      <h2>Detalles de la Orden #{id}</h2>
      <button type="button" onClick={() => navigate(-1)}>
        ← Regresar
        </button>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.item_id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderDetails;
