const express = require('express');
const servicoController = require('../controller/servicoController');

const router = express.Router();

router.post('/', servicoController.newServico);
router.put('/:id', servicoController.updatedServico);
router.delete('/delete-arquivo', servicoController.removeServico);


module.exports = router;