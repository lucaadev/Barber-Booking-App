const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adicional = new Schema({
  salaoId: {
    type: mongoose.Types.ObjectId,
    ref: 'Salao',
    required: true,
  },
  nome: {
    type: String,
    required: [true, 'Nome é obrigatório.'],
  },
  valor: {
    type: Number,
    required: [true, 'Valor é obrigatório.'],
  },
  duracao: {
    type: Date,
    required: [true, 'Duração é obrigatório.'],
  },
  status: {
    type: String,
    required: true,
    enum: ['A', 'I', 'E'],
    default: 'A',
  },
  dataCadastro: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Adicional', adicional);