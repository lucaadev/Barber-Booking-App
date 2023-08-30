import types from "./types"
import moment from 'moment'

export function fetchServicos() {
  return {
    type: types.FETCH_SERVICOS,
  }
}

export function updateServico(payload) {
  return { type: types.UPDATE_SERVICO , payload }
}

export function addServico() {
  return { type: types.ADD_SERVICO }
}

export function resetServico() {
  return {
    type: types.RESET_SERVICO,
    payload: {
      servico: {
        nome: '',
        valor: '',
        duracao: moment('00:20', 'HH:mm').format(),
        recorrencia: '',
        descricao: '',
        status: 'A',
        arquivos: [],
      }
    }
  }
}

export function removeArquivo(payload) {
  return { type: types.REMOVE_ARQUIVO, payload }
}

export function removeServico() {
  return { type: types.REMOVE_SERVICO }
}