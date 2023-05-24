import { createAction } from '@reduxjs/toolkit';

export const agendamentoFetchOneSuccess = createAction('@agendamento/filterAgendamento', (start, end) => {
  return {
      start,
      end,
  }
});
export const agendamentoCreateSuccess = createAction('@agendamento/agendamentoCreateSuccess');
export const agendamentoUpdateSuccess = createAction('@agendamento/agendamentoUpdateSuccess');
export const agendamentoDeleteSuccess = createAction('@agendamento/agendamentoDeleteSuccess');
