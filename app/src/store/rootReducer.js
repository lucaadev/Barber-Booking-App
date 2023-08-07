import { combineReducers } from '@reduxjs/toolkit';

import { salaoReducer } from './modules/salao/reducer';
import { clienteReducer } from './modules/cliente/reducer';

export default combineReducers({
  clienteReducer,
  salaoReducer,
});