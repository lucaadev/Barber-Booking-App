const { create, findAll, findOne, update, remove } = require('../services/cliente');

const createCliente = async (req, res, next) => {
  const { body } = req;
  try {
    const cliente = await create(body);
    res.status(201).json(cliente);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCliente,
};