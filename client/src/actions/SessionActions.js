import * as types from 'src/actionTypes/session';
import SessionApi from 'src/api/SessionApi';
import { enqueueErrors } from './NotificationsActions';


export function signInUser(credentials) {
  const sessionApi = new SessionApi();
  return async function(dispatch) {
    dispatch({ type: types.SIGN_IN_BEGIN });
    const response = await sessionApi.signin(credentials);
    if (!response.errors) {
      dispatch({ type: types.SIGN_IN_SUCCESS });
    } else {
      dispatch({ type: types.SIGN_IN_FAILURE });
      dispatch(enqueueErrors(response.errors));
    }
  };
}

export function signOutUser() {
  const sessionApi = new SessionApi();
  return async function(dispatch) {
    dispatch({ type: types.SIGN_OUT_BEGIN });
    await sessionApi.signout();
    dispatch({ type: types.SIGN_OUT_SUCCESS });
  };
}

export function checkAuthentication() {
  const sessionApi = new SessionApi();
  return async function(dispatch) {
    dispatch({ type: types.AUTHENTICATION_CHECK_BEGIN });
    const response = await sessionApi.checkAuthentication();
    const status = response.ok;
    dispatch({ type: types.AUTHENTICATION_CHECK_END, status });
  };
}
