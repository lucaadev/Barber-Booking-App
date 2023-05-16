const express = require('express');
const colaboradorController = require('../controller/colaborador');
const router = express.Router();

router.post('/', colaboradorController.createNewColaborador);
router.post('/filter', colaboradorController.findByBodyFilter);


module.exports = router;