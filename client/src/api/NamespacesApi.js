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

  async update({ id, title }) {
    const request = new Request(urls.namespace(id), {
      method: methods.put,
      headers: new Headers({
        ...headers.contentType.json,
      }),
      body: JSON.stringify({
        namespace: {
          title,
        }
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

  async delete(id) {
    const request = new Request(urls.namespace(id), {
      method: methods.delete,
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
