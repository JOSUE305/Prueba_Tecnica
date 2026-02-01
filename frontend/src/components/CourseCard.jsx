// 👇 mapa de categorías por ID
const categoryMap = {
  1: { name: "Res", emoji: "🥩" },
  2: { name: "Pollo", emoji: "🍗" },
  3: { name: "Cerdo", emoji: "🐷" },
  4: { name: "Pescado", emoji: "🐟" }
};

function CourseCard({ product }) {
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} agregado al carrito 🛒`);
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
      <p className="price">${Number(product.price).toFixed(2)}</p>
      <button onClick={handleAddToCart}>Agregar al carrito</button>
    </div>
  );
}

export default CourseCard;
