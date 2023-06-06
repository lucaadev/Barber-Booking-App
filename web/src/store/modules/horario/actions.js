import types from "./types"

export function fetchHorarios() {
  return {
    type: types.FETCH_HORARIOS,
  }
}

export function updateHorario(payload) {
  return { type: types.UPDATE_HORARIO, payload }
}

export function filterColaboradores() {
  return { type: types.FILTER_COLABORADORES }
}

export function addHorario() {
  return { type: types.ADD_HORARIO }
}

export function resetHorario() {
  return { type: types.RESET_HORARIO }
}

export function allServicos() {
  return { type: types.ALL_SERVICOS }
}

export function removeHorario() {
  return { type: types.REMOVE_HORARIO }
}