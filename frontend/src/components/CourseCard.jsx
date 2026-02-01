// 👇 mapa de categorías por ID
const categoryMap = {
  1: { name: "Res", emoji: "🥩" },
  2: { name: "Pollo", emoji: "🍗" },
  3: { name: "Cerdo", emoji: "🐷" },
  4: { name: "Pescado", emoji: "🐟" }
};

function CourseCard({ product }) {
  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión para agregar al carrito ✅");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity: 1,
          price: product.price,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(`${product.name} agregado al carrito 🛒`);
      } else {
        alert(data.message || "Error al agregar producto ❌");
      }
    } catch (err) {
      alert("Error de conexión con el servidor");
    }
  };

  // 👇 obtenemos nombre y emoji desde el mapa
  const categoryInfo = categoryMap[product.category_id] || {
    name: "Sin categoría",
    emoji: "🍖"
  };

  return (
    <div className="card">
      <div className="card-image">{categoryInfo.emoji}</div>
      <h3>{product.name}</h3>
      <p className="card-category">Categoría: {categoryInfo.name}</p>
      <p className="card-stock">Stock disponible: {product.stock}</p>
      <p className="price">${Number(product.price).toFixed(2)}</p>
      <button 
        onClick={handleAddToCart} 
        disabled={product.stock === 0}
      >
        {product.stock === 0 ? "Sin stock ❌" : "Agregar al carrito"}
      </button>
    </div>
  );
}

export default CourseCard;

