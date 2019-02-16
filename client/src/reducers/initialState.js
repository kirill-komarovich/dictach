export default {
  session: {
    errors: null,
    loading: false,
    authenticated: false,
  },
  locale: navigator.language.split(/[-_]/)[0],
  namespaces: {
    chosen: {},
    all: [],
  },
}
