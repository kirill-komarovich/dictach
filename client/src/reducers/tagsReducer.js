/* eslint-disable no-case-declarations */

import * as types from '../actionTypes/tags';
import initialState from './initialState';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import { persistReducer } from 'redux-persist';

const tagsPersistConfig = {
  key: 'tags',
  storage: storage,
  whitelist: ['chosen'],
};

function tagsReducer(state = initialState.tags, action) {
  switch(action.type) {
  case types.FETCH_ALL_TAGS_BEGIN:
    return {
      ...state,
      loading: true,
    };
  case types.FETCH_ALL_TAGS_SUCCESS:
    return {
      ...state,
      all: action.tags,
      loading: false,
    };
  case types.UPDATE_TAG_BEGIN:
    return {
      ...state,
      loading: true,
    };
  case types.UPDATE_TAG_SUCCESS:
    return {
      ...state,
      loading: false,
    };
  case types.UPDATE_TAG_FAILURE:
    return {
      ...state,
      errors: action.errors,
      loading: false,
    };
  case types.CREATE_TAG_BEGIN:
    return {
      ...state,
      loading: true,
    };
  case types.CREATE_TAG_SUCCESS:
    return {
      ...state,
      loading: false,
    };
  case types.CREATE_TAG_FAILURE:
    return {
      ...state,
      errors: action.errors,
      loading: false,
    };
  case types.DELETE_TAG_BEGIN:
    return {
      ...state,
      loading: true,
    };
  case types.DELETE_TAG_SUCCESS:
    const { tag: deletedTag } = action;
    const { all } = state;
    const filtered = all.filter((tag) => tag.id !== deletedTag.id );

    return {
      ...state,
      all: filtered,
      loading: false,
    };
  case types.DELETE_TAG_FAILURE:
    return {
      ...state,
      errors: action.errors,
      loading: false,
    };
  case types.FREE_TAG_ERRORS:
    return {
      ...state,
      errors: null,
    };
  default:
    return state;
  }
}

export default persistReducer(tagsPersistConfig, tagsReducer);
