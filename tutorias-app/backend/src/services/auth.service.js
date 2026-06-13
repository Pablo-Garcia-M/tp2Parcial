const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const db     = require('../config/database');

function sanitizarUsuarioAuth(usuario) {
  return {
    id: usuario.id,
    nombre: usuario.nombre,
    rol: usuario.rol
  };
}

// ── REGISTRAR ────────────────────────────────────────────────────────────────

function registrar({ nombre, email, password }) {

  // 1. Validar que los campos obligatorios llegaron
  if (!nombre || !email || !password) {
    const err = new Error('Nombre, email y contraseña son obligatorios');
    err.status = 400;
    throw err;
  }

  const nombreNormalizado = nombre.trim().replace(/\s+/g, ' ');
  const partesNombre = nombreNormalizado.split(' ');
  if (partesNombre.length < 2) {
    const err = new Error('Ingresa nombre y apellido');
    err.status = 400;
    throw err;
  }

  // 2. El registro público solo puede crear estudiantes
  const rol = 'estudiante';

  // 3. Verificar que el email no esté en uso
  const todos = db.findAll('usuarios');
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].email === email) {
      const err = new Error('El email ya está registrado');
      err.status = 400;
      throw err;
    }
  }

  // 4. Hashear la contraseña
  const passwordHash = bcrypt.hashSync(password, 10);

  // 5. Insertar usuario en la base de datos
  const nuevoUsuario = db.insert('usuarios', {
    nombre: nombreNormalizado, email, passwordHash, rol, activo: true
  });

  // Devolvemos el usuario SIN el hash de contraseña
  return {
    id:     nuevoUsuario.id,
    nombre: nuevoUsuario.nombre,
    email:  nuevoUsuario.email,
    rol:    nuevoUsuario.rol
  };
}

// ── LOGIN ─────────────────────────────────────────────────────────────────────

function login({ email, password }) {

  if (!email || !password) {
    const err = new Error('Email y contraseña son obligatorios');
    err.status = 400;
    throw err;
  }

  // 1. Buscar el usuario por email
  const usuarios = db.findAll('usuarios');
  let usuario = null;
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email === email) {
      usuario = usuarios[i];
      break;
    }
  }

  if (!usuario) {
    const err = new Error('Email o contraseña incorrectos');
    err.status = 401;
    throw err;
  }

  if (!usuario.activo) {
    const err = new Error('Usuario inactivo. Contactá al administrador.');
    err.status = 401;
    throw err;
  }

  const passwordValida = bcrypt.compareSync(password, usuario.passwordHash);
  if (!passwordValida) {
    const err = new Error('Email o contraseña incorrectos');
    err.status = 401;
    throw err;
  }

  const payload = {
    id: usuario.id,
    nombre: usuario.nombre,
    rol: usuario.rol
  };

  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );

  return { token, usuario: sanitizarUsuarioAuth(payload) };
}

module.exports = { registrar, login };
