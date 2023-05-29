import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import api from '../../../services/api';
import consts from '../../../consts';
import {
  updateCliente,
  fetchClientes as fetchClientesAction,
  resetCliente,
} from './actions';
import types from './types';

export function* fetchClientes() {
  const { form } = yield select(state => state.clienteReducer);
  try {
    yield put(updateCliente({ form: { ...form, filtering: true } }));
    const { data: res } = yield call(api.get, `/cliente/salao/${consts.salaoId}`);
    yield put(updateCliente({ form: { ...form, filtering: false } }));

    if (res.error) {
      alert(res.error);
    } else {
      yield put(updateCliente({ clientes: res }));
    }
  } catch (err) {
    yield put(updateCliente({ form: { ...form, filtering: false } }));
    console.log(err.message);
  }
}

export function* filterClientes() {
  const { form, cliente } = yield select(state => state.clienteReducer);
  try {
    yield put(updateCliente({ form: { ...form, filtering: true } }));
    const { data: res } = yield call(api.post, '/cliente/filter', {
      nome: cliente.nome,
      status: 'A'
    });
    yield put(updateCliente({ form: { ...form, filtering: false } }));

    if (res.error) {
      alert(res.error);
      return false;
    }

    if (res.length > 0) {
      yield put(updateCliente({
        cliente: res[0],
        form: { ...form, disabled: true, filtering: false },
      }));
    } else {
      yield put(updateCliente({
        form: { ...form, disabled: false }
      }));
    }
  } catch (err) {
    yield put(updateCliente({ form: { ...form, filtering: false } }));
    console.log(err.message);
  }
}

export function* addCliente() {
  const { form, cliente, components } = yield select(state => state.clienteReducer);
  try {
    yield put(updateCliente({ form: { ...form, saving: true } }));
    const { data: res } = yield call(api.post, '/cliente', {
      salaoId: consts.salaoId,
      cliente: {
        nome: cliente.nome,
        telefone: cliente.telefone,
      }
    });
    yield put(updateCliente({ form: { ...form, saving: false } }));

    if (res.error) {
      alert(res.error);
      return false;
    }

    yield put(fetchClientesAction());
    yield put(updateCliente({ components: { ...components, drawer: false } }));
    yield put(resetCliente());

  } catch (err) {
    yield put(updateCliente({ form: { ...form, saving: false } }));
    console.log(err.message);
  }
}

export function* dissassociationCliente() {
  const { form, cliente, components } = yield select(state => state.clienteReducer);
  try {

    yield put(updateCliente({ form: { ...form, saving: true } }));
    const { data: res } = yield call(api.delete, `/cliente/delete/${cliente.id}`);

    yield put(updateCliente({
      components: { ...components, confirmDelete: false },
      form: { ...form, saving: false },
    }));

    if (res.error) {
      alert(res.error);
      return false;
    }

    yield put(fetchClientesAction());
    yield put(updateCliente({ components: { ...components, drawer: false, confirmDelete: false } }));
    yield put(resetCliente());

  } catch (err) {
    yield put(updateCliente({ form: { ...form, saving: false } }));
    console.log(err.message);
  }
}

export default all([
  takeLatest(types.FETCH_CLIENTES, fetchClientes),
  takeLatest(types.FILTER_CLIENTES, filterClientes),
  takeLatest(types.ADD_CLIENTE, addCliente),
  takeLatest(types.DISSASSOCIATE_CLIENTE, dissassociationCliente),
]);