import { combineReducers } from 'redux';
import session from './sessionReducer';
import tags from './tagsReducer';
import dictionaries from './dictionariesReducer';
import dictionary from './dictionaryReducer';
import words from './wordsReducer';
import word from './wordReducer';
import locale from './localeReducer';
import notifications from './notificationsReducer';

const rootReducer = combineReducers({
  session,
  tags,
  dictionaries,
  dictionary,
  words,
  word,
  locale,
  notifications,
});

export default rootReducer;
