const express = require('express');
const router = express.Router();
const clienteController = require('../controller/cliente');

router.post('/', clienteController.createCliente);

module.exports = router;