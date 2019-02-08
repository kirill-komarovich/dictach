import {combineReducers} from 'redux';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import { persistReducer } from 'redux-persist';
import session from './sessionReducer';
import locale from './localeReducer';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['locale'],
};

const rootReducer = combineReducers({
  session,
  locale,
});

export default persistReducer(persistConfig, rootReducer);