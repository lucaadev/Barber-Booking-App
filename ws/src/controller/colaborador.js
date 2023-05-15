const { createColaborador } = require('../services/colaborador');

const createNewColaborador = async (req, res, next) => {
  try {
    const colaborador = await createColaborador(req.body);
    res.status(201).json(colaborador);
  } catch (error) {
    next(error);
  };
};

module.exports = { createNewColaborador };