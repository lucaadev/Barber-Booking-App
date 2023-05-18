const {
  newCliente,
  updateCliente,
  getClientesByBodyFilter,
  getClienteOfSalao,
  changeStatusCliente,
} = require('../services/cliente');

const createCliente = async (req, res, next) => {
  const { body } = req;
  try {
    const cliente = await newCliente(body);
    res.status(201).json(cliente);
  } catch (error) {
    next(error);
  }
};

const updatedCliente = async (req, res, next) => {
  const { body } = req;
  const { id } = req.params;
  try {
    const cliente = await updateCliente(id, body);
    res.status(200).json(cliente);
  } catch (error) {
    next(error);
  }
};

const getClientes = async (req, res, next) => {
  const { body } = req;
  try {
    const clientes = await getClientesByBodyFilter(body);
    res.status(200).json(clientes);
  } catch (error) {
    next(error);
  }
};

const allClientesOfSalao = async (req, res, next) => {
  const { id } = req.params;
  try {
    const clientes = await getClienteOfSalao(id);
    res.status(200).json(clientes);
  } catch (error) {
    next(error);
  }
};

const deleteCliente = async (req, res, next) => {
  const { id } = req.params;
  try {
    const cliente = await changeStatusCliente(id);
    res.status(200).json(cliente);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCliente,
  updatedCliente,
  getClientes,
  allClientesOfSalao,
  deleteCliente,
};