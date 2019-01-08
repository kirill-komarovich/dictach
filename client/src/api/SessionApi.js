import urls from './apiUrls';

class SessionApi {
  static async signin(credentials) {
    const request = new Request(urls.session.signin, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
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
}

export default SessionApi;
