const express = require('express');
const servicoController = require('../controller/servico');

const router = express.Router();

router.get('/salao/:salaoId', servicoController.getServicosBySalaoId);

router.post('/', servicoController.newServico);
router.post('/delete-arquivo', servicoController.removeArquivo);

router.put('/:id', servicoController.updatedServico);

router.delete('/:id', servicoController.removeServico);


module.exports = router;