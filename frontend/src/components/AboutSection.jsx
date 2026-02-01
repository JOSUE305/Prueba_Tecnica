import { useState, useEffect } from "react";

function AboutSection() {
  // 👇 usa tus imágenes locales, pero puedes mezclar con URLs si quieres
  const images = [
   'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&q=80',
  'https://images.unsplash.com/photo-1588347818036-558601350947?w=600&q=80',
  'https://images.unsplash.com/photo-1551028150-64b9f398f678?w=600&q=80'
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000); // cambia cada 4 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="about">
      {/* Texto descriptivo */}
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

        {/* 👇 features con íconos */}
        <div className="about-features">
          <div className="feature">
            <span className="feature-icon">✓</span>
            <span>Productos frescos diarios</span>
          </div>
          <div className="feature">
            <span className="feature-icon">✓</span>
            <span>Atención personalizada</span>
          </div>
          <div className="feature">
            <span className="feature-icon">✓</span>
            <span>Precios competitivos</span>
          </div>
        </div>
      </div>

      {/* Slider con dots */}
      <div className="about-slider">
        <img
          src={images[currentImage] || "/placeholder.svg"}
          alt="Carnicería JP"
        />
        <div className="slider-dots">
          {images.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentImage ? "active" : ""}`}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
