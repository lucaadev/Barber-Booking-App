const express = require('express');
const servicoController = require('../controller/servicoController');

const router = express.Router();

router.get('/salao/:salaoId', servicoController.getServicosBySalaoId);
router.post('/', servicoController.newServico);
router.put('/:id', servicoController.updatedServico);
router.delete('/delete-arquivo', servicoController.removeArquivo);
router.delete('/:id', servicoController.removeServico);


module.exports = router;