import * as types from '../actionTypes/tags';
import TagsApi from '../api/TagsApi';

export function fetchAllTagsFailure(errors) {
  return {type: types.FETCH_ALL_TAGS_FAILURE, errors};
}

export function updateTagFailure(errors) {
  return {type: types.UPDATE_TAG_FAILURE, errors};
}

export function createTagFailure(errors) {
  return {type: types.CREATE_TAG_FAILURE, errors};
}

export function deleteTagFailure(errors) {
  return {type: types.DELETE_TAG_FAILURE, errors};
}


export function fetchAllTags() {
  const tagsApi = new TagsApi();
  return async function(dispatch) {
    dispatch({ type: types.FETCH_ALL_TAGS_BEGIN });
    const response = await tagsApi.fetchAll();
    if (!response.errors) {
      dispatch({ type: types.FETCH_ALL_TAGS_SUCCESS, tags: response });
    }
    else {
      dispatch(fetchAllTagsFailure(response.errors));
    }
  };
}

export function updateTag(tag) {
  const tagsApi = new TagsApi();
  return async function(dispatch) {
    dispatch({ type: types.UPDATE_TAG_BEGIN });
    const response = await tagsApi.update(tag);
    if (!response.errors) {
      dispatch({ type: types.UPDATE_TAG_SUCCESS });
    }
    else {
      dispatch(updateTagFailure(response.errors));
    }
  };
}

export function createTag(tag) {
  const tagsApi = new TagsApi();
  return async function(dispatch) {
    dispatch({ type: types.CREATE_TAG_BEGIN });
    const response = await tagsApi.create(tag);
    if (!response.errors) {
      dispatch({ type: types.CREATE_TAG_SUCCESS });
    }
    else {
      dispatch(createTagFailure(response.errors));
    }
  };
}

export function deleteTag(id) {
  const tagsApi = new TagsApi();
  return async function(dispatch) {
    dispatch({ type: types.DELETE_TAG_BEGIN });
    const response = await tagsApi.delete(id);
    if (!response.errors) {
      dispatch({ type: types.DELETE_TAG_SUCCESS, tag: response });
    }
    else {
      dispatch(deleteTagFailure(response.errors));
    }
  };
}

export function freeTagErrors() {
  return function(dispatch) {
    dispatch({ type: types.FREE_TAG_ERRORS });
  };
}
