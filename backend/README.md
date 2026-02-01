## 📕 Documentación – Backend
Proyecto: API Carnicería JP

# 📌 Descripción general

El backend es una API REST desarrollada con Node.js y Express, conectada a una base de datos SQLite.
Proporciona endpoints para autenticación, productos, categorías, carrito y órdenes, utilizando JWT para seguridad y roles para control de acceso.

# 🛠️ Tecnologías utilizadas

Node.js
Express
SQLite
JWT (jsonwebtoken)
bcrypt
dotenv
CORS

 ## 📂 Estructura del proyecto
backend
├── .env(posiblemente este se tiene que crear de 0)
├── .gitignore
├── README.md
├── config
│   └── db.js
├── controllers
│   ├── cart.controller.js
│   ├── category.controller.js
│   ├── orders.controller.js
│   ├── products.controller.js
│   └── user.controller.js
├── database.db
├── middlewares
│   └── user.middleware.js
├── models
│   ├── cart.model.js
│   ├── category.model.js
│   ├── orders.model.js
│   ├── product.model.js
│   └── user.model.js
├── node_modules
├── package-lock.json
├── package.json
├── routes
│   ├── cart.routes.js
│   ├── categories.routes.js
│   ├── orders.routes.js
│   ├── products.routes.js
│   └── user.routes.js
├── schema.sql
└── server.js

## 🔐Autenticación y seguridad
Autenticación basada en JWT
Middleware verifyToken
Middleware isAdmin

Roles:
admin
cliente

## 🧩 Endpoints principales

# 👤 Usuarios
Método	Endpoint	Descripción
POST	/api/users/register	Registro
POST	/api/users/login	Login

# 📦 Productos
Método	Endpoint	Rol

GET	/api/products	Público
POST	/api/products	Admin
PUT	/api/products/:id	Admin
DELETE	/api/products/:id	Admin

# 🗂️ Categorías
Método	Endpoint
GET	/api/categories
POST	/api/categories
PUT	/api/categories/:id
DELETE	/api/categories/:id

# 🛒 Carrito
Método	Endpoint
GET	/api/cart
POST	/api/cart
PUT	/api/cart/:id
DELETE	/api/cart/:id

# 📦 Órdenes
Método	Endpoint
POST	/api/orders
GET	/api/orders
GET	/api/orders/:id
GET	/api/orders/all (admin) (este endpoint no esta funcional, no esta acabado)

## 🗄️ Base de datos

# Tablas principales:
users
categories
products
orders
order_items

La base se inicializa automáticamente desde schema.sql.

## ▶️ Cómo ejecutar el backend

# Crear archivo .env:

SECRET_KEY=tu_clave_secreta
TOKEN_EXPIRATION=1h
BCRYPT_SALT_ROUNDS=10

# Instalar dependencias:
npm install

# Ejecutar servidor:
node server.js

# Servidor disponible en:
http://localhost:3000

## ✅ Buenas prácticas aplicadas
Arquitectura MVC
Separación de responsabilidades
Validación de roles
Manejo de errores
Seguridad con JWT y bcrypt

## Mejoras futuras

Refresh tokens
Logs
Tests unitarios
Paginación
Dockerización