function CourseCard({ product }) {
  return (
    <div className="card">
      <div className="card-image">🥩</div>

      <h3>{product.name}</h3>
      <p>Categoría: {product.category}</p>
      <p className="price">${product.price}</p>

      <button>Ver producto</button>
    </div>
  );
}

export default CourseCard;
