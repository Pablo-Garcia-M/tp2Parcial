const express = require('express');
const cors = require('cors');

const app = express();

// --- MIDDLEWARES GLOBALES ---
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// --- RUTAS ---
const authRoutes = require('./src/routes/auth.routes');
const tutoresRoutes = require('./src/routes/tutores.routes');
const turnosRoutes = require('./src/routes/turnos.routes');
const usuariosRoutes = require('./src/routes/usuarios.routes');

app.use('/api/auth', authRoutes);
app.use('/api/tutores', tutoresRoutes);
app.use('/api/turnos', turnosRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Ruta de health check — útil para saber si el servidor está vivo
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// --- ERROR HANDLER
const errorHandler = require('./src/middlewares/errorHandler.middleware');
app.use(errorHandler);

module.exports = app;
