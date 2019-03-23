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
  locale: navigator.language.split(/[-_]/)[0],
};
