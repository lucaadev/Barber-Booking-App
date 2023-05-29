import { createReducer } from '@reduxjs/toolkit';
import types from './types';

const initialState = {
  behavior: 'create',
  components: {
    drawer: false,
    confirmDelete: false,
  },
  form: {
    filtering: false,
    saving: false,
    disabled: true,
  },
  clientes: [],
  cliente: {
    nome: '',
    telefone: '',
    status: '',
  }
};

export const clienteReducer = createReducer(initialState, (builder) => {
  builder.addCase(types.UPDATE_CLIENTE, (state, action) => {
    return {
      ...state,
      ...action.payload,
    };
  }).addCase(types.RESET_CLIENTE, (state) => {
    return {
      ...state,
      ...initialState.cliente,
    };
  }).addDefaultCase((state) => state);
});