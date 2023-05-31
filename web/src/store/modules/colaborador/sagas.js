import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import api from '../../../services/api';
import consts from '../../../consts';
import {
  updateColaborador,
  fetchColaboradores as fetchColaboradoresAction,
  resetColaborador,
} from './actions';
import types from './types';

export function* fetchColaboradores() {
  const { form } = yield select(state => state.colaboradorReducer);
  try {
    yield put(updateColaborador({ form: { ...form, filtering: true } }));
    const { data: res } = yield call(api.get, `/salao/colaboradores/${consts.salaoId}`);
    yield put(updateColaborador({ form: { ...form, filtering: false } }));

    if (res.error) {
      alert(res.error);
    } else {
      yield put(updateColaborador({ colaboradores: res.colaboradores }));
    }
  } catch (err) {
    yield put(updateColaborador({ form: { ...form, filtering: false } }));
    console.log(err.message);
  }
}

export function* filterColaboradores() {
  const { form, colaborador } = yield select(state => state.colaboradorReducer);
  try {
    yield put(updateColaborador({ form: { ...form, filtering: true } }));
    const { data: res } = yield call(api.post, 'salao/filter/colaborador', {
      email: colaborador.email,
      status: 'A'
    });
    yield put(updateColaborador({ form: { ...form, filtering: false } }));

    if (res.error) {
      alert(res.error);
      return false;
    }

    if (res.colaboradores.length > 0) {
      yield put(updateColaborador({
        colaborador: res.colaboradores[0],
        form: { ...form, disabled: true, filtering: false },
      }));
    } else {
      yield put(updateColaborador({
        form: { ...form, disabled: false }
      }));
    }
  } catch (err) {
    yield put(updateColaborador({ form: { ...form, filtering: false } }));
    console.log(err.message);
  }
}

export function* addcolaborador() {
  const { form, colaborador, components } = yield select(state => state.colaboradorReducer);
  try {
    yield put(updateColaborador({ form: { ...form, saving: true } }));
    const { data: res } = yield call(api.post, '/colaborador', {
      salaoId: consts.salaoId,
      colaborador,
    });
    yield put(updateColaborador({ form: { ...form, saving: false } }));

    if (res.error) {
      alert(res.error);
      return false;
    }

    yield put(fetchColaboradoresAction());
    yield put(updateColaborador({ components: { ...components, drawer: false } }));
    yield put(resetColaborador());

  } catch (err) {
    yield put(updateColaborador({ form: { ...form, saving: false } }));
    console.log(err.message);
  }
}

export function* dissassociationcolaborador() {
  const { form, colaborador, components } = yield select(state => state.colaboradorReducer);
  try {

    yield put(updateColaborador({ form: { ...form, saving: true } }));
    const { data: res } = yield call(api.delete, `/salao/colaborador/status/${colaborador.id}`);

    yield put(updateColaborador({
      components: { ...components, confirmDelete: false },
      form: { ...form, saving: false },
    }));

    if (res.error) {
      alert(res.error);
      return false;
    }

    yield put(fetchColaboradoresAction());
    yield put(updateColaborador({ components: { ...components, drawer: false, confirmDelete: false } }));
    yield put(resetColaborador());

  } catch (err) {
    yield put(updateColaborador({ form: { ...form, saving: false } }));
    console.log(err.message);
  }
}

export function* allServicos() {
  const { form } = yield select(state => state.colaboradorReducer);
  try {
    yield put(updateColaborador({ form: { ...form, filtering: true } }));
    const { data: res } = yield call(api.get, `/salao/servicos/${consts.salaoId}`);
    yield put(updateColaborador({ form: { ...form, filtering: false } }));

    if (res.error) {
      alert(res.error);
    } else {
      yield put(updateColaborador({ servicos: res }));
    }
  } catch (err) {
    yield put(updateColaborador({ form: { ...form, filtering: false } }));
    console.log(err.message);
  }
}

export default all([
  takeLatest(types.FETCH_COLABORADORES, fetchColaboradores),
  takeLatest(types.FILTER_COLABORADORES, filterColaboradores),
  takeLatest(types.ADD_COLABORADOR, addcolaborador),
  takeLatest(types.DISSASSOCIATE_COLABORADOR, dissassociationcolaborador),
  takeLatest(types.ALL_SERVICOS, allServicos),
]);