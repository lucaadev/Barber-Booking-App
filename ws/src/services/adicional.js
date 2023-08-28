const Adicional = require('../database/models/adicional');

const newAdicional = async (data) => {
  data.duracao = new Date(data.duracao * 60 * 1000);
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
  const adicionais = await Adicional.find();
  return adicionais;
}

const updateAdicional = async (id, data) => {
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