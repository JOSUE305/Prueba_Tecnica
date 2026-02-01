function CourseCard({ product }) {
  const handleAddToCart = () => {
    // obtener carrito actual desde localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // buscar si el producto ya está en el carrito
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    // guardar carrito actualizado
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} agregado al carrito 🛒`);
  };

  return (
    <div className="card">
      <div className="card-image">🥩</div>
      <h3>{product.name}</h3>
      <p>Categoría: {product.category_id}</p>
      <p className="price">${product.price}</p>
      <button onClick={handleAddToCart}>Agregar al carrito</button>
    </div>
  );
}

export default CourseCard;
