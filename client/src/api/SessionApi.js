import urls from '../urls';

class SessionApi {
  static async signin(credentials) {
    const request = new Request(urls.session.signin, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        grant_type: 'password',
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

  static signup(credentials) {
    const request = new Request(urls.session.signup, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({user: credentials})
    });
    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static verify(token){
    const request = new Request('/api/token/verify/', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
          token,
      })
    });

    return fetch(request).then( response => {
      if (!response.ok) throw `Please, log in again`;
      return response;
    }).then(response => {
      return response.json();
    }).catch(error => {
      throw error;
    });
  }
}

export default SessionApi;
