import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import moment from 'moment';

import api from '../../../services/api';
import infos from '../../../consts';
import types from './types';
import selectAgendamento from '../../../utils/selectAgendamento';

import {
  updateSalao,
  updateServicos,
  updateAgenda,
  updateColaboradores,
  updateAgendamento,
  updateForm,
} from './actions';

export function* getSalao() {
  try {
    const { data: res } = yield call(api.get, `/salao/${infos.salaoId}`);
    if (res.error) {
      console.log(res.error);
      return;
    }

    yield put(updateSalao(res));
    yield put(updateAgendamento({ salaoId: res._id }));
  } catch (err) {
    console.log(err);
  }
}

export function* getServicos() {
  try {
    const { data: res } = yield call(api.get, `/servico/salao/${infos.salaoId}`);
    if (res.error) {
      console.log(res.error);
      return;
    }

    yield put(updateServicos(res));
  } catch (err) {
    console.log(err);
  }
}

export function* filterAgenda() {
  try {
    const { agendamento } = yield select((state) => state.salaoReducer);
    yield put(updateAgendamento({ loading: true }));
    const { data: res } = yield call(api.post, `/agendamento/disponibilidade-horarios`, {
      servicoId: agendamento.servicoId,
      salaoId: infos.salaoId,
      data: moment().format('YYYY-MM-DD'),
    });
    yield put(updateAgendamento({ loading: false }));

    if (res.error) {
      console.log(res.error);
      return;
    }

    yield put(updateAgenda(res.agenda));
    yield put(updateColaboradores(res.colaboradores));

    const { horariosDisponiveis, data, colaboradorId } = yield call(selectAgendamento.selectAgendamento, res.agenda);
    yield put(updateAgendamento({
      data: moment(`${data}T${horariosDisponiveis[0][0]}`).format(),
      colaboradorId
    }));

  } catch (err) {
    console.log(err);
  }
}

export function* saveAgendamento() {
  try {
    const { agendamento } = yield select((state) => state.salaoReducer);
    yield put(updateForm({ agendamentoLoading: true }));

    const { data: res } = yield call(api.post, `/agendamento`, agendamento);
    
    yield put(updateForm({ agendamentoLoading: false }));

    if (res.error) {
      alert(res.error);
      return;
    }
    alert('Agendamento realizado com sucesso!');
    yield put(updateForm({ modalAgendamento: 0 }));
  } catch (err) {
    yield put(updateForm({ agendamentoLoading: false }));
    alert(err);
  }
}

export default all([
  takeLatest(types.GET_SALAO, getSalao),
  takeLatest(types.ALL_SERVICOS, getServicos),
  takeLatest(types.FILTER_AGENDA, filterAgenda),
  takeLatest(types.SAVE_AGENDAMENTO, saveAgendamento),
]);