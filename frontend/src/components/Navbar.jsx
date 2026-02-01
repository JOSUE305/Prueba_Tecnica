import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <h2>Carnicería JP</h2>

      <div>
        <Link to="/">Inicio</Link>
        <Link to="/cart">Carrito 🛒</Link> {/* 👈 enlace al carrito */}

        {!user && <Link to="/login">Login</Link>}

        {user && (
          <>
            <span>👤 {user.username}</span>
            <button onClick={logout}>Cerrar sesión</button>
            <Link to="/products">Productos</Link>
            <Link to="/categories">Categorías</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
