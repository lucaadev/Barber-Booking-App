import { createReducer } from '@reduxjs/toolkit';
import types from './types';
import moment from 'moment';

const initialState = {
  behavior: 'create',
  components: {
    drawer: false,
    confirmDelete: false,
  },
  form: {
    filtering: false,
    saving: false,
    disabled: true,
  },
  servicos: [],
  servico: {
    nome: '',
    valor: '',
    duracao: moment('00:20', 'HH:mm').format(),
    recorrencia: '',
    descricao: '',
    status: 'A',
    arquivos: [],
  }
};

export const servicoReducer = createReducer(initialState, (builder) => {
  builder.addCase(types.UPDATE_SERVICO, (state, action) => {
    return {
      ...state,
      ...action.payload,
    };
  }).addCase(types.RESET_SERVICO, (state, action) => {
    return {
      ...state,
      ...action.payload,
    };
  }).addDefaultCase((state) => state);
});