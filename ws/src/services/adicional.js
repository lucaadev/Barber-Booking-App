const Adicional = require('../database/models/adicional');
const moment = require('moment');

const newAdicional = async (data) => {
  const duracao = moment().startOf('day').add(data.duracao, 'minutes');

  data.duracao = duracao;
  const adicional = await Adicional(data).save();

  return adicional;
}

const getAdicionalBySalaoId = async (id) => {
  const allAdicionais = await Adicional.find({
    salaoId: id,
    status: { $ne: 'E' },
  });

  return { adicionais: allAdicionais }
}

const getAllAdicionais = async () => {
  const allAdicionais = await Adicional.find();
  return { adicionais: allAdicionais }
}

const updateAdicional = async (id, data) => {
  data.duracao = new Date(data.duracao * 60 * 1000);
  const adicional = await Adicional.findByIdAndUpdate(id, data)
  return adicional;
}

const changeAdicionalStatus = async (id) => {
  await Adicional.findByIdAndUpdate(id, {status: 'E'});

  return { message: 'Status alterado com sucesso!' };
}

module.exports = {
  newAdicional,
  getAdicionalBySalaoId,
  getAllAdicionais,
  updateAdicional,
  changeAdicionalStatus
}