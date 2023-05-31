const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colaborador = new Schema({
  nome: {
    type: String,
    required: [true, 'Nome é obrigatório.'],
  },
  dataNascimento: {
    type:String,
    required: true,
  },
  capa: String,
  email: {
    type: String,
    required: [true, 'Email é obrigatório.'],
  },
  senha: {
    type: String,
    default: '123456',
  },
  telefone: String,
  sexo: {
    type: String,
    enum: ['M', 'F'],
    required :true,
  },
  status: {
    type: String,
    required: true,
    enum: ['A', 'I'],
    default: 'A',
  },
  dataCadastro: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Colaborador', colaborador);