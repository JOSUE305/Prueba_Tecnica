import { useEffect, useState } from "react";
import { getCategories } from "../services/api.js";

function CategoryFilter({ onFilter }) {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(""); // 👈 categoría seleccionada

  useEffect(() => {
    async function fetchCategories() {
      const data = await getCategories();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  const handleSelect = (categoryId) => {
    setSelected(categoryId);
    onFilter(categoryId || null); // 👈 null para "Todos"
  };

  return (
    <div className="filters">
      <button
        className={selected === "" ? "active" : ""}
        onClick={() => handleSelect("")}
      >
        Todos
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={selected === cat.id ? "active" : ""}
          onClick={() => handleSelect(cat.id)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
