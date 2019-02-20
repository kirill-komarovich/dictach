import { urls, methods, headers } from './apiUrls';

class RegistrationApi {
  async signup(credentials) {
    const request = new Request(urls.session.signup, {
      method: methods.post,
      headers: new Headers({
        ...headers.contentType.json,
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
