import * as types from '../types/session';
import SessionApi from '../api/SessionApi';
import history from '../history';

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

// export function signUpBegin() {
//   return {type: types.SIGN_UP_BEGIN}
// }

// export function signUpSuccess() {
//   return {type: types.SIGN_UP_SUCCESS}
// }

// export function signUpFailure(errors) {
//   return {type: types.SIGN_UP_FAILURE, errors}
// }

// export function logOutBegin() {
//   return {type: types.LOG_OUT_BEGIN}
// }

// export function logOutSuccess() {
//   return {type: types.LOG_OUT_SUCCESS}
// }

// export function freeSessionErrorsSuccess() {
//   return {type: types.FREE_SESSION_ERRORS}
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
    console.log(response);
    if (!response.error) {
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);
      const expiration_time = response.created_at + response.expires_in;
      localStorage.setItem('access_token_expires_at', expiration_time);
      dispatch(signInSuccess());
      history.push('/');
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
//     history.push('/');
//   }
// }

// export function signUpUser(credentials) {
//   return function(dispatch) {
//     dispatch(signUpBegin());
//     return SessionApi.signup(credentials).then(response => {
//       if (!response.errors) {
//         dispatch(signUpSuccess());
//         history.push('/');
//       } else {
//         dispatch(signUpFailure(response.errors));
//       }
//     }).catch(error => {
//       throw(error);
//     });
//   };
// }

export function freeSessionErrors() {
  return function(dispatch) {
    dispatch(freeSessionErrorsSuccess());
  };
}

// export function verifyToken() {
//   return function(dispatch) {
//     const token = localStorage.getItem('token');
//     return SessionApi.verify(token).then(response => {
//       dispatch(tokenVerifySuccess());
//       const decoded = jwt_decode(response.token);
//       console.log(decoded);
//     }).catch(error => {
//       dispatch(tokenVerifyFailure({error: [error]}));
//       dispatch(logOutUser());
//       throw(error);
//     });
//   };
// }

// export function refreshToken() {
//   return function(dispatch) {

//   };
// }