import express from 'express';
import bodyParser from 'body-parser';
import productsRoutes from './routes/products.routes.js';
import categoryRoutes from './routes/categories.routes.js';
import userRoutes from './routes/user.routes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Rutas
app.use('/api/products', productsRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
