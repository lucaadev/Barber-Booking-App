import types from "./types";
import moment from 'moment';

export function fetchAdicionais() {
  return {
    type: types.FETCH_ADICIONAIS,
  };
}

export function updateAdicional(payload) {
  return {
    type: types.UPDATE_ADICIONAL,
    payload
  };
}

export function createAdicional(adicional) {
  return {
    type: types.CREATE_ADICIONAL,
    adicional
  };
}

export function deleteAdicional(adicional) {
  return {
    type: types.DELETE_ADICIONAL,
    adicional
  };
}

export function updateModal(modal) {
  return {
    type: types.UPDATE_MODAL_ADICIONAL,
    modal
  };
}

export function resetAdicional() {
  return {
    type: types.RESET_ADICIONAL,
    payload: {
      adicional: {
        nome: '',
        valor: '',
        duracao: moment('00:20', 'HH:mm').format(),
        status: 'A',
      }
    }
  };
}