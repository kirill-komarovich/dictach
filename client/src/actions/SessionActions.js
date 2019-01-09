import * as types from '../actionTypes/session';
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
  return async function(dispatch) {
    dispatch(signInBegin());
    const response = await SessionApi.signin(credentials);
    if (!response.error) {
      dispatch(signInSuccess());
    }
    else {
      dispatch(signInFailure([response.error]));
    }
  };
}

export function signOutUser() {
  return async function(dispatch) {
    dispatch(signOutBegin());
    const response = await SessionApi.signout();
    dispatch(signOutSuccess());
  };
}

export function freeSessionErrors() {
  return function(dispatch) {
    dispatch(freeSessionErrorsSuccess());
  };
}

export function checkAuthentication() {
  return async function(dispatch) {
    dispatch(authenticationCheckBegin());
    const status = await SessionApi.checkAuthentication();
    dispatch(authenticationCheckEnd(status));
  };
}
