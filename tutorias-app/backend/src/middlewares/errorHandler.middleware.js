function errorHandler(err, req, res, next) {
  const status  = err.status  || 500;
  const mensaje = err.message || 'Error interno del servidor';

  if (process.env.NODE_ENV !== 'production') {
    console.error(`[ERROR ${status}]`, err.message);
  }
  res.status(status).json({ error: mensaje });
}

module.exports = errorHandler;
