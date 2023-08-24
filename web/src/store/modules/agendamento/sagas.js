import { all, takeLatest, call, put } from 'redux-saga/effects';
import api from '../../../services/api';

import { updateAgendamento } from './actions';
import types from './types';

export function* filterAgendamento(action) {
  try {
    const { start, end } = action;

    const {data: res} = yield call(api.post, '/agendamento/filter', {
        salaoId: process.env.SALAO_ID,
        periodo: {
          inicio: start,
          fim: end
        }
    });

  if(res.error) {
    alert(res.error);
  } else {
    yield put(updateAgendamento(res.agendamentos));
  }
} catch (err) {
  console.log(err.message);
}
}

export default all([
  takeLatest(types.FILTER_AGENDAMENTO, filterAgendamento),
]);