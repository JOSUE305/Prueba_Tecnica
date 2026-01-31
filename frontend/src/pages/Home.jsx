import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";
import CategoryFilter from "../components/CategoryFilter";
import AboutSection from "../components/AboutSection";


function Home() {
  // Datos simulados (luego vendrán de la API)
  const products = [
    {
      id: 1,
      name: "Bistec de Res",
      category: "Res",
      price: 189,
    },
    {
      id: 2,
      name: "Pechuga de Pollo",
      category: "Pollo",
      price: 120,
    },
    {
      id: 3,
      name: "Chuleta de Cerdo",
      category: "Cerdo",
      price: 135,
    },
  ];

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
