import { useEffect, useState } from "react";
import { getCategories } from "../services/api.js";

function CategoryFilter({ onFilter }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const data = await getCategories(); 
      setCategories(data);
    }
    fetchCategories();
  }, []);

  return (
    <div className="filters">
      <button onClick={() => onFilter(null)}>Todos</button>
      {categories.map((c) => (
        <button key={c.id} onClick={() => onFilter(c.id)}>
          {c.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
