const Joi = require('joi');

const clienteSchema = Joi.object({
  nome: Joi.string().required(),
  telefone: Joi.string().pattern(new RegExp(/\(\d{2}\)\d{5}-\d{4}/)).required()
    .messages({
      'string.pattern.base': 'Telefone inválido, o formato deve ser (XX)XXXXX-XXXX.',
    }),
});

module.exports = clienteSchema;
