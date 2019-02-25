import * as types from '../actionTypes/namespaces';
import initialState from './initialState';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import { persistReducer } from 'redux-persist';

const namespacesPersistConfig = {
  key: 'namespaces',
  storage: storage,
  whitelist: ['chosen'],
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
    case types.UPDATE_NAMESPACE_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_NAMESPACE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.UPDATE_NAMESPACE_FAILURE:
      return {
        ...state,
        errors: action.errors,
        loading: false,
      };
    case types.DELETE_NAMESPACE_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_NAMESPACE_SUCCESS:
      const { namespace: deletedNamespace } = action;
      const { all } = state;
      const filtered = all.filter((namespace) => namespace.id !== deletedNamespace.id );

      return {
        ...state,
        all: filtered,
        loading: false,
      };
    case types.DELETE_NAMESPACE_FAILURE:
      return {
        ...state,
        errors: action.errors,
        loading: false,
      };
    default:
      return state;
  }
}

export default persistReducer(namespacesPersistConfig, namespacesReducer);
