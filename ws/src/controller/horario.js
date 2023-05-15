const { createHorario } = require('../services/horario');

const newHorario = async (req, res, next) => {
  try {
    const newHorario = await createHorario(req.body);
    return res.status(201).json(newHorario);
  } catch (error) {
    next(error);
  }
};

module.exports = { newHorario };