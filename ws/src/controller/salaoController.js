const { createNewSalao, getServicosBySalaoId } = require("../services/salaoService");

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

module.exports = { newSalao, servicosSalao };