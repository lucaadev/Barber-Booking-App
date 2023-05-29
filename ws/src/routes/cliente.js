const express = require('express');
const router = express.Router();
const clienteValidation = require('../middlewares/clienteValidation');
const clienteController = require('../controller/cliente');

router.get('/salao/:id', clienteController.allClientesOfSalao);

router.post('/filter', clienteController.getClientes);
router.post('/', clienteValidation, clienteController.createCliente);

router.put('/:id', clienteValidation, clienteController.updatedCliente);

router.delete('/delete/:id', clienteController.deleteCliente);

module.exports = router;