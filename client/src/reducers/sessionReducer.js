import * as types from '../types/session';
import initialState from './initialState';

export default function sessionReducer(state = initialState.session, action) {
  switch(action.type) {
    case types.LOG_IN_BEGIN:
      return {
        ...state,
        authenticated: false,
        loading: true,
      };
    case types.LOG_IN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        loading: false,
      };
    case types.LOG_IN_FAILURE:
      return {
        ...state,
        errors: action.errors,
        authenticated: false,
        loading: false,
      };
    // case types.LOG_OUT_BEGIN:
    //   return {
    //     ...state,
    //     authenticated: true,
    //     loading: true,
    //   };
    // case types.LOG_OUT_SUCCESS:
    //   return {
    //     ...state,
    //     authenticated: false,
    //     loading: false,
    //   };
    // case types.SIGN_UP_BEGIN:
    //   return {
    //     ...state,
    //     authenticated: false,
    //     loading: true,
    //   };
    // case types.SIGN_UP_SUCCESS:
    //   return {
    //     ...state,
    //     authenticated: true,
    //     loading: false,
    //   };
    // case types.SIGN_UP_FAILURE:
    //   return {
    //     ...state,
    //     errors: action.errors,
    //     authenticated: false,
    //     loading: false,
    //   };
    // case types.FREE_SESSION_ERRORS:
    //   return {
    //     ...state,
    //     errors: null,
    //   };
    // case types.TOKEN_VERIFY_SUCCESS:
    //   return{
    //     ...state,
    //     authenticated: true,
    //     errors: null,
    //   };
    // case types.TOKEN_VERIFY_FAILURE:
    //   return{
    //     ...state,
    //     authenticated: false,
    //     errors: action.errors,
    //   };
    default:
      return state;
  }
}