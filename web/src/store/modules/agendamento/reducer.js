import { createReducer } from '@reduxjs/toolkit';
import types from './types';

const initialState = {
  agendamentos: [],
};

export const agendamentoReducer = createReducer(initialState, (builder) => {
  builder.addCase(types.UPDATE_AGENDAMENTO, (state, action) => {
    state.agendamentos = action.agendamentos;
  });
});


// import { produce } from 'immer';
// import types from "./types";

// const initialState = {
//   agendamentos: [],
// };

// export const agendamentoReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case types.UPDATE_AGENDAMENTO: {
//       return produce(state, (draft) => {
//         draft.agendamentos = action.agendamentos;
//       });
//     }
//     default:
//       return state;
//   }
// }

