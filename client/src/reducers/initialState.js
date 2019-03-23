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
    chosen: {},
    all: [],
    pages: 0,
    records: 0,
    loading: false,
    errors: null,
  },
  locale: navigator.language.split(/[-_]/)[0],
};
