import * as types from '../actionTypes/tags';
import TagsApi from '../api/TagsApi';

export function fetchAllTagsBegin() {
  return {type: types.FETCH_ALL_TAGS_BEGIN}
}

export function fetchAllTagsSuccess(tags) {
  return {type: types.FETCH_ALL_TAGS_SUCCESS, tags}
}

export function fetchAllTagsFailure(errors) {
  return {type: types.FETCH_ALL_TAGS_FAILURE, errors}
}

export function updateTagBegin() {
  return {type: types.UPDATE_TAG_BEGIN}
}

export function updateTagSuccess() {
  return {type: types.UPDATE_TAG_SUCCESS}
}

export function updateTagFailure(errors) {
  return {type: types.UPDATE_TAG_FAILURE, errors}
}

export function createTagBegin() {
  return {type: types.CREATE_TAG_BEGIN}
}

export function createTagSuccess() {
  return {type: types.CREATE_TAG_SUCCESS}
}

export function createTagFailure(errors) {
  return {type: types.CREATE_TAG_FAILURE, errors}
}

export function deleteTagBegin() {
  return {type: types.DELETE_TAG_BEGIN}
}

export function deleteTagSuccess(tag) {
  return {type: types.DELETE_TAG_SUCCESS, tag}
}

export function deleteTagFailure(errors) {
  return {type: types.DELETE_TAG_FAILURE, errors}
}

export function freeTagErrorsSuccess() {
  return {type: types.FREE_TAG_ERRORS}
}


export function fetchAllTags() {
  const tagsApi = new TagsApi();
  return async function(dispatch) {
    dispatch(fetchAllTagsBegin());
    const response = await tagsApi.fetchAll();
    if (!response.errors) {
      dispatch(fetchAllTagsSuccess(response));
    }
    else {
      dispatch(fetchAllTagsFailure(response.errors));
    }
  };
}

export function updateTag(tag) {
  const tagsApi = new TagsApi();
  return async function(dispatch) {
    dispatch(updateTagBegin());
    const response = await tagsApi.update(tag);
    if (!response.errors) {
      dispatch(updateTagSuccess());
    }
    else {
      dispatch(updateTagFailure(response.errors));
    }
  };
}

export function createTag(tag) {
  const tagsApi = new TagsApi();
  return async function(dispatch) {
    dispatch(createTagBegin());
    const response = await tagsApi.create(tag);
    if (!response.errors) {
      dispatch(createTagSuccess());
    }
    else {
      dispatch(createTagFailure(response.errors));
    }
  };
}

export function deleteTag(id) {
  const tagsApi = new TagsApi();
  return async function(dispatch) {
    dispatch(deleteTagBegin());
    const response = await tagsApi.delete(id);
    if (!response.errors) {
      dispatch(deleteTagSuccess(response));
    }
    else {
      dispatch(deleteTagFailure(response.errors));
    }
  };
}

export function freeSessionErrors() {
  return function(dispatch) {
    dispatch(freeTagErrorsSuccess());
  };
}
