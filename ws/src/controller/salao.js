const {
  createNewSalao,
  getServicosBySalaoId,
  getInfoById,
  updateColaborador,
  handleStatusColaborador,
} = require("../services/salao");

const newSalao = async (req, res, next) => {
  try {
    const newSalao = await createNewSalao(req.body);
    return res.status(201).json(newSalao);
  } catch (error) {
    next(error);
  }
};

const servicosSalao = async (req, res, next) => {
  try {
    const {salaoId} = req.params;
    const allServicos = await getServicosBySalaoId(salaoId);
    return res.status(200).json(allServicos);
  } catch (error) {
    next(error);
  }
};

const getInfoSalaoById = async (req, res, next) => {
  try {
    const {salaoId} = req.params;
    const salaoInfo = await getInfoById(salaoId);
    return res.status(200).json(salaoInfo);
  } catch (error) {
    next(error);
  }
};

const upColaborador = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await updateColaborador(id, req.body);
    return res.status(200).json(response.message);
  } catch (error) {
    next(error);
  }
};

const changeStatusColaborador = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await handleStatusColaborador(id);
    return res.status(200).json(response.message);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newSalao,
  servicosSalao,
  getInfoSalaoById,
  upColaborador,
  changeStatusColaborador,
};