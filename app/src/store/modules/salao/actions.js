import types from "./types";

export function getSalao() {
  return {
    type: types.GET_SALAO,
  };
}

export function updateSalao(salao) {
  return {
    type: types.UPDATE_SALAO,
    payload: salao,
  };
}

export function allServicos() {
  return {
    type: types.ALL_SERVICOS,
  };
}

export function updateServicos(servicos) {
  return {
    type: types.UPDATE_SERVICOS,
    payload: servicos,
  };
}

export function updateForm(form) {
  return {
    type: types.UPDATE_FORM,
    payload: form,
  };
}

export function filterAgenda() {
  return {
    type: types.FILTER_AGENDA,
  };
}

export function updateAgendamento(agendamento) {
  return {
    type: types.UPDATE_AGENDAMENTO,
    payload: agendamento,
  };
}

export function updateAgenda(agenda) {
  return {
    type: types.UPDATE_AGENDA,
    payload: agenda,
  };
}

export function updateColaboradores(colaboradores) {
  return {
    type: types.UPDATE_COLABORADORES,
    payload: colaboradores,
  };
}

export function saveAgendamento() {
  return {
    type: types.SAVE_AGENDAMENTO,
  };
}

export function updateClub(club) {
  return {
    type: types.UPDATE_CLUB,
    payload: club,
  };
}

export function updateHorariosVazios(horariosVazios) {
  return {
    type: types.UPDATE_HORARIOS_VAZIOS,
    payload: horariosVazios,
  };
}