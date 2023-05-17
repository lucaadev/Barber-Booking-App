const {
  createHorario,
  getHorarioOfSalaoById,
  updateHorario,
} = require('../services/horario');

const newHorario = async (req, res, next) => {
  try {
    const newHorario = await createHorario(req.body);
    return res.status(201).json(newHorario);
  } catch (error) {
    next(error);
  }
};

const getHorarioOfSalao = async (req, res, next) => {
  try {
    const horarios = await getHorarioOfSalaoById(req.params.id);
    return res.status(200).json(horarios);
  } catch (error) {
    next(error);
  }
};

const updatedHorario = async (req, res, next) => {
  try {
    const horario = await updateHorario(req.params.id, req.body);
    return res.status(200).json(horario);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newHorario,
  getHorarioOfSalao,
  updatedHorario,
};