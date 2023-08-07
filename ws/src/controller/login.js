const { createLogin } = require('../services/login');

const login = async (req, res, next) => {
  const { body } = req;
  try {
    const token = await createLogin(body);
    res.status(200).json(token);
  } catch (error) {
    next(error);
  }
}

module.exports = { login };