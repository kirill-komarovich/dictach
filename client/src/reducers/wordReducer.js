import * as types from '../actionTypes/words';
import initialState from './initialState';

function wordReducer(state = initialState.word, action) {
  switch(action.type) {
  case types.CREATE_WORD_BEGIN:
    return {
      ...state,
      errors: false,
      loading: true,
    };
  case types.CREATE_WORD_SUCCESS:
    return {
      ...state,
      loading: false,
    };
  case types.CREATE_WORD_FAILURE:
    return {
      ...state,
      errors: true,
      loading: false,
    };
  default:
    return state;
  }
}

export default wordReducer;
