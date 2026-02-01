import { useEffect, useState } from "react";
import { getCategories } from "../services/api.js";

function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="filters">
      <button
        className={selected === "" ? "active" : ""}
        onClick={() => onSelect("")}
      >
        Todos
      </button>

      {categories.map((cat) => (
        <button
          key={cat.id}
          className={selected === String(cat.id) ? "active" : ""}
          onClick={() => onSelect(String(cat.id))}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
