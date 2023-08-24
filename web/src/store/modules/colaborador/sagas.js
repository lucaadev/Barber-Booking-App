import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import api from '../../../services/api';
import {
  updateColaborador,
  fetchColaboradores as fetchColaboradoresAction,
  resetColaborador,
} from './actions';
import types from './types';

const salaoId = process.env.SALAO_ID;

export function* fetchColaboradores() {
  const { form } = yield select(state => state.colaboradorReducer);
  try {
    yield put(updateColaborador({ form: { ...form, filtering: true } }));
    const { data: res } = yield call(api.get, `/salao/colaboradores/${salaoId}`);
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
    const { data: res } = yield call(api.post, 'colaborador/filter', {
      filters: {
        email: colaborador.email,
        status: 'A',
      }
    });
    yield put(updateColaborador({ form: { ...form, filtering: false } }));

    if (res.error) {
      alert(res.error);
      return false;
    }

    if (res.colaboradores.length > 0) {
      yield put(updateColaborador({
        colaborador: res.colaboradores[0],
        form: { ...form, disabled: true, filtering: false, },
        behavior: 'update',
      }));
    } else {
      yield put(updateColaborador({
        colaborador: {
          nome: '',
          email: colaborador.email,
          dataNascimento: '',
          senha: '',
          telefone: '',
          sexo: '',
          status: '',
          servicos: [],
        },
        form: { ...form, disabled: false }
      }));
    }
  } catch (err) {
    yield put(updateColaborador({ form: { ...form, filtering: false } }));
    console.log(err.message);
  }
}

export function* addColaborador() {
  let { form, colaborador, colaboradores, components, behavior } = yield select(state => state.colaboradorReducer);
  try {
    yield put(updateColaborador({ form: { ...form, saving: true } }));

    let res = {};

    if (behavior === 'create') {
      const response = yield call(api.post, '/colaborador', {
        salaoId: salaoId,
        colaborador,
      });
      res = response.data;
    } else {
      colaboradores.forEach((item) => {
        if (item._id === colaborador._id) {
          colaborador = { ...colaborador, statusId: item.statusId };
        }
      });
      const response = yield call(api.put, `/salao/colaborador/${colaborador._id}`, {
        statusId: colaborador.statusId,
        status: colaborador.status,
        servicos: colaborador.servicos,
      });
      res = response.data;
    }

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

export function* dissassociatioColaborador() {
  const { form, colaborador, components } = yield select(state => state.colaboradorReducer);
  try {

    yield put(updateColaborador({ form: { ...form, saving: true } }));
    const { data: res } = yield call(api.delete, `/salao/colaborador/status/${colaborador._id}`);

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
    const { data: res } = yield call(api.get, `/salao/servicos/${salaoId}`);
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
  takeLatest(types.ADD_COLABORADOR, addColaborador),
  takeLatest(types.DISSASSOCIATE_COLABORADOR, dissassociatioColaborador),
  takeLatest(types.ALL_SERVICOS, allServicos),
]);