const express = require('express');
const horarioController = require('../controller/horario');
const router = express.Router();

router.post('/', horarioController.newHorario);

module.exports = router;