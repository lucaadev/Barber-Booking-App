import types from "./types"

export function fetchColaboradores() {
  return {
    type: types.FETCH_COLABORADORES,
  }
}

export function updateColaborador(payload) {
  return { type: types.UPDATE_COLABORADOR, payload }
}

export function filterColaboradores() {
  return { type: types.FILTER_COLABORADORES }
}

export function addColaborador() {
  return { type: types.ADD_COLABORADOR }
}

export function resetColaborador() {
  return { type: types.RESET_COLABORADOR }
}

export function allServicos() {
  return { type: types.ALL_SERVICOS }
}

export function dissassociateColaborador() {
  return { type: types.DISSASSOCIATE_COLABORADOR }
}