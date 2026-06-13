const authService = require('../services/auth.service');

// POST /api/auth/register
// Registra un nuevo usuario
async function register(req, res, next) {
  try {
    const { nombre, email, password } = req.body;

    const usuario = await authService.registrar({ nombre, email, password });

    res.status(201).json({
      mensaje: 'Usuario registrado exitosamente',
      usuario
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/auth/login
// Verifica credenciales y devuelve JWT
async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const resultado = await authService.login({ email, password });
    res.status(200).json(resultado);
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };
