import { combineReducers } from '@reduxjs/toolkit';

import { agendamentoReducer } from "./modules/agendamento/reducer";
import { clienteReducer } from "./modules/cliente/reducer";
import { colaboradorReducer } from "./modules/colaborador/reducer";
import { servicoReducer } from "./modules/servico/reducer";
import { horarioReducer } from "./modules/horario/reducer";

export default combineReducers({
  agendamentoReducer,
  clienteReducer,
  colaboradorReducer,
  servicoReducer,
  horarioReducer,
});