import { urls, methods, headers } from './apiUrls';

class SessionApi {
  async signin(credentials) {
    const request = new Request(urls.session.signin, {
      method: methods.post,
      headers: new Headers({
        ...headers.contentType.json,
      }),
      body: JSON.stringify({
        user: {
          email: credentials.email,
          password: credentials.password
        }
      }),
    });

    try {
      const response = await fetch(request);
      return response.json();
    }
    catch (error) {
      throw error;
    }
  }

  async signout() {
    const request = new Request(urls.session.signout, {
      method: methods.delete,
    });

    try {
      const response = await fetch(request);
      return response;
    }
    catch (error) {
      throw error;
    }
  }

  async checkAuthentication() {
    const request = new Request(urls.session.check, {
      method: methods.get,
    });

    try {
      const response = await fetch(request);
      return response.json();
    }
    catch (error) {
      throw error;
    }
  }
}

export default SessionApi;
