import { useEffect, useState } from "react";
import { getProducts, addProduct, updateProduct, deleteProduct, getCategories } from "../services/api.js";
import CategoryFilter from "../components/CategoryFilter"; // 👈 importa el filtro

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "", category_id: "" });
  const [editing, setEditing] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchData() {
      const dataProducts = await getProducts();
      setProducts(dataProducts);
      setFilteredProducts(dataProducts); // inicializa filtro

      const dataCategories = await getCategories();
      setCategories(dataCategories);
    }
    fetchData();
  }, []);

  // filtrar productos por categoría
  const handleFilter = (categoryId) => {
    if (!categoryId) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category_id === Number(categoryId)));
    }
  };

  // agregar producto
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("Debes iniciar sesión como admin para agregar productos");
      return;
    }
    const res = await addProduct(token, newProduct);
    alert(res.message);
    setNewProduct({ name: "", price: "", stock: "", category_id: "" });
    const data = await getProducts();
    setProducts(data);
    setFilteredProducts(data);
  };

  // actualizar producto
  const handleUpdate = async (id) => {
    if (!token) {
      alert("Debes iniciar sesión como admin para actualizar productos");
      return;
    }
    const res = await updateProduct(token, id, editing);
    alert(res.message);
    setEditing(null);
    const data = await getProducts();
    setProducts(data);
    setFilteredProducts(data);
  };

  // eliminar producto
  const handleDelete = async (id) => {
    if (!token) {
      alert("Debes iniciar sesión como admin para eliminar productos");
      return;
    }
    const res = await deleteProduct(token, id);
    alert(res.message);
    const data = await getProducts();
    setProducts(data);
    setFilteredProducts(data);
  };

  return (
    <div>
      <h2>📦 Gestión de Productos</h2>

      {/* Filtro dinámico */}
      <CategoryFilter onFilter={handleFilter} />

      {/* Formulario para agregar */}
      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Nombre"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Precio"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
        />
        <select
          value={newProduct.category_id}
          onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}
        >
          <option value="">Selecciona categoría</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <button type="submit">Agregar producto</button>
      </form>

      {/* Lista de productos filtrados */}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((p) => (
            <tr key={p.id}>
              <td>
                {editing?.id === p.id ? (
                  <input
                    value={editing.name}
                    onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  />
                ) : (
                  p.name
                )}
              </td>
              <td>
                {editing?.id === p.id ? (
                  <input
                    type="number"
                    value={editing.price}
                    onChange={(e) => setEditing({ ...editing, price: e.target.value })}
                  />
                ) : (
                  `$${p.price}`
                )}
              </td>
              <td>
                {editing?.id === p.id ? (
                  <input
                    type="number"
                    value={editing.stock}
                    onChange={(e) => setEditing({ ...editing, stock: e.target.value })}
                  />
                ) : (
                  p.stock
                )}
              </td>
              <td>
                {editing?.id === p.id ? (
                  <select
                    value={editing.category_id}
                    onChange={(e) => setEditing({ ...editing, category_id: e.target.value })}
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  categories.find((c) => c.id === p.category_id)?.name || "Sin categoría"
                )}
              </td>
              <td>
                {editing?.id === p.id ? (
                  <>
                    <button onClick={() => handleUpdate(p.id)}>Guardar</button>
                    <button onClick={() => setEditing(null)}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setEditing(p)}>Editar</button>
                    <button onClick={() => handleDelete(p.id)}>Eliminar</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
