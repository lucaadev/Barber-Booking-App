const Cliente = require('../database/models/cliente');
const salaoCliente = require('../database/models/relationships/salaoCliente');
const errorThrow = require('../utils/errorThrow');

const create = async (body) => {
  const db = mongoose.connection;
  const session = await db.startSession();
  session.startTransaction();

  try {
    const alreadyExistsCliente = Cliente.findOne({ telefone: body.telefone }).exec();
    if (alreadyExistsCliente) throw errorThrow(409, 'Esse telefone já está cadastrado.');

    const cliente = await new Cliente(body).save({ session });

    const clienteId = alreadyExistsCliente
      ? alreadyExistsCliente._id
      : cliente._id;

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
      salaoId,
      clienteId,
    }).save({ session });

    await session.commitTransaction();
    session.endSession();
    return cliente;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  }
};

module.exports = {
  create,
};