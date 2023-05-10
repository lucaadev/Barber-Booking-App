const { handleFileUpload } = require("../services/servicoService");

const newServico = async (req, res, next) => {
  try {
    const newServico = await handleFileUpload(req);
    return res.status(201).json(newServico);
  } catch (error) {
    next(error);
  }
};

module.exports = { newServico };
