import types from "./types"

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
  return { type: types.RESET_SERVICO }
}

export function removeArquivo(payload) {
  return { type: types.REMOVE_ARQUIVO, payload }
}

export function removeServico() {
  return { type: types.REMOVE_SERVICO }
}