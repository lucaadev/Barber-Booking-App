const express = require('express');
const salaoController = require('../controller/salao');
const salaoValidation = require('../middlewares/salaoValidation');
const router = express.Router();

router.get('/:salaoId', salaoController.getInfoSalaoById);
router.get('/servicos/:salaoId', salaoController.servicosSalao);
router.get('/colaboradores/:salaoId', salaoController.findColaboradoresBySalaoId);

router.post('/', salaoValidation, salaoController.newSalao);

router.put('/colaborador/:id', salaoController.upColaborador);

router.delete('/colaborador/status/:id', salaoController.changeStatusColaborador);


module.exports = router;