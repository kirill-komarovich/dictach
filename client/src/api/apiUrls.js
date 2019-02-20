const urls = {
  session: {
    signin: '/users/sign_in',
    signup: '/users/sign_up',
    signout: '/users/sign_out',
    check: '/authentication_checks',
  },

  namespaces(withDictionaries = false) {
    const url = '/namespaces';
    if (withDictionaries) {
      return this.withQueryParams(url, { 'with_dictionaries': 1 })
    }
    return url;
  },

  namespace: (id) => `/namespace/${id}`,

  dictionaries(namespace_id) {
    return `${this.namespace(namespace_id)}/dictionaries`
  },

  dictionary(namespace_id, id) {
    return `${this.namespace(namespace_id)}/dictionary/${id}`
  },

  words(namespace_id, dictionary_id, letter) {
    const url = `${this.dictionary(namespace_id, dictionary_id)}/words`;
    if (letter === undefined) {
      return url;
    }
    return this.withQueryParams(url, { letter })
  },

  word(namespace_id, dictionary_id, id) {
    return `${this.dictionary(namespace_id, dictionary_id)}/word/${id}`
  },

  withQueryParams(originUrl, params) {
    let url = originUrl.concat('?');
    Object.keys(params).forEach((param) => {
      url = url.concat(`${param}=${params[param]}&`);
    });
    return url.slice(0, -1);
  }
};


const methods = {
  get: 'GET',
  post: 'POST',
  delete: 'DELETE',
};

const headers = {
  contentType: {
    json: {
      'Content-Type': 'application/json',
    },
  },
  accept: {
    json: {
      'Accept': 'application/json',
    },
  },
};

export {
  urls,
  methods,
  headers,
};
