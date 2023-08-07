const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salao = new Schema({
  nome: {
    type: String,
    required: [true, 'Nome é obrigatório.'],
  },
  foto: String,
  capa: String,
  logo: String,
  email: {
    type: String,
    required: [true, 'Email é obrigatório.'],
  },
  senha: {
    type: String,
    required: [true, 'Senha é obrigatória.'],
  },
  telefone: String,
  endereco: {
    cidade: String,
    uf: String,
    cep: String,
    numero: String,
    pais: String
  },
  geo: {
    type: {
      type: String,
      enum:['Point']
    },
    coordinates: Array,
  },
  dataCadastro: {
    type: Date,
    default: Date.now,
  },
});

salao.index({ geo: '2dsphere' })

module.exports = mongoose.model('Salao', salao);