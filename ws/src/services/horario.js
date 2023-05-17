const Horario = require('../database/models/horario');
// const errorThrow = require('../utils/errorThrow');

const createHorario = async (body) => {
  const horario = await new Horario(body).save();
  return horario;
};

const getHorarioOfSalaoById = async (id) => {
  const horarios = await Horario.find({ salaoId: id });
  return {horarios: horarios};
};

const updateHorario = async (id, body) => {
  await Horario.findByIdAndUpdate(id, body);
  return { message: 'Horario atualizado com sucesso!' };
};

module.exports = {
  createHorario,
  getHorarioOfSalaoById,
  updateHorario,
};