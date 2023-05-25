import { all, takeLatest, call } from 'redux-saga/effects';
import api from '../../../services/api';

import types from './types';
import consts from '../../../consts';

export function* filterAgendamento(action) {
  try {
    const { start, end } = action;

    const res = yield call(api.post, '/agendamento/filter', {
        salaoId: consts.salaoId,
        periodo: {
          inicio: start,
          fim: end
        }
    });

  console.log(res.data);
} catch (err) {
  console.log(err.message);
}
}

export default all([
  takeLatest(types.FILTER_AGENDAMENTO, filterAgendamento),
]);