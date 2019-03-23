import * as types from '../actionTypes/registration';

export function signUpBegin() {
  return {type: types.SIGN_UP_BEGIN};
}

export function signUpSuccess() {
  return {type: types.SIGN_UP_SUCCESS};
}

export function signUpFailure(errors) {
  return {type: types.SIGN_UP_FAILURE, errors};
}
