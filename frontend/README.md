# Carnicería JP – Frontend

Proyecto frontend desarrollado con React como parte del reto técnico
de periodo de prueba para el área de Desarrollo de Software.

## Objetivo
Crear la estructura base del frontend y validar el correcto funcionamiento
del entorno de desarrollo.

## Avance Día 1
- Proyecto creado con React y Vite.
- Configuración inicial del proyecto.
- Implementación de React Router.
- Creación de vistas base (Home y Login).
- Organización de carpetas del proyecto.

## Avance Día 2
Backend
- Endpoints de login con JWT y encriptación de contraseñas (bcrypt).
- Sistema de permisos para diferenciar administradores y clientes.
- Endpoints de categorías con CRUD completo.
- Endpoints de productos con CRUD y campo stock.
- Endpoints de carrito/órdenes con confirmación de compra, inserción de items y descuento automático de stock.
- Configuración de archivo .env para variables sensibles.
- Corrección de errores críticos (SQLITE_ERROR, items.forEach, ERR_CONNECTION_REFUSED).

Frontend
- Vista Products.jsx conectada al backend con CRUD de productos.
- Vista Cart.jsx con carrito en localStorage, cálculo de total y confirmación de compra.
- Conexión completa con el backend mediante fetch y token.
- Limpieza automática del carrito tras confirmar la compra.

## Tecnologías utilizadas
- React
- Vite
- JavaScript
- HTML
- CSS
- Git y GitHub

## Instalación y ejecución
```bash
npm install
npm run dev
