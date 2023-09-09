import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from '@redux-devtools/extension';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), sagaMiddleware],
  devTools: import.meta.env.NODE_ENV !== 'production'
    ? composeWithDevTools({
      name: 'Barbearia-Lisboa',
    })
    : false,
});

sagaMiddleware.run(rootSaga);

export default store;
