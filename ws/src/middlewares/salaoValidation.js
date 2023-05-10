const errorThrow = require('../utils/errorThrow');
const joiSalao = require('../schemas/salaoSchema');

const salaoValidation = (req, _res, next) => {
  const { error } = joiSalao.validate(req.body);

  if (error) throw errorThrow(400, error.message);

  next();
};

module.exports = salaoValidation;