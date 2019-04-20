import * as types from 'src/actionTypes/tags';
import TagsApi from 'src/api/TagsApi';
import { enqueueErrors } from './NotificationsActions';

export function fetchAllTags() {
  const tagsApi = new TagsApi();
  return async function(dispatch) {
    dispatch({ type: types.FETCH_ALL_TAGS_BEGIN });
    const response = await tagsApi.fetchAll();
    if (!response.errors) {
      dispatch({ type: types.FETCH_ALL_TAGS_SUCCESS, tags: response });
    }
    else {
      dispatch({ type: types.FETCH_ALL_TAGS_FAILURE });
      dispatch(enqueueErrors(response.errors));
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
      dispatch({ type: types.UPDATE_TAG_FAILURE });
      dispatch(enqueueErrors(response.errors));
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
      dispatch({ type: types.CREATE_TAG_FAILURE });
      dispatch(enqueueErrors(response.errors));
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
      dispatch({ type: types.DELETE_TAG_FAILURE });
      dispatch(enqueueErrors(response.errors));
    }
  };
}
