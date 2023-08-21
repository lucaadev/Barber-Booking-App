const _ = require('lodash');
const errorThrow = require('../utils/errorThrow');
const Colaborador = require('../database/models/colaborador');
const SalaoColaborador = require('../database/models/relationships/salaoColaborador');
const ColaboradorServico = require('../database/models/relationships/colaboradorServico');

const createColaborador = async (body) => {
  try {
    const { colaborador, salaoId } = body;
    const alreadyExistsColaborator = await Colaborador.findOne({ email: colaborador.email }).exec();

    if (alreadyExistsColaborator) throw errorThrow(409, 'Esse endereço de e-mail já está cadastrado.');

    const newColaborador = await new Colaborador(colaborador).save();

    const colaboradorId = alreadyExistsColaborator
      ? alreadyExistsColaborator._id
      : newColaborador._id;

    const alreadyExistsRelation = await SalaoColaborador.findOne({
      colaboradorId,
      salaoId,
      status: { $ne: 'E' },
    }).exec();

    if (alreadyExistsRelation) throw errorThrow(409, 'Esse colaborador já está cadastrado nesse salão.');

    await new SalaoColaborador({
      salaoId,
      colaboradorId,
      status: newColaborador.status,
    }).save();

    await ColaboradorServico.insertMany(
      colaborador.servicos.map(servicoId => ({ servicoId, colaboradorId })),
    );
  
    return newColaborador;
  } catch (error) {
    throw error;
  };
};

const getColaboradoresByBodyFilter = async (filters) => {
  const { email } = filters;
  const colaboradores = await Colaborador.find({
    email: { $regex: email, $options: 'i' },
    status: 'A',
  });
  return colaboradores;
};

const getColaboradoresByServicoId = async (body) => {
  const colaboradores = await ColaboradorServico.find({
    servicoId: { $in: body.servicos },
    status: 'A',
  }).populate('colaboradorId', 'nome').select('colaboradorId -_id');

  const listaDeColaboradores = _.uniqBy(colaboradores, 'colaboradorId').map(colaborador => ({
    label: colaborador.colaboradorId.nome,
    value: colaborador.colaboradorId._id,
  }));

  return listaDeColaboradores;
};

module.exports = {
  createColaborador,
  getColaboradoresByBodyFilter,
  getColaboradoresByServicoId,
};