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
  colaboradores: [],
  servicos: [],
  colaborador: {
    nome: '',
    dataNascimento: '',
    email: '',
    senha: '',
    telefone: '',
    sexo: '',
    status: '',
    especialidades: [],
  }
};

export const colaboradorReducer = createReducer(initialState, (builder) => {
  builder.addCase(types.UPDATE_COLABORADOR, (state, action) => {
    return {
      ...state,
      ...action.payload,
    };
  }).addCase(types.RESET_COLABORADOR, (state) => {
    return {
      ...state,
      ...initialState.colaborador,
    };
  }).addDefaultCase((state) => state);
});