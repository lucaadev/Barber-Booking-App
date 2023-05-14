const errorThrow = require('../utils/errorThrow');
const Salao = require('../database/models/salao');
const Servico = require('../database/models/servico');

const getSalaoByEmail = async (email) => {
  const salaoByEmail = await Salao.findOne({ email: email }).exec();
  return salaoByEmail;
};

const createNewSalao = async (body) => {
  const salaoExists = await getSalaoByEmail(body.email);
  if (salaoExists) throw errorThrow(409, 'Esse endereço de e-mail já está cadastrado.');
  const newSalao = await new Salao(body).save();
  return newSalao;
};

const getServicosBySalaoId = async (id) => {
  const servicos = await Servico.find({
    salaoId: id,
    status: 'A',
  }).select('_id, nome');
  return servicos.map(s => ({ label: s.nome, value: s._id}));
};

const getInfoById = async (id) => {
  const infos = await Salao.findById(id)
    .select('nome foto capa telefone endereco.cidade geo.coordinates');

  return infos;
};

module.exports = { createNewSalao, getServicosBySalaoId, getInfoById };