function autorizar(...rolesPermitidos) {
  return function (req, res, next) {

    const rol = req.user.rol;
    if (!rolesPermitidos.includes(rol)) {
      return res.status(403).json({
        error: `Acceso denegado. Se requiere uno de estos roles: ${rolesPermitidos.join(', ')}`
      });
    }

    next();
  };
}

module.exports = autorizar;
