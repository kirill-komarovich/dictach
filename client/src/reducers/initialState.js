export default {
  session: {
    errors: null,
    loading: false,
    authenticated: false,
  },
  tags: {
    chosen: {},
    all: [],
    loading: false,
    errors: null,
  },
  dictionaries: {
    all: [],
    pages: 0,
    records: 0,
    loading: false,
    errors: null,
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
    errors: null,
  },
  locale: navigator.language.split(/[-_]/)[0],
};
