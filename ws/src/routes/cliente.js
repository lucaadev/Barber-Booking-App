const express = require('express');
const router = express.Router();
const clienteValidation = require('../middlewares/clienteValidation');
const clienteController = require('../controller/cliente');

router.post('/', clienteValidation, clienteController.createCliente);

module.exports = router;