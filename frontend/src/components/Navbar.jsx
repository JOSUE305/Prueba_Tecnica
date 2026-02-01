import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  console.log("Usuario en Navbar:", user);

  return (
    <nav className="navbar">
      {/* Marca / logo */}
      <Link to="/" className="navbar-brand">
        <h2>Carnicería JP</h2>
      </Link>

      {/* Enlaces */}
      <div className="navbar-links">
        <Link to="/">Inicio</Link>
        <Link to="/cart">Carrito 🛒</Link>

        {!user && (
          <Link to="/login" className="navbar-login">
            Iniciar Sesión
          </Link>
        )}

        {user && (
          <>
            <span className="navbar-user">👤 {user.username}</span>
            <button onClick={logout}>Salir</button>

            {/* 👇 enlaces solo para admin */}
            {user.role === "admin" && (
              <>
                <Link to="/products">Productos</Link>
                <Link to="/categories">Categorías</Link>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
