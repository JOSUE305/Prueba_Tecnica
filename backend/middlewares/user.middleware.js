// middleware/auth.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; 
dotenv.config();



const SECRET_KEY = process.env.SECRET_KEY;

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "Token requerido" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Acceso solo para administradores" });
  }
  next();
};
