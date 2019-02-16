import { urls, methods, headers } from './apiUrls';

class TagsApi {
  async fetchAll() {
    const request = new Request(urls.tags(), {
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

  async create({ title }) {
    const request = new Request(urls.tags(), {
      method: methods.post,
      headers: new Headers({
        ...headers.contentType.json,
      }),
      body: JSON.stringify({
        tag: {
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

  async update({ id, title }) {
    const request = new Request(urls.tag(id), {
      method: methods.put,
      headers: new Headers({
        ...headers.contentType.json,
      }),
      body: JSON.stringify({
        tag: {
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
    const request = new Request(urls.tag(id), {
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

export default TagsApi;
