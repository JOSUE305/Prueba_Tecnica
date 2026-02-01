import { useState, useContext } from "react";
import { login as loginAPI } from "../services/api.js";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginAPI(username, password);

    if (res.token) {
  // 👇 ahora usamos el username y role que devuelve el backend
  login({ username: res.username, role: res.role }, res.token);
  alert("Login exitoso ✅");
  navigate("/");
} else {
  alert(res.message || "Credenciales inválidas ❌");
}

  };

  return (
    <div className="login">
      <h2>Iniciar sesión</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
