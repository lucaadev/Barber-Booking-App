import { createReducer } from "@reduxjs/toolkit";
import types from "./types";
import moment from 'moment';

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
  adicionais: [],
  adicional: {
    nome: '',
    valor: '',
    duracao: moment('00:20', 'HH:mm').format(),
    status: 'A',
  }
};

export const adicionalReducer = createReducer(initialState, (builder) => {
  builder.addCase(types.UPDATE_ADICIONAL, (state, action) => {
    return {
      ...state,
      ...action.payload,
    };
  }).addCase(types.RESET_ADICIONAL, (state) => {
    return {
      ...state,
      ...initialState.adicional,
    };
  }).addDefaultCase((state) => state);
});