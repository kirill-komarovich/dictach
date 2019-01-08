import * as types from '../types/session';
import SessionApi from '../api/SessionApi';
import history from '../history';
import urls from '../urls'

export function signInBegin() {
  return {type: types.SIGN_IN_BEGIN}
}

export function signInSuccess() {
  return {type: types.SIGN_IN_SUCCESS}
}

export function signInFailure(errors) {
  return {type: types.SIGN_IN_FAILURE, errors}
}

export function freeSessionErrorsSuccess() {
  return {type: types.FREE_SESSION_ERRORS}
}


// export function signOutBegin() {
//   return {type: types.SIGN_OUT_BEGIN}
// }

// export function signOutSuccess() {
//   return {type: types.SIGN_OUT_SUCCESS}
// }

export function signInUser(credentials) {
  return async function(dispatch) {
    dispatch(signInBegin());
    const response = await SessionApi.signin(credentials);
    if (!response.error) {
      dispatch(signInSuccess());
      history.push(urls.root);
    }
    else {
      dispatch(signInFailure([response.error]));
    }
  };
}

export function freeSessionErrors() {
  return function(dispatch) {
    dispatch(freeSessionErrorsSuccess());
  };
}
