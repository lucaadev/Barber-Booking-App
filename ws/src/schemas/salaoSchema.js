const Joi = require('joi');

const salaoSchema = Joi.object({
  nome: Joi.string().required(),
  email: Joi.string().email().required(),
  foto: Joi.string().required(),
  capa: Joi.string(),
  senha: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(6).required(),
  telefone: Joi.string().regex(/^\d+$/).min(9).max(11),
  endereco: Joi.object().keys({
    cidade: Joi.string().required(),
    uf: Joi.string().required(),
    cep: Joi.string().pattern(new RegExp(/^([\d]{2})\.*([\d]{3})-*([\d]{3})/)).required(),
    numero: Joi.string().required(),
    pais: Joi.string().required(),
  }),
  geo: Joi.object().keys({
    type: Joi.string().required().valid('Point'),
    coordinates: Joi.array().ordered(
      Joi.number().min(-90).max(90).required(),
      Joi.number().min(-180).max(180).required()
    ),
  }),
});

module.exports = salaoSchema;