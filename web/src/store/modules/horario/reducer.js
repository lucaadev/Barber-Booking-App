import { createReducer } from '@reduxjs/toolkit';
import types from './types';

const initialState = {
  behavior: 'create',
  components: {
    drawer: false,
    confirmDelete: false,
    view: 'week'
  },
  form: {
    filtering: false,
    saving: false,
    disabled: true,
  },
  colaboradores: [],
  horarios: [],
  servicos: [],
  horario: {
    dias: [],
    fim: '',
    servicos: [],
    colaboradores: [],
  }
};

export const horarioReducer = createReducer(initialState, (builder) => {
  builder.addCase(types.UPDATE_HORARIO, (state, action) => {
    return {
      ...state,
      ...action.payload,
    };
  }).addCase(types.RESET_HORARIO, (state) => {
    return {
      ...state,
      ...initialState.horario,
    };
  }).addDefaultCase((state) => state);
});