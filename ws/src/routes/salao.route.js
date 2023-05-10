const express = require('express');
const salaoController = require('../controller/salaoController');
const salaoValidation = require('../middlewares/salaoValidation');
const router = express.Router();

router.post('/', salaoValidation, salaoController.newSalao);
router.get('/:salaoId', salaoController.servicosSalao);


module.exports = router;