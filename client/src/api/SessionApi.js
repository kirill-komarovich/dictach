import urls from './apiUrls';

const requestMethods = {
  get: 'GET',
  post: 'POST',
  delete: 'DELETE'
}

const headers = {
  contentType: {
    json: {
      'Content-Type': 'application/json',
    }
  },
}

class SessionApi {
  static async signin(credentials) {
    const request = new Request(urls.session.signin, {
      method: requestMethods.post,
      headers: new Headers({
        ...headers.contentType.json,
      }),
      body: JSON.stringify({
        user: {
          email: credentials.email,
          password: credentials.password
        }
      })
    });

    try {
      const response = await fetch(request);
      return response.json();
    }
    catch (error) {
      throw error;
    }
  }

  static async signout() {
    const request = new Request(urls.session.signout, {
      method: requestMethods.delete,
    });

    try {
      const response = await fetch(request);
      return response;
    }
    catch (error) {
      throw error;
    }
  }

  static async checkAuthentication() {
    const request = new Request(urls.session.check, {
      method: requestMethods.get,
    });

    try {
      const response = await fetch(request);
      const authenticated = response.status === 401 ? false : true;
      return authenticated;
    }
    catch (error) {
      throw error;
    }
  }
}

export default SessionApi;
