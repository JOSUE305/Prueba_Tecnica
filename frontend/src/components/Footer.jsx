function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>Carniceria JP</h3>
          <p>Calidad y frescura en cada corte desde hace mas de 10 años.</p>
        </div>
        <div className="footer-links">
          <h4>Enlaces</h4>
          <a href="/">Inicio</a>
          <a href="/products">Productos</a>
          <a href="/cart">Carrito</a>
        </div>
        <div className="footer-contact">
          <h4>Contacto</h4>
          <p>Tel: (123) 456-7890</p>
          <p>Email: info@carniceriajp.com</p>
          <p>Direccion: Calle Principal #123</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Carniceria JP. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;