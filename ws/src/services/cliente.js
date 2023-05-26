const mongoose = require('mongoose');
const Cliente = require('../database/models/cliente');
const salaoCliente = require('../database/models/relationships/salaoCliente');
const errorThrow = require('../utils/errorThrow');

const newCliente = async (body) => {
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

const updateCliente = async (id, body) => {
  const db = mongoose.connection;
  const session = await db.startSession();
  session.startTransaction();

  try {
    const { cliente } = body;
    const alreadyExistsCliente = await Cliente.findOne({ telefone: cliente.telefone }).exec();
    if (alreadyExistsCliente) throw errorThrow(409, 'Esse telefone já está cadastrado.');

    const updatedCliente = await Cliente.findOneAndUpdate(
      { _id: id },
      { nome: cliente.nome, telefone: cliente.telefone },
      { new: true, session },
    ).exec();

    await session.commitTransaction();
    session.endSession();
    return { message: 'Cliente atualizado com sucesso.', updatedCliente };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  }
};

const getClientesByBodyFilter = async (filters) => {
  const clientes = await Cliente.find(filters);
  return clientes;
};

const getClienteOfSalao = async (id) => {
  const clientes = await salaoCliente.find({
    salaoId: id,
    status: { $ne: 'E' },
  }).populate('clienteId', 'nome telefone').select('clienteId dataCadastro');

  const clientesFormatados = clientes.map((cliente) => {
    const { clienteId, dataCadastro } = cliente;
    const { _id, nome, telefone } = clienteId;
    return {
      id: _id,
      nome, 
      telefone,
      dataCadastro,
    };
  });

  return clientesFormatados;
};

const changeStatusCliente = async (id) => {
  await salaoCliente.findByIdAndUpdate(id, { status: 'E' });

  return { message: 'Cliente deletado com sucesso.' };
};

module.exports = {
  newCliente,
  updateCliente,
  getClientesByBodyFilter,
  getClienteOfSalao,
  changeStatusCliente,
};