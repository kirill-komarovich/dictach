import * as types from '../actionTypes/registration';
import initialState from './initialState';

export default function registrationReducer(state = initialState.registration, action) {
  switch(action.type) {
    case types.SIGN_UP_BEGIN:
      return {
        ...state,
      };
    case types.SIGN_UP_SUCCESS:
      return {
        ...state,
      };
    case types.SIGN_UP_FAILUE:
      return {
        ...state,
      };
    case types.FREE_REGISTRATION_ERRORS:
      return {
        ...state,
      };
    default:
      return state;
  }
}
