import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import persistedReducer from './reducers/persistedReducer';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, loggerMiddleware)(createStore);

const store = createStoreWithMiddleware(persistedReducer);
const persistor = persistStore(store);

export {
  store,
  persistor
};
