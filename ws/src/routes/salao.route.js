const express = require('express');
const salaoController = require('../controller/salaoController');
const salaoValidation = require('../middlewares/salaoValidation');
const router = express.Router();

router.post('/', salaoValidation, salaoController.newSalao);
router.get('/servicos/:salaoId', salaoController.servicosSalao);
router.get('/:salaoId', salaoController.getInfoSalaoById);


module.exports = router;