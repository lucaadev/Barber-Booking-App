import types from "./types"

export function filterAgendamento(start, end) {
  return {
    type: types.FILTER_AGENDAMENTO,
    start,
    end
  }
}

export function updateAgendamento(agendamentos) {
  return {
    type: types.UPDATE_AGENDAMENTO,
    agendamentos
  }
}

export function updateModal(modal) {
  return {
    type: types.UPDATE_MODAL_AGENDAMENTO,
    modal
  }
}

export function updateEvent(event) {
  return {
    type: types.UPDATE_EVENT_AGENDAMENTO,
    event
  }
}