const tutoresService = require('../services/tutores.service');

// GET /api/tutores
// Retorna todos los tutores activos
async function listar(req, res, next) {
  try {
    const tutores = await tutoresService.listarTutores();
    res.status(200).json(tutores);
  } catch (err) {
    next(err);
  }
}

// GET /api/tutores/:id
// Retorna el detalle de un tutor específico
async function obtener(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const tutor = await tutoresService.obtenerTutorPorId(id);
    res.status(200).json(tutor);
  } catch (err) {
    next(err);
  }
}

// GET /api/tutores/:id/agenda?fecha=YYYY-MM-DD
async function agenda(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const { fecha, turnoId } = req.query;
    const agendaTutor = await tutoresService.obtenerAgendaTutor(id, fecha, turnoId ? parseInt(turnoId) : null);
    res.status(200).json(agendaTutor);
  } catch (err) {
    next(err);
  }
}

module.exports = { listar, obtener, agenda };
