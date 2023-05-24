import { combineReducers } from '@reduxjs/toolkit';

import { agendamento } from "./modules/agendamento/reducer";

export default combineReducers({
    agendamento,
});