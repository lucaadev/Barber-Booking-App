const {
  newAgendamento,
} = require('../services/agendamento');

const createAgendamento = async (req, res) => {
  try {
    const agendamento = await newAgendamento(req.body);
    res.status(201).json(agendamento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAgendamento,
};
