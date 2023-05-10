const express = require('express');
const servicoController = require('../controller/servicoController');

const router = express.Router();

router.post('/', servicoController.newServico);


module.exports = router;