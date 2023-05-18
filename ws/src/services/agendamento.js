const mongoose = require('mongoose');
const errorThrow = require('../utils/errorThrow');
const Agendamento = require('../database/models/agendamento');
const Cliente = require('../database/models/cliente');
const Colaborador = require('../database/models/colaborador');
const Salao = require('../database/models/salao');
const Servico = require('../database/models/servico');

const newAgendamento = async (body) => {
  const db = mongoose.connection;
  const session = await db.startSession();
  session.startTransaction();
  try {
    const { clienteId, colaboradorId, servicoId, salaoId } = body;

    // verifica se o horário está disponível
    const agendamento = await Agendamento.findOne({
      colaboradorId,
      data: body.data,
    });
    if (agendamento) {
      throw errorThrow(409, 'Lamentamos, este horário já foi reservado.');
    }

    const cliente = await Cliente.findById(clienteId).select('-_id');
    const colaborador = await Colaborador.findById(colaboradorId);
    const servico = await Servico.findById(servicoId).select('nome valor foto');
    const salao = await Salao.findById(salaoId);

    const newAgendamento = await new Agendamento({
      ...body,
      valor: servico.valor,
    }).save({ session });

    await session.commitTransaction();
    session.endSession();

    return { ...newAgendamento._doc, cliente, colaborador, servico, salao };

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

module.exports = {
  newAgendamento,
};
