const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cliente = new Schema({
  nome: {
    type: String,
    required: [true, 'Nome é obrigatório.'],
  },
  telefone: {
    type: String,
    required: [true, 'Telefone é obrigatório.'],
    validate: {
      validator: function (value) {
        return /\(\d{2}\)\d{5}-\d{4}/.test(value);
      },
      message: 'Telefone inválido. O formato deve ser (XX)XXXXX-XXXX.',
    },
  },
  dataCadastro: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Cliente', cliente);