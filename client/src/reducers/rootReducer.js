import {combineReducers} from 'redux';
import session from './sessionReducer';
import tags from './tagsReducer';
import locale from './localeReducer';

const rootReducer = combineReducers({
  session,
  tags,
  locale,
});

export default rootReducer;
