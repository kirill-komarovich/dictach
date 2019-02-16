import urls from './apiUrls';

class NamespacesApi {
  async fetchAll(withDictionaries = false) {
    const request = new Request(urls.namespaces, {
      method: 'GET',
      headers: new Headers({
        'Accept': 'application/json',
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
      method: 'GET',
      headers: new Headers({
        'Accept': 'application/json',
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
