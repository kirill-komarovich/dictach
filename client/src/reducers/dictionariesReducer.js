import * as types from '../actionTypes/dictionaries';
import initialState from './initialState';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import { persistReducer } from 'redux-persist';

const dictionariesPersistConfig = {
  key: 'dictionaries',
  storage: storage,
  whitelist: ['chosen'],
};

function dictionariesReducer(state = initialState.dictionaries, action) {
  switch(action.type) {
  case types.FETCH_ALL_DICTIONARIES_BEGIN:
    return {
      ...state,
      loading: true,
    };
  case types.FETCH_ALL_DICTIONARIES_SUCCESS:
    return {
      ...state,
      all: action.dictionaries,
      pages: action.pages,
      records: action.records,
      loading: false,
    };
  case types.CREATE_DICTIONARY_FAILURE:
    return {
      ...state,
      errors: action.errors,
    };
  case types.FETCH_DICTIONARY_BEGIN:
    return {
      ...state,
      loading: true,
    };
  case types.FETCH_DICTIONARY_SUCCESS:
    return {
      ...state,
      chosen: action.dictionary,
      loading: false,
    };
  case types.FREE_DICTIONARY_ERRORS:
    return {
      ...state,
      errors: null,
    };
  default:
    return state;
  }
}

export default persistReducer(dictionariesPersistConfig, dictionariesReducer);
