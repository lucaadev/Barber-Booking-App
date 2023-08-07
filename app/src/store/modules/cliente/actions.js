import types from "./types"

export function fetchClientes() {
  return {
    type: types.FETCH_CLIENTES,
  }
}

export function loginCliente() {
  return { type: types.LOGIN_CLIENTE }
}

export function addCliente(payload) {
  return { type: types.ADD_CLIENTE, payload }
}

export function updateCliente(payload) {
  return { type: types.UPDATE_CLIENTE, payload }
}

export function filterClientes() {
  return { type: types.FILTER_CLIENTES }
}

export function dissassociateCliente() {
  return { type: types.DISSASSOCIATE_CLIENTE }
}