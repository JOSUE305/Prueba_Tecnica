import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";
import CategoryFilter from "../components/CategoryFilter";
import AboutSection from "../components/AboutSection";
import { getProducts } from "../services/api.js";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getProducts(); // llamada al backend
      console.log("Productos desde API:", data); // 👀 log para verificar
      setProducts(data);
    }
    fetchData();
  }, []);

  return (
    <>
      <Navbar />

      <main className="container">
        <h1>Carnicería JP 🥩</h1>
        <p>Los mejores cortes al mejor precio</p>

        <AboutSection />

        <CategoryFilter />

        <div className="grid">
          {products.map((product) => (
            <CourseCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </>
  );
}

export default Home;
