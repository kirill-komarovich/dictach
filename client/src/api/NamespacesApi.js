import { urls, methods, headers } from './apiUrls';

class NamespacesApi {
  async fetchAll() {
    const request = new Request(urls.namespaces(), {
      method: methods.get,
      headers: new Headers({
        ...headers.accept.json,
      }),
    });

    try {
      const response = await fetch(request);
      return response.json();
    }

    catch (error) {
      return error;
    }
  }

  async fetchById(id) {
    const request = new Request(urls.namespace(id), {
      method: methods.get,
      headers: new Headers({
        ...headers.accept.json,
      }),
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

export default NamespacesApi;
