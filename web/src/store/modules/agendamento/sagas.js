import { takeLatest, call } from 'redux-saga/effects';
import api from '../../../services/api';
import consts from '../../../consts';

export function* filterAgendamento({ payload: { start, end } }) {
  try {
    const res = yield call(api.get, '/agendamento/filter', {
      salaoId: consts.salaoId,
      periodo: {
        inicio: start,
        fim: end,
      }
    });

    console.log(res.data);
  } catch (err) {
    console.log(err.message);
  }
}

export default function* agendamentoSaga() {
  yield takeLatest('@agendamento/filterAgendamento', filterAgendamento);
}