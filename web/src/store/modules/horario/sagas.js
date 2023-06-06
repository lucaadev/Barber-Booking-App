import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import api from '../../../services/api';
import consts from '../../../consts';
import {
  updateHorario,
  fetchHorarios as fetchHorariosAction,
  resetHorario,
} from './actions';
import types from './types';

export function* fetchHorarios() {
  const { form } = yield select(state => state.horarioReducer);
  try {
    yield put(updateHorario({ form: { ...form, filtering: true } }));
    const { data: res } = yield call(api.get, `/horario/salao/${consts.salaoId}`);
    yield put(updateHorario({ form: { ...form, filtering: false } }));

    if (res.error) {
      alert(res.error);
    } else {
      yield put(updateHorario({ horarios: res.horarios }));
    }
  } catch (err) {
    yield put(updateHorario({ form: { ...form, filtering: false } }));
    console.log(err.message);
  }
}

export function* allServicos() {
  const { form } = yield select(state => state.horarioReducer);
  try {
    yield put(updateHorario({ form: { ...form, filtering: true } }));
    const { data: res } = yield call(api.get, `/salao/servicos/${consts.salaoId}`);
    yield put(updateHorario({ form: { ...form, filtering: false } }));

    if (res.error) {
      alert(res.error);
    } else {
      yield put(updateHorario({ servicos: res }));
    }
  } catch (err) {
    yield put(updateHorario({ form: { ...form, filtering: false } }));
    console.log(err.message);
  }
}

export function* addHorario() {
  const { form, horario, components, behavior } = yield select(state => state.horarioReducer);
  try {
    yield put(updateHorario({ form: { ...form, saving: true } }));
    let res = {};

    if (behavior === 'create') {
      const response = yield call(api.post, '/horario', {
        ...horario,
        salaoId: consts.salaoId,
      });
      res = response.data;
    } else {
      const response = yield call(api.put, `/horario/${horario._id}`, horario);
      res = response.data;
    }

    yield put(updateHorario({ form: { ...form, saving: false } }));

    if (res.error) {
      alert(res.error);
    }

    yield put(fetchHorariosAction());
    yield put(
      updateHorario({
        components: { ...components, drawer: false },
      })
    );
    yield put(resetHorario());
  } catch (err) {
    yield put(updateHorario({ form: { ...form, saving: false } }));
    alert(err.message);
  }
}

export function* filterColaboradores() {
  const { form, horario } = yield select(state => state.horarioReducer);
  try {
    yield put(updateHorario({ form: { ...form, filtering: true } }));
    const { data: res } = yield call(api.post, 'colaborador/colaboradores', {
      servicos: horario.especialidades
    });
    yield put(updateHorario({ form: { ...form, filtering: false } }));

    if (res.error) {
      alert(res.error);
      return false;
    }

    yield put(updateHorario({ colaboradores: res.colaboradores }));
  } catch (err) {
    yield put(updateHorario({ form: { ...form, filtering: false } }));
    console.log(err.message);
  }
}

export function* removeHorario() {
  const { form, horario, components } = yield select(state => state.horarioReducer);
  try {
    yield put(updateHorario({ form: { ...form, filtering: true } }));
    const { data: res } = yield call(api.delete, `/horario/${horario._id}`);
    yield put(updateHorario({ form: { ...form, filtering: false } }));

    if (res.error) {
      alert(res.error);
    } else {
      yield put(updateHorario({ components: { ...components, drawer: false, confirmDelete: false } }));
      yield put(resetHorario());
      yield put(fetchHorariosAction());
    }
  } catch (err) {
    yield put(updateHorario({ form: { ...form, filtering: false } }));
    console.log(err.message);
  }
}



export default all([
  takeLatest(types.FETCH_HORARIOS, fetchHorarios),
  takeLatest(types.ALL_SERVICOS, allServicos),
  takeLatest(types.ADD_HORARIO, addHorario),
  takeLatest(types.FILTER_COLABORADORES, filterColaboradores),
  takeLatest(types.REMOVE_HORARIO, removeHorario),
]);