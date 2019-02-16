import * as types from '../actionTypes/namespaces';
import NamespacesApi from '../api/NamespacesApi';

export function fetchAllNamespacesBegin() {
  return {type: types.FETCH_ALL_NAMESPACES_BEGIN}
}

export function fetchAllNamespacesSuccess() {
  return {type: types.FETCH_ALL_NAMESPACES_SUCCESS}
}

export function fetchAllNamespacesFailure(errors) {
  return {type: types.FETCH_ALL_NAMESPACES_FAILURE, errors}
}

export function freeNamespaceErrorsSuccess() {
  return {type: types.FREE_NAMESPACE_ERRORS}
}


export function fetchAllNamespaces() {
  const namespacesApi = new NamespacesApi();
  return async function(dispatch) {
    dispatch(fetchAllNamespacesBegin());
    const response = await namespacesApi.fetchAll();
    if (!response.error) {
      dispatch(fetchAllNamespacesSuccess());
    }
    else {
      dispatch(fetchAllNamespacesFailure([response.error]));
    }
  };
}

export function freeSessionErrors() {
  return function(dispatch) {
    dispatch(freeNamespaceErrorsSuccess());
  };
}
