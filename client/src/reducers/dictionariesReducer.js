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
  default:
    return state;
  }
}

export default persistReducer(dictionariesPersistConfig, dictionariesReducer);
