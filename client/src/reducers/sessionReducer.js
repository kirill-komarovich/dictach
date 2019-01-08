import * as types from '../types/session';
import initialState from './initialState';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import { persistReducer } from 'redux-persist'

const sessionPersistConfig = {
  key: 'session',
  storage: storage,
  whitelist: ['authenticated']
}

function sessionReducer(state = initialState.session, action) {
  switch(action.type) {
    case types.SIGN_IN_BEGIN:
      return {
        ...state,
        authenticated: false,
        loading: true,
      };
    case types.SIGN_IN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        loading: false,
      };
    case types.SIGN_IN_FAILURE:
      return {
        ...state,
        errors: action.errors,
        authenticated: false,
        loading: false,
      };
    case types.SIGN_OUT_BEGIN:
      return {
        ...state,
        authenticated: true,
        loading: true,
      };
    case types.SIGN_OUT_SUCCESS:
      return {
        ...state,
        authenticated: false,
        loading: false,
      };
    case types.FREE_SESSION_ERRORS:
      return {
        ...state,
        errors: null,
      };
    default:
      return state;
  }
}

export default persistReducer(sessionPersistConfig, sessionReducer)
