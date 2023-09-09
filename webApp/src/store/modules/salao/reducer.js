import { createReducer } from '@reduxjs/toolkit';
import _ from 'lodash';
import types from './types';

const INITIAL_STATE = {
  salao: {},
  servicosSalao: [],
  agenda: [],
  colaboradores: [],
  horariosVazios: false,
  club: false,
  agendamento: {
    loading: false,
    clienteId: '',
    salaoId: '',
    servicoId: '',
    colaboradorId: '',
    data: '',
  },
  form: {
    inputFiltro: '',
    inputFiltroFoco: false,
    modalEspecialista: false,
    modalAgendamento: 0,
    agendamentoLoading: false,
  },
};

export const salaoReducer = createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(types.GET_SALAO, (state, action) => {
    state.salao = action.payload;
  });
  builder.addCase(types.UPDATE_SALAO, (state, action) => {
    state.salao = action.payload;
  });
  builder.addCase(types.UPDATE_SERVICOS, (state, action) => {
    state.servicosSalao = action.payload;
  });
  builder.addCase(types.UPDATE_FORM, (state, action) => {
    state.form = action.payload;
  });
  builder.addCase(types.UPDATE_AGENDA, (state, action) => {
    state.agenda = [...state.agenda, ...action.payload];
  });
  builder.addCase(types.UPDATE_AGENDAMENTO, (state, action) => {
    if (action.payload.servicoId) {
      state.form.modalAgendamento = 2;
    }
    state.agendamento = { ...state.agendamento, ...action.payload };
  });
  builder.addCase(types.UPDATE_COLABORADORES, (state, action) => {
    state.colaboradores = _.uniq([...state.colaboradores, ...action.payload]);
  });
  builder.addCase(types.UPDATE_CLUB, (state, action) => {
    state.club = action.payload;
  });
  builder.addCase(types.UPDATE_HORARIOS_VAZIOS, (state, action) => {
    state.horariosVazios = action.payload;
  });
  builder.addDefaultCase((state, _action) => {
    return state;
  });
});