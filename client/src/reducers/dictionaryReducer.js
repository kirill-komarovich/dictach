import * as types from '../actionTypes/dictionaries';
import initialState from './initialState';

function dictionaryReducer(state = initialState.dictionary, action) {
  switch(action.type) {
  case types.FETCH_DICTIONARY_BEGIN:
  case types.UPDATE_DICTIONARY_BEGIN:
  case types.DELETE_DICTIONARY_BEGIN:
  case types.CREATE_DICTIONARY_BEGIN:
    return {
      ...state,
      loading: true,
    };
  case types.FETCH_DICTIONARY_SUCCESS:
  case types.UPDATE_DICTIONARY_SUCCESS:
    return {
      ...state,
      ...action.dictionary,
      loading: false,
    };
  case types.DELETE_DICTIONARY_SUCCESS:
    return {
      ...state,
      ...initialState.dictionary,
      loading: false,
    };
  case types.CREATE_DICTIONARY_SUCCESS:
  case types.UPDATE_DICTIONARY_FAILURE:
  case types.DELETE_DICTIONARY_FAILURE:
    return {
      ...state,
      loading: false,
    };
  case types.CREATE_DICTIONARY_FAILURE:
    return {
      ...state,
      errors: true,
      loading: false,
    };
  default:
    return state;
  }
}

export default dictionaryReducer;
