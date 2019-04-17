import { combineReducers } from 'redux';
import session from './sessionReducer';
import tags from './tagsReducer';
import dictionaries from './dictionariesReducer';
import dictionary from './dictionaryReducer';
import locale from './localeReducer';

const rootReducer = combineReducers({
  session,
  tags,
  dictionaries,
  dictionary,
  locale,
});

export default rootReducer;
