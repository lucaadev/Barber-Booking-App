const {
  createColaborador,
  getColaboradoresByBodyFilter,
} = require('../services/colaborador');

const createNewColaborador = async (req, res, next) => {
  try {
    const colaborador = await createColaborador(req.body);
    res.status(201).json(colaborador);
  } catch (error) {
    next(error);
  };
};

const findByBodyFilter = async (req, res, next) => {
  try {
    const { filters } = req.body;
    const colaboradores = await getColaboradoresByBodyFilter(filters);
    return res.status(200).json({ colaboradores: colaboradores });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewColaborador,
  findByBodyFilter,
};