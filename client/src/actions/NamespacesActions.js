import * as types from '../actionTypes/namespaces';
import NamespacesApi from '../api/NamespacesApi';

export function fetchAllNamespacesBegin() {
  return {type: types.FETCH_ALL_NAMESPACES_BEGIN}
}

export function fetchAllNamespacesSuccess(namespaces) {
  return {type: types.FETCH_ALL_NAMESPACES_SUCCESS, namespaces}
}

export function fetchAllNamespacesFailure(errors) {
  return {type: types.FETCH_ALL_NAMESPACES_FAILURE, errors}
}

export function createNamespaceBegin() {
  return {type: types.CREATE_NAMESPACE_BEGIN}
}

export function createNamespaceSuccess() {
  return {type: types.CREATE_NAMESPACE_SUCCESS}
}

export function createNamespaceFailure(errors) {
  return {type: types.CREATE_NAMESPACE_FAILURE, errors}
}

export function updateNamespaceBegin() {
  return {type: types.UPDATE_NAMESPACE_BEGIN}
}

export function updateNamespaceSuccess() {
  return {type: types.UPDATE_NAMESPACE_SUCCESS}
}

export function updateNamespaceFailure(errors) {
  return {type: types.UPDATE_NAMESPACE_FAILURE, errors}
}

export function deleteNamespaceBegin() {
  return {type: types.DELETE_NAMESPACE_BEGIN}
}

export function deleteNamespaceSuccess(namespace) {
  return {type: types.DELETE_NAMESPACE_SUCCESS, namespace}
}

export function deleteNamespaceFailure(errors) {
  return {type: types.DELETE_NAMESPACE_FAILURE, errors}
}

export function freeNamespaceErrorsSuccess() {
  return {type: types.FREE_NAMESPACE_ERRORS}
}


export function fetchAllNamespaces() {
  const namespacesApi = new NamespacesApi();
  return async function(dispatch) {
    dispatch(fetchAllNamespacesBegin());
    const response = await namespacesApi.fetchAll();
    if (!response.errors) {
      dispatch(fetchAllNamespacesSuccess(response));
    }
    else {
      dispatch(fetchAllNamespacesFailure(response.errors));
    }
  };
}

export function createNamespace(namespace) {
  const namespacesApi = new NamespacesApi();
  return async function(dispatch) {
    dispatch(createNamespaceBegin());
    const response = await namespacesApi.create(namespace);
    if (!response.errors) {
      dispatch(createNamespaceSuccess());
    }
    else {
      dispatch(createNamespaceFailure(response.errors));
    }
  };
}

export function updateNamespace(namespace) {
  const namespacesApi = new NamespacesApi();
  return async function(dispatch) {
    dispatch(updateNamespaceBegin());
    const response = await namespacesApi.update(namespace);
    if (!response.errors) {
      dispatch(updateNamespaceSuccess());
    }
    else {
      dispatch(updateNamespaceFailure(response.errors));
    }
  };
}

export function deleteNamespace(id) {
  const namespacesApi = new NamespacesApi();
  return async function(dispatch) {
    dispatch(deleteNamespaceBegin());
    const response = await namespacesApi.delete(id);
    if (!response.errors) {
      dispatch(deleteNamespaceSuccess(response));
    }
    else {
      dispatch(deleteNamespaceFailure(response.errors));
    }
  };
}

export function freeSessionErrors() {
  return function(dispatch) {
    dispatch(freeNamespaceErrorsSuccess());
  };
}
