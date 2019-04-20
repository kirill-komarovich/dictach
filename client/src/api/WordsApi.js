import { urls, methods, headers } from './apiUrls';

class WordsApi {
  async fetchAllByLetter(dictionary_id, letter) {
    const request = new Request(urls.words(dictionary_id, letter), {
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
}

export default WordsApi;
