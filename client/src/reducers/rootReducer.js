import {combineReducers} from 'redux';
import session from './sessionReducer';
import namespaces from './namespacesReducer';
import locale from './localeReducer';

const rootReducer = combineReducers({
  session,
  namespaces,
  locale,
});

export default rootReducer;
