import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="hero-badge">Calidad Premium</span>
        <h1>Los mejores cortes para tu mesa</h1>
        <p>
          Ofrecemos productos de la mas alta calidad, seleccionados 
          cuidadosamente para garantizar frescura, sabor y confianza en cada corte.
        </p>
        <div className="hero-buttons">
          <Link to="#productos" className="btn-primary">Ver Productos</Link>
          <Link to="/cart" className="btn-secondary">Mi Carrito</Link>
        </div>
      </div>
      <div className="hero-stats">
        <div className="stat">
          <span className="stat-number">500+</span>
          <span className="stat-label">Clientes felices</span>
        </div>
        <div className="stat">
          <span className="stat-number">50+</span>
          <span className="stat-label">Productos</span>
        </div>
        <div className="stat">
          <span className="stat-number">10+</span>
          <span className="stat-label">Anos de experiencia</span>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;