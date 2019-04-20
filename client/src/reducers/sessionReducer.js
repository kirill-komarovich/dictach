import * as types from '../actionTypes/session';
import initialState from './initialState';

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
      errors: true,
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
  case types.AUTHENTICATION_CHECK_BEGIN:
    return {
      ...state,
      loading: true,
    };
  case types.AUTHENTICATION_CHECK_END:
    return {
      ...state,
      authenticated: action.status,
      loading: false,
    };
  default:
    return state;
  }
}

export default sessionReducer;
