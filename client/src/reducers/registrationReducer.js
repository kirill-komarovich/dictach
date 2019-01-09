import * as types from '../actionTypes/registration';
import initialState from './initialState';

export default function sessionReducer(state = initialState.session, action) {
  switch(action.type) {
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
    case types.SIGN_UP_BEGIN:
      return {
        ...state,
        authenticated: false,
        loading: true,
      };
    case types.SIGN_UP_SUCCESS:
      return {
        ...state,
        authenticated: true,
        loading: false,
      };
    case types.SIGN_UP_FAILUE:
      return {
        ...state,
        errors: action.errors,
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