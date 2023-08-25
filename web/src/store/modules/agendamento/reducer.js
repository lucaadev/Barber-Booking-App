import { createReducer } from '@reduxjs/toolkit';
import types from './types';

const initialState = {
  agendamentos: [],
  modal: false,
  selectedEvent: '',
};

export const agendamentoReducer = createReducer(initialState, (builder) => {
  builder.addCase(types.UPDATE_AGENDAMENTO, (state, action) => {
    state.agendamentos = action.agendamentos;
  });
  builder.addCase(types.UPDATE_MODAL_AGENDAMENTO, (state, action) => {
    state.modal = action.modal;
  });
  builder.addCase(types.UPDATE_EVENT_AGENDAMENTO, (state, action) => {
    state.selectedEvent = action.event;
  });
});
