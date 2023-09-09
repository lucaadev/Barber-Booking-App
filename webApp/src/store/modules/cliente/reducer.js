import { createReducer } from '@reduxjs/toolkit';
import types from './types';

const initialState = {
  form: {
    loading: false,
    error: false
  },
  cliente: {
    nome: '',
    telefone: '',
    token: '',
  }
};

export const clienteReducer = createReducer(initialState, (builder) => {
  builder.addCase(types.UPDATE_CLIENTE, (state, action) => {
    return {
      ...state,
      ...action.payload,
    };
  })
  .addCase(types.ADD_CLIENTE, (state, action) => {
    return {
      ...state,
      ...action.payload,
    };
  })
  .addCase(types.LOGIN_CLIENTE, (state, action) => {
    return {
      ...state,
      ...action.payload,
    };
  })
  .addDefaultCase((state) => state);
});
