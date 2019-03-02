const urls = {
  session: {
    signin: '/users/sign_in',
    signup: '/users/sign_up',
    signout: '/users/sign_out',
    check: '/authentication_checks',
  },

  tags: () => '/tags',
  tag: (id) => `/tags/${id}`,

  dictionaries: () => '/dictionaries',
  dictionary(id) {
    return `${this.dictionaries}/${id}`;
  },

  words(dictionary_id, letter) {
    const url = `${this.dictionary(dictionary_id)}/words`;
    if (letter === undefined) {
      return url;
    }
    return this.withQueryParams(url, { letter })
  },
  word(dictionary_id, id) {
    return `${this.dictionary(dictionary_id)}/word/${id}`
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
  put: 'PUT',
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
