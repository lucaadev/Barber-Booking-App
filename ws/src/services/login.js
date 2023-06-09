const errorThrow = require('../utils/errorThrow');
const { createToken } = require('../utils/createToken');
const Cliente = require('../database/models/cliente');

const createLogin = async ({telefone}) => {
  const userExists = await Cliente.findOne({ telefone }).exec();
  if (!userExists) throw errorThrow(400, 'Cliente não cadastrado');
  const userData = {
    id: userExists._id.toString(),
    nome: userExists.nome,
    telefone: userExists.telefone,
  };
  return createToken(userData);
};

module.exports = { createLogin };