import { useState, useContext } from "react";
import { login as loginAPI } from "../services/api.js";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await loginAPI(username, password);

    if (res.token) {
      // 👇 guardamos username y role en el contexto
      login({ username: res.username, role: res.role }, res.token);
      alert("Login exitoso ✅");
      navigate("/");
    } else {
      setError(res.message || "Usuario o contraseña incorrectos ❌");
    }
  };

  return (
    <div className="login-page">
      <form className="login" onSubmit={handleSubmit}>
        <div className="login-header">
          <h2>Iniciar Sesión</h2>
          <p>Ingresa tus credenciales para continuar</p>
        </div>

        {error && <div className="login-error">{error}</div>}

        <div className="login-field">
          <label>Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Tu usuario"
            required
          />
        </div>

        <div className="login-field">
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Tu contraseña"
            required
          />
        </div>

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
