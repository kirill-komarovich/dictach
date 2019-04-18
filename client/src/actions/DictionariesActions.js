import * as types from 'src/actionTypes/dictionaries';
import DictionariesApi from 'src/api/DictionariesApi';

export function fetchAllDictionariesFailure(errors) {
  return { type: types.FETCH_ALL_DICTIONARIES_FAILURE, errors };
}

export function createDictionaryFailure(errors) {
  return { type: types.CREATE_DICTIONARY_FAILURE, errors };
}

export function fetchDictionaryFailure(errors) {
  return { type: types.FETCH_DICTIONARY_FAILURE, errors };
}

export function updateDictionaryFailure(errors) {
  return { type: types.UPDATE_DICTIONARY_FAILURE, errors };
}

export function deleteDictionaryFailure(errors) {
  return { type: types.DELETE_DICTIONARY_FAILURE, errors };
}

export function fetchAllDictionaries(page, rowsPerPage, order, direction) {
  const dictionariesApi = new DictionariesApi();
  return async function(dispatch) {
    dispatch({ type: types.FETCH_ALL_DICTIONARIES_BEGIN });
    const response = await dictionariesApi.fetchAll(page, rowsPerPage, order, direction);
    if (!response.errors) {
      dispatch({
        type: types.FETCH_ALL_DICTIONARIES_SUCCESS,
        dictionaries: response.dictionaries,
        pages: response.meta.pages,
        records: response.meta.records,
      });
    } else {
      dispatch(fetchAllDictionariesFailure(response.errors));
    }
  };
}

export function fetchDictionary(id) {
  const dictionariesApi = new DictionariesApi();
  return async function(dispatch) {
    dispatch({ type: types.FETCH_DICTIONARY_BEGIN });
    const response = await dictionariesApi.fetch(id);
    if (!response.errors) {
      dispatch({
        type: types.FETCH_DICTIONARY_SUCCESS,
        dictionary: response,
      });
    } else {
      dispatch(fetchDictionaryFailure(response.errors));
    }
  };
}

export function updateDictionary(dictionary) {
  const dictionariesApi = new DictionariesApi();
  return async function(dispatch) {
    dispatch({ type: types.UPDATE_DICTIONARY_BEGIN });
    const response = await dictionariesApi.update(dictionary);
    if (!response.errors) {
      dispatch({ type: types.UPDATE_DICTIONARY_SUCCESS, dictionary: response });
    } else {
      dispatch(updateDictionaryFailure(response.errors));
    }
  };
}

export function createDictionary(dictionary) {
  const dictionariesApi = new DictionariesApi();
  return async function(dispatch) {
    dispatch({ type: types.CREATE_DICTIONARY_BEGIN });
    const response = await dictionariesApi.create(dictionary);
    if (!response.errors) {
      dispatch({ type: types.CREATE_DICTIONARY_SUCCESS });
    } else {
      dispatch(createDictionaryFailure(response.errors));
    }
  };
}

export function deleteDictionary(id) {
  const dictionariesApi = new DictionariesApi();
  return async function(dispatch) {
    dispatch({ type: types.DELETE_DICTIONARY_BEGIN });
    const response = await dictionariesApi.delete(id);
    if (!response.errors) {
      dispatch({ type: types.DELETE_DICTIONARY_SUCCESS, dictionary: response });
    } else {
      dispatch(deleteDictionaryFailure(response.errors));
    }
  };
}

export function freeDictionaryErrors() {
  return function(dispatch) {
    dispatch({ type: types.FREE_DICTIONARY_ERRORS });
  };
}

export function freeDictionariesErrors() {
  return function(dispatch) {
    dispatch({ type: types.FREE_DICTIONARY_ERRORS });
  };
}
