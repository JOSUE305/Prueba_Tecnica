import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";
import CategoryFilter from "../components/CategoryFilter";
import AboutSection from "../components/AboutSection";
import { getProducts } from "../services/api.js";

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getProducts(); // llamada al backend
      console.log("Productos desde API:", data); // 👀 log para verificar
      setProducts(data);
      setFilteredProducts(data); // inicializa con todos
    }
    fetchData();
  }, []);

  // función para filtrar
  const handleFilter = (categoryId) => {
    if (!categoryId) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category_id === Number(categoryId)));
    }
  };

  return (
    <>
      <Navbar />

      <main className="container">
        <h1>Carnicería JP 🥩</h1>
        <p>Los mejores cortes al mejor precio</p>

        <AboutSection />

        {/* 👇 ahora sí pasamos la función */}
        <CategoryFilter onFilter={handleFilter} />

        <div className="grid">
          {filteredProducts.map((product) => (
            <CourseCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </>
  );
}

export default Home;
