import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import api from '../../../services/api';
import {
  updateServico,
  fetchServicos as fetchServicosAction,
  resetServico,
} from './actions';
import types from './types';

const salaoId = process.env.SALAO_ID;

export function* fetchServicos() {
  const { form } = yield select(state => state.servicoReducer);
  try {
    yield put(updateServico({ form: { ...form, filtering: true } }));
    const { data: res } = yield call(api.get, `/servico/salao/${salaoId}`);
    yield put(updateServico({ form: { ...form, filtering: false } }));

    if (res.error) {
      alert(res.error);
    } else {
      yield put(updateServico({ servicos: res.servicos }));
    }
  } catch (err) {
    yield put(updateServico({ form: { ...form, filtering: false } }));
    console.log(err.message);
  }
}

export function* addServico() {
  let { form, servico, components, behavior } = yield select(state => state.servicoReducer);
  try {
    yield put(updateServico({ form: { ...form, saving: true } }));

    let res = {};

    const formData = new FormData();
    formData.append('servico', JSON.stringify({ ...servico, salaoId: salaoId }));
    formData.append('salaoId', salaoId);
    servico.arquivos.forEach((arquivo, i) => {
      formData.append(`arquivo${i}`, arquivo);
    });

    if (behavior === 'create') {
      const response = yield call(api.post, '/servico', formData);
      res = response.data;
    } else {
      const response = yield call(api.put, `/servico/${servico._id}`, formData);
      res = response.data;
    }

    yield put(updateServico({ form: { ...form, saving: false } }));

    if (res.error) {
      alert(res.error);
      return false;
    }

    yield put(fetchServicosAction());
    yield put(updateServico({ components: { ...components, drawer: false } }));
    yield put(resetServico());

  } catch (err) {
    yield put(updateServico({ form: { ...form, saving: false } }));
    console.log(err.message);
  }
}

export function* removeServico() {
  const { form, servico, components } = yield select(state => state.servicoReducer);
  try {

    yield put(updateServico({ form: { ...form, saving: true } }));
    const { data: res } = yield call(api.delete, `/servico/${servico._id}`);

    yield put(updateServico({
      form: { ...form, saving: false },
    }));

    if (res.error) {
      alert(res.error);
      return false;
    }

    yield put(fetchServicosAction());
    yield put(updateServico({ components: { ...components, drawer: false, confirmDelete: false } }));
    yield put(resetServico());

  } catch (err) {
    yield put(updateServico({ form: { ...form, saving: false } }));
    console.log(err.message);
  }
}

export function* removeArquivo({ payload }) {
  console.log(payload);
  const { form } = yield select(state => state.servicoReducer);
  try {
    yield put(updateServico({ form: { ...form, filtering: true } }));
    const { data: res } = yield call(api.post, '/servico/delete-arquivo', {
      path: payload,
    });
    yield put(updateServico({ form: { ...form, saving: false } }));

    if (res.error) {
      alert(res.error);
    }

  } catch (err) {
    yield put(updateServico({ form: { ...form, filtering: false } }));
    console.log(err.message);
  }
}

export default all([
  takeLatest(types.FETCH_SERVICOS, fetchServicos),
  takeLatest(types.ADD_SERVICO, addServico),
  takeLatest(types.REMOVE_SERVICO, removeServico),
  takeLatest(types.REMOVE_ARQUIVO, removeArquivo),
]);