const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const servicoClub = new Schema({
  salaoId: {
    type: mongoose.Types.ObjectId,
    ref: 'Salao',
    required: true,
  },
  nome: {
    type: String,
    required: [true, 'Nome é obrigatório.'],
  },
  foto: {
    type: String,
    required: [true, 'Foto é obrigatório.'],
  },
  duracao: {
    type: Number,
    required: [true, 'Duração é obrigatório.'],
  },
  recorrencia: {
    type: Number,
    default: '0',
  },
  descricao: {
    type: String,
    required: [true, 'Descrição é obrigatório.'],
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

module.exports = mongoose.model('Servico_club', servicoClub);