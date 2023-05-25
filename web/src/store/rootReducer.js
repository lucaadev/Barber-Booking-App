import { combineReducers } from '@reduxjs/toolkit';

import { agendamentoReducer } from "./modules/agendamento/reducer";

export default combineReducers({
  agendamentoReducer,
});