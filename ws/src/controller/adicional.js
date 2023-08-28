const {
  newAdicional,
  getAdicionalBySalaoId,
  getAllAdicionais,
  updateAdicional,
  changeAdicionalStatus
} = require("../services/adicional");

const newAdicionalController = async (req, res, next) => {
  try {
    const adicional = await newAdicional(req.body);
    return res.status(201).json(adicional);
  } catch (error) {
    next(error);
  }
}

const getAdicionalController = async (req, res, next) => {
  try {
    const adicional = await getAdicionalBySalaoId(req.params.salaoId);
    return res.status(200).json(adicional);
  } catch (error) {
    next(error);
  }
}

const getAllAdicionaisController = async (req, res, next) => {
  try {
    const adicionais = await getAllAdicionais();
    return res.status(200).json(adicionais);
  } catch (error) {
    next(error);
  }
}

const updateAdicionalController = async (req, res, next) => {
  try {
    const adicional = await updateAdicional(req.params.id, req.body);
    return res.status(200).json(adicional);
  } catch (error) {
    next(error);
  }
}

const deleteAdicionalController = async (req, res, next) => {
  try {
    const adicional = await changeAdicionalStatus(req.params.id);
    return res.status(200).json(adicional);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  newAdicionalController,
  getAdicionalController,
  getAllAdicionaisController,
  updateAdicionalController,
  deleteAdicionalController
}