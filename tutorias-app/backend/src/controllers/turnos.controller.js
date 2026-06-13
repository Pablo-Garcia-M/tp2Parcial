const turnosService = require('../services/turnos.service');

// GET /api/turnos
async function listar(req, res, next) {
  try {
    const filtros = req.query;

    const resultado = await turnosService.listarTurnos(filtros, req.user);
    res.status(200).json(resultado);
  } catch (err) {
    next(err);
  }
}

// GET /api/turnos/resumen
// Solo para admin — muestra estadísticas del sistema
async function resumen(req, res, next) {
  try {
    const datos = await turnosService.obtenerResumen();
    res.status(200).json(datos);
  } catch (err) {
    next(err);
  }
}

// GET /api/turnos/:id
// Detalle de un turno específico
async function obtener(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const turno = await turnosService.obtenerTurnoPorId(id, req.user);
    res.status(200).json(turno);
  } catch (err) {
    next(err);
  }
}

// GET /api/turnos/:id/historial
// Historial de cambios de un turno
async function historial(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const hist = await turnosService.obtenerHistorial(id, req.user);
    res.status(200).json(hist);
  } catch (err) {
    next(err);
  }
}

// POST /api/turnos
async function crear(req, res, next) {
  try {
    const turno = await turnosService.crearTurno(req.body, req.user);
    res.status(201).json(turno);
  } catch (err) {
    next(err);
  }
}

// PUT /api/turnos/:id
// Edita un turno existente (fecha, hora, tema, modalidad, observaciones)
async function editar(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const turno = await turnosService.editarTurno(id, req.body, req.user.id, req.user.rol);
    res.status(200).json(turno);
  } catch (err) {
    next(err);
  }
}

// PATCH /api/turnos/:id/cancelar
// Cambia el estado a "cancelado"
async function cancelar(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const observaciones = req.body?.observaciones;
    const turno = await turnosService.cancelarTurno(id, req.user.id, req.user.rol, observaciones);
    res.status(200).json(turno);
  } catch (err) {
    next(err);
  }
}

// PATCH /api/turnos/:id/confirmar
// Cambia el estado a "confirmado" — solo tutor asignado o admin
async function confirmar(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const turno = await turnosService.confirmarTurno(id, req.user.id, req.user.rol);
    res.status(200).json(turno);
  } catch (err) {
    next(err);
  }
}

// PATCH /api/turnos/:id/realizar
// Cambia el estado a "realizado" — solo tutor asignado o admin
async function realizar(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const observaciones = req.body?.observaciones || '';
    const turno = await turnosService.realizarTurno(id, observaciones, req.user.id, req.user.rol);
    res.status(200).json(turno);
  } catch (err) {
    next(err);
  }
}

module.exports = { listar, resumen, obtener, historial, crear, editar, cancelar, confirmar, realizar };
