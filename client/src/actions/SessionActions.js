import * as types from '../types/session';
import SessionApi from '../api/SessionApi';
import history from '../history';

export function loginBegin() {
  return {type: types.LOG_IN_BEGIN}
}

export function loginSuccess() {
  return {type: types.LOG_IN_SUCCESS}
}

export function loginFailure(errors) {
  return {type: types.LOG_IN_FAILURE, errors}
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

// export function tokenVerifySuccess() {
//     return {type: types.TOKEN_VERIFY_SUCCESS}
// }

// export function tokenVerifyFailure(errors) {
//     return {type: types.TOKEN_VERIFY_FAILURE, errors}
// }

// export function tokenRefreshSuccess() {
//     return {type: types.TOKEN_REFRESH_SUCCESS}
// }

// export function tokenRefreshFailure(errors) {
//     return {type: types.TOKEN_REFRESH_FAILURE, errors}
// }

export function logInUser(credentials) {
  return function(dispatch) {
    dispatch(loginBegin());
    return SessionApi.login(credentials).then(response => {
    });
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

// export function freeSessionErrors() {
//   return function(dispatch) {
//     dispatch(freeSessionErrorsSuccess());
//   };
// }

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