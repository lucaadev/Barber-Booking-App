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
  },
  status: {
    type: String,
    enum: ['A', 'E'],
    default: 'A',
  },
  dataCadastro: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Cliente', cliente);