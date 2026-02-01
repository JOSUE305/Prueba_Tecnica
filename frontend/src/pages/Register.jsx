import { useState } from "react";
import { register as registerAPI } from "../services/api.js";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 👇 siempre rol cliente
    const res = await registerAPI({ username, password, role: "cliente" });

    if (res.id) {
      alert("Cuenta creada exitosamente ✅");
      navigate("/"); // 👈 al crear, vuelve al inicio
    } else {
      setError(res.message || "Error al crear cuenta ❌");
    }
  };

  return (
    <div className="register-page">
      <form className="register" onSubmit={handleSubmit}>
        <div className="register-header">
          <h2>Crear Cuenta</h2>
          <p>Regístrate para comenzar</p>
        </div>

        {error && <div className="register-error">{error}</div>}

        <div className="register-field">
          <label>Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Tu usuario"
            required
          />
        </div>

        <div className="register-field">
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Tu contraseña"
            required
          />
        </div>

        <button type="submit">Crear cuenta</button>
        <button type="button" onClick={() => navigate("/")}>
          ← Salir al inicio
        </button>
      </form>
    </div>
  );
}

export default Register;
