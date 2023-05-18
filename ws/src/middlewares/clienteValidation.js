const errorThrow = require('../utils/errorThrow');
const joiCliente = require('../schemas/clienteSchema');

const clienteValidation = (req, _res, next) => {
  const { cliente } = req.body;
  const { error } = joiCliente.validate(cliente);

  if (error) throw errorThrow(400, error.message);

  next();
};

module.exports = clienteValidation;