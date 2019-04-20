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
  locale: navigator.language.split(/[-_]/)[0],
  notifications: [],
};
