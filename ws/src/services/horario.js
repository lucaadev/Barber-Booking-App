const Horario = require('../database/models/horario');
// const errorThrow = require('../utils/errorThrow');

const createHorario = async (body) => {
  const horario = await new Horario(body).save();
  return horario;
};

module.exports = { createHorario };