import { useEffect, useState } from "react";

function AboutSection() {
  const images = [
    "/images/corte1.jpeg",
    "/images/corte2.jpeg",
    "/images/corte3.jpeg",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000); // cambia cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="about">
      <div className="about-text">
        <h2>Carnicería JP</h2>
        <p>
          En Carnicería JP ofrecemos productos de la más alta calidad,
          seleccionados cuidadosamente para garantizar frescura, sabor y
          confianza en cada corte.
        </p>
        <p>
          Nuestro compromiso es llevar a tu mesa carnes premium al mejor precio,
          con atención cercana y servicio confiable.
        </p>
      </div>

      <div className="about-slider">
        <img src={images[current]} alt="Productos Carnicería JP" />
      </div>
    </section>
  );
}

export default AboutSection;
