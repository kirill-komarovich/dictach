import * as types from '../actionTypes/session';
import SessionApi from '../api/SessionApi';

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

export function signOutBegin() {
  return {type: types.SIGN_OUT_BEGIN}
}

export function signOutSuccess() {
  return {type: types.SIGN_OUT_SUCCESS}
}

export function authenticationCheckBegin() {
  return {type: types.AUTHENTICATION_CHECK_BEGIN}
}

export function authenticationCheckEnd(status) {
  return {type: types.AUTHENTICATION_CHECK_END, status}
}

export function signInUser(credentials) {
  const sessionApi = new SessionApi();
  return async function(dispatch) {
    dispatch(signInBegin());
    const response = await sessionApi.signin(credentials)
    if (!response.error) {
      dispatch(signInSuccess());
    }
    else {
      dispatch(signInFailure([response.error]));
    }
  };
}

export function signOutUser() {
  const sessionApi = new SessionApi();
  return async function(dispatch) {
    dispatch(signOutBegin());
    await sessionApi.signout();
    dispatch(signOutSuccess());
  };
}

export function freeSessionErrors() {
  return function(dispatch) {
    dispatch(freeSessionErrorsSuccess());
  };
}

export function checkAuthentication() {
  const sessionApi = new SessionApi();
  return async function(dispatch) {
    dispatch(authenticationCheckBegin());
    const response = await sessionApi.checkAuthentication();
    const status = response.ok;
    dispatch(authenticationCheckEnd(status));
  };
}
