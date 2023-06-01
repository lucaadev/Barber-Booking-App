import { combineReducers } from '@reduxjs/toolkit';

import { agendamentoReducer } from "./modules/agendamento/reducer";
import { clienteReducer } from "./modules/cliente/reducer";
import { colaboradorReducer } from "./modules/colaborador/reducer";

export default combineReducers({
  agendamentoReducer,
  clienteReducer,
  colaboradorReducer,
});