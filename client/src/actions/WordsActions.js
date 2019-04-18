import * as types from 'src/actionTypes/words';
import WordsApi from 'src/api/WordsApi';

export function fetchAllWordsFailure(errors) {
  return { type: types.FETCH_ALL_BY_LETTER_FAILURE, errors };
}

export function fetchAllWordsByLetter(dictionary_id, letter) {
  const wordsApi = new WordsApi();
  return async function(dispatch) {
    dispatch({ type: types.FETCH_ALL_BY_LETTER_BEGIN });
    const response = await wordsApi.fetchAllByLetter(dictionary_id, letter);
    if (!response.errors) {
      dispatch({
        type: types.FETCH_ALL_BY_LETTER_SUCCESS,
        letter,
        words: response,
      });
    } else {
      dispatch(fetchAllWordsFailure(response.errors));
    }
  };
}
