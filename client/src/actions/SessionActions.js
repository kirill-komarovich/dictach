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


// export function logOutBegin() {
//   return {type: types.LOG_OUT_BEGIN}
// }

// export function logOutSuccess() {
//   return {type: types.LOG_OUT_SUCCESS}
// }

// export function tokenRefreshSuccess() {
//     return {type: types.TOKEN_REFRESH_SUCCESS}
// }

// export function tokenRefreshFailure(errors) {
//     return {type: types.TOKEN_REFRESH_FAILURE, errors}
// }

export function signInUser(credentials) {
  return async function(dispatch) {
    dispatch(signInBegin());
    const response = await SessionApi.signin(credentials);
    if (!response.error) {
      storeTokens(response)
      dispatch(signInSuccess());
      history.push(urls.root);
    }
    else {
      dispatch(signInFailure([response.error]));
    }
  };
}

// export function logOutUser() {
//   return function(dispatch) {
//     dispatch(logOutBegin());
//     dispatch(logOutSuccess());
//     history.push(urls.root);
//   }
// }

export function freeSessionErrors() {
  return function(dispatch) {
    dispatch(freeSessionErrorsSuccess());
  };
}

export function refreshToken() {
  return function(dispatch) {

  };
}

function storeTokens(tokens) {
  localStorage.setItem('access_token', tokens.access_token);
  localStorage.setItem('refresh_token', tokens.refresh_token);
  const expiration_time = tokens.created_at + tokens.expires_in;
  localStorage.setItem('access_token_expires_at', expiration_time);
}