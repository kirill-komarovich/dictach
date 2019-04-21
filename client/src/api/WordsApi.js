import { urls, methods, headers } from './apiUrls';

class WordsApi {
  async fetchAllByLetter(dictionaryId, letter) {
    const request = new Request(urls.words(dictionaryId, letter), {
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

  async create(dictionaryId, { title }) {
    const request = new Request(urls.words(dictionaryId), {
      method: methods.post,
      headers: new Headers({
        ...headers.contentType.json,
      }),
      body: JSON.stringify({
        word: {
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

  async fetch(dictionaryId, id) {
    const request = new Request(urls.word(dictionaryId, id), {
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

  async update(dictionaryId, { id, title }) {
    const request = new Request(urls.word(dictionaryId, id), {
      method: methods.put,
      headers: new Headers({
        ...headers.contentType.json,
      }),
      body: JSON.stringify({
        word: {
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
}

export default WordsApi;
