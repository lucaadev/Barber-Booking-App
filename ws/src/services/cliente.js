const mongoose = require('mongoose');
const Cliente = require('../database/models/cliente');
const salaoCliente = require('../database/models/relationships/salaoCliente');
const errorThrow = require('../utils/errorThrow');

const create = async (body) => {
  const db = mongoose.connection;
  const session = await db.startSession();
  session.startTransaction();
  
  try {
    const {cliente} = body;
    const alreadyExistsCliente = await Cliente.findOne({ telefone: cliente.telefone }).exec();
    if (alreadyExistsCliente) throw errorThrow(409, 'Esse telefone já está cadastrado.');

    const newCliente = await new Cliente({
      nome: cliente.nome,
      telefone: cliente.telefone,
    }).save({ session });

    const clienteId = alreadyExistsCliente
      ? alreadyExistsCliente._id
      : newCliente._id;

    const  alreadyExistsRelation = await Cliente.findOne({
      clienteId,
      status: { $ne: 'E' },
    }).exec();

    if (alreadyExistsRelation) {
      await salaoCliente.findOneAndUpdate(
        { salaoId: body.salaoId,
          clienteId,
        },
        { status: 'A' },
        {session},
      );
    }

    await new salaoCliente({
      salaoId: body.salaoId,
      clienteId,
    }).save({ session });

    await session.commitTransaction();
    session.endSession();
    return newCliente;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  }
};

module.exports = {
  create,
};