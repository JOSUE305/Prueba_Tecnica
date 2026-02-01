## 📘 Documentación – Frontend
Proyecto: Carnicería JP
# 📌 Descripción general

El frontend de Carnicería JP es una aplicación web desarrollada con React + Vite que permite a los usuarios visualizar productos, filtrarlos por categoría, gestionar un carrito de compras y realizar pedidos.
Además, cuenta con un sistema de autenticación, roles de usuario (cliente / admin) y vistas administrativas para la gestión de productos y órdenes.

El frontend se comunica con un backend REST mediante peticiones HTTP protegidas con JWT.

# 🛠️ Tecnologías utilizadas
React
Vite
JavaScript (ES6+)
React Router DOM
Context API
HTML5 / CSS3
Fetch API
LocalStorage

# 📂 Estructura del proyecto
frontend/
├── public/
│   └── images, logos
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── HeroSection.jsx
│   │   ├── AboutSection.jsx
│   │   ├── CategoryFilter.jsx
│   │   ├── CourseCard.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Cart.jsx
│   │   ├── Products.jsx
│   │   ├── Categories.jsx
│   │   ├── AdminOrders.jsx
│   │   └── OrderDetails.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── services/
│   │   └── api.js
│   ├── styles/
│   │   └── main.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
└── package.json


## ⚙️ Funcionalidades principales

# 👤 Autenticación
Registro e inicio de sesión
Manejo de sesión mediante JWT
Persistencia de usuario en localStorage

# 🗂️ Filtrado por categorías
Las categorías se obtienen desde la API
Filtrado dinámico sin recargar la página

# 🛒 Carrito de compras
Agregar productos al carrito
Modificar cantidades respetando el stock
Eliminar productos
Confirmar compra (checkout)

# 🛠️ Panel de administración
Gestión de productos (CRUD)
Visualización de órdenes
Acceso restringido por rol admin

# 🔄 Flujo general

El usuario se autentica
Se obtiene un token JWT
El token se envía en cada request protegida
El backend valida permisos
Se renderiza la información correspondiente

## Cómo ejecutar el frontend
npm install
npm run dev

Abrir en el navegador:
http://localhost:5173

## 🚀 Posibles mejoras

Manejo de errores con notificaciones
Paginación de productos
obtener todas las ordenes de los usuarios con el admin
Búsqueda por nombre
Mejoras de UI/UX
Estado global con Redux