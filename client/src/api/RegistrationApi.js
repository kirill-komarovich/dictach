import urls from './apiUrls';

class RegistrationApi {
  static async signup(credentials) {
    const request = new Request(urls.session.signup, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({user: credentials})
    });
    try {
      const response = await fetch(request);
      return response.json();
    }
    catch (error) {
      return error;
    }
  }
}

export default RegistrationApi;
