import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import api from '../../../services/api';
import {
  updateAdicional,
  fetchAdicionais as fetchAdicionaisAction,
  resetAdicional,
} from './actions';
import types from './types';

const salaoId = process.env.REACT_APP_SALAO_ID;

export function* fetchAdicionais() {
  const { form } = yield select(state => state.adicionalReducer);
  try {
    console.log('1');
    yield put(updateAdicional({ form: { ...form, filtering: true } }));
    const { data: res } = yield call(api.get, `/adicional/${salaoId}`);
    console.log('2');
    yield put(updateAdicional({ form: { ...form, filtering: false } }));


    if (res.error) {
      alert(res.error);
    } else {
      yield put(updateAdicional({ adicionais: res }));
    }
  } catch (err) {
    yield put(updateAdicional({ form: { ...form, filtering: false } }));
    console.log(err.message);
  }
}

export function* addAdicional() {
  let { form, adicional, components, behavior } = yield select(state => state.adicionalReducer);
  try {
    yield put(updateAdicional({ form: { ...form, saving: true } }));

    let res = {};

    if(behavior === 'create') {
      const response = yield call(api.post, '/adicional', { ...adicional, salaoId: salaoId });
      res = response.data;
    } else {
      const response = yield call(api.put, `/adicional/${adicional._id}`, { ...adicional, salaoId: salaoId });
      res = response.data;
    }

    yield put(updateAdicional({ form: { ...form, saving: false } }));

    if (res.error) {
      alert(res.error);
      return false;
    }

    yield put(fetchAdicionaisAction());
    yield put(updateAdicional({ components: { ...components, drawer: false } }));
    yield put(resetAdicional());
  } catch (err) {
    yield put(updateAdicional({ form: { ...form, saving: false } }));
    console.log(err.message);
  }
}

export function* deleteAdicional() {
  let { form, adicional, components } = yield select(state => state.adicionalReducer);
  try {
    yield put(updateAdicional({ form: { ...form, saving: true } }));

    const { data: res } = yield call(api.delete, `/adicional/${adicional._id}`);

    yield put(updateAdicional({ form: { ...form, saving: false } }));

    if (res.error) {
      alert(res.error);
      return false;
    }

    yield put(fetchAdicionaisAction());
    yield put(updateAdicional({ components: { ...components, drawer: false, confirmDelete: false } }));
    yield put(resetAdicional());
  } catch (err) {
    yield put(updateAdicional({ form: { ...form, saving: false } }));
    console.log(err.message);
  }
}



export default all([
  takeLatest(types.FETCH_ADICIONAIS, fetchAdicionais),
  takeLatest(types.CREATE_ADICIONAL, addAdicional),
  takeLatest(types.UPDATE_ADICIONAL, addAdicional),
  takeLatest(types.DELETE_ADICIONAL, deleteAdicional),
]);