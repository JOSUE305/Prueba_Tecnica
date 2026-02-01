import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import CategoryFilter from "../components/CategoryFilter";
import CourseCard from "../components/CourseCard";
import Footer from "../components/Footer";
import { getProducts, getCategories } from "../services/api.js";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    async function fetchData() {
      const dataProducts = await getProducts();
      console.log("Productos desde API:", dataProducts);
      setProducts(dataProducts);

      const dataCategories = await getCategories();
      setCategories(dataCategories);
    }
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Filtrado por categoría
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category_id === Number(selectedCategory))
    : products;

  // Agregar al carrito
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  return (
    <div className="home">
      <Navbar />
      <HeroSection />

      <main className="container">
        <AboutSection />

        <section className="products-section">
          <h2 className="section-title">Nuestros Productos</h2>
          <p className="section-subtitle">
            Selecciona una categoría para filtrar
          </p>

          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />

          <div className="grid">
            {filteredProducts.map((product) => (
              <CourseCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
