import { all } from 'redux-saga/effects';
import salao from './modules/salao/sagas';
import cliente from './modules/cliente/sagas';

export default function* rootSaga() {
  return yield all([
    salao,
    cliente,
  ]);
}