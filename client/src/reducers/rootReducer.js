import {combineReducers} from 'redux';
import session from './sessionReducer';
import tags from './tagsReducer';
import dictionaries from './dictionariesReducer';
import locale from './localeReducer';

const rootReducer = combineReducers({
  session,
  tags,
  dictionaries,
  locale,
});

export default rootReducer;
