const express = require('express');
const router = express.Router();
const {
  createAgendamento,
  filteredAgendamentos,
  diasDisponiveis,
} = require('../controller/agendamento');

router.get('/filter', filteredAgendamentos);

router.post('/', createAgendamento);
router.post('/disponibilidade-horarios', diasDisponiveis);

module.exports = router;