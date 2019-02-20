import * as types from '../actionTypes/namespaces';
import initialState from './initialState';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import { persistReducer } from 'redux-persist';

const namespacesPersistConfig = {
  key: 'namespaces',
  storage: storage,
  whitelist: ['chosen']
}

function namespacesReducer(state = initialState.namespaces, action) {
  switch(action.type) {
    case types.FETCH_ALL_NAMESPACES_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_ALL_NAMESPACES_SUCCESS:
      return {
        ...state,
        all: action.namespaces,
        loading: false,
      };
    default:
      return state;
  }
}

export default persistReducer(namespacesPersistConfig, namespacesReducer);
