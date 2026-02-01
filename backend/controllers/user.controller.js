import * as userModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = (process.env.SECRET_KEY || "").trim();
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION || "1h";

// Registro
export const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    const validRoles = ["admin", "cliente"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Rol inválido" });
    }

    userModel.createUser({ username, password, role }, (err, user) => {
      if (err) return res.status(400).json({ message: err.message });
      res.status(201).json(user);
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el registro", error: error.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Usuario y contraseña requeridos" });
    }

    userModel.findUserByUsername(username, async (err, user) => {
      if (err || !user) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        SECRET_KEY,
        { expiresIn: TOKEN_EXPIRATION }
      );

      // 👇 ahora devolvemos también username y role
      res.json({
        token,
        username: user.username,
        role: user.role
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el login", error: error.message });
  }
};
