import { setLocale } from 'src/locales';

export default {
  session: {
    errors: false,
    loading: false,
    authenticated: false,
  },
  tags: {
    chosen: {},
    all: [],
    loading: false,
  },
  dictionaries: {
    all: [],
    pages: 0,
    records: 0,
    loading: false,
  },
  dictionary: {
    id: 0,
    title: '',
    language: '',
    alphabeth: [],
    tags: [],
    created_at: '',
    updated_at: '',
    loading: false,
    errors: false,
  },
  words: {
    loading: false,
    errors: null,
  },
  word: {
    id: 0,
    title: '',
    created_at: '',
    updated_at: '',
    loading: false,
    errors: false,
  },
  locale: setLocale(),
  notifications: [],
};
