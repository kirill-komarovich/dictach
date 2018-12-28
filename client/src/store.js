import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/rootReducer'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger'

// const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api)(createStore);
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, loggerMiddleware)(createStore);
const store = createStoreWithMiddleware(rootReducer);
// const store = createStoreWithMiddleware(dictionaryApp);

export default store