const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { validarBody } = require('../middlewares/validate.middleware');

router.post('/register', validarBody({
  requeridos: ['nombre', 'email', 'password'],
  permitidos: ['nombre', 'email', 'password']
}), authController.register);

router.post('/login', validarBody({
  requeridos: ['email', 'password'],
  permitidos: ['email', 'password']
}), authController.login);

module.exports = router;
