const {
  handleFileUpload,
  updateServico,
  deleteArquivo,
  changeServicoStatus,
  getServicosById,
} = require("../services/servico");

const getServicosBySalaoId = async (req, res, next) => {
  try {
    const servicos = await getServicosById(req.params.salaoId);
    return res.status(200).json(servicos);
  } catch (error) {
    next(error);
  }
};

const newServico = async (req, res, next) => {
  try {
    const newServico = await handleFileUpload(req);
    return res.status(201).json(newServico);
  } catch (error) {
    next(error);
  }
};

const updatedServico = async (req, res, next) => {
  try {
    const servico = await updateServico(req);
    return res.status(200).json(servico);
  } catch (error) {
    next(error);
  }
};

const removeArquivo = async (req, res, next) => {
  try {
    const message = await deleteArquivo(req);
    return res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

const removeServico = async (req, res, next) => {
  try {
    const message = await changeServicoStatus(req.params.id);
    return res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newServico,
  updatedServico,
  removeArquivo,
  removeServico,
  getServicosBySalaoId,
};
