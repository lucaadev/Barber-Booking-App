const {
  newAgendamento,
  filterAgendamentos,
  getDisponibilidade,
} = require('../services/agendamento');

const createAgendamento = async (req, res) => {
  try {
    const agendamento = await newAgendamento(req.body);
    res.status(201).json(agendamento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const filteredAgendamentos = async (req, res) => {
  try {
    const agendamentos = await filterAgendamentos(req.body);
    res.status(200).json(agendamentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const diasDisponiveis = async (req, res) => {
  try {
    const disponibilidade = await getDisponibilidade(req.body);
    res.status(200).json(disponibilidade);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAgendamento,
  filteredAgendamentos,
  diasDisponiveis,
};
