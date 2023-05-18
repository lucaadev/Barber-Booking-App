const express = require('express');
const router = express.Router();
const {
  createAgendamento,
} = require('../controller/agendamento');

router.post('/', createAgendamento);

module.exports = router;