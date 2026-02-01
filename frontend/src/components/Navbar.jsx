import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

console.log("Usuario en Navbar:", user);

  return (
    <nav className="navbar">
      <h2>Carnicería JP</h2>

      <div>
        <Link to="/">Inicio</Link>
        <Link to="/cart">Carrito 🛒</Link>

        {!user && <Link to="/login">Login</Link>}

        {user && (
          <>
            <span>👤 {user.username}</span>
            <button onClick={logout}>Cerrar sesión</button>
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
