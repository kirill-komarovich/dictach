import { generatePath } from 'react-router';

const paths = {
  root: '/',
  dictionaries: '/dicts',
  dictionary: '/dicts/:id/',
  word: '/dicts/:id/:letter/:wordId',
  dictioanryPath(id) {
    return generatePath(this.dictionary, { id });
  },
  wordPath(id, letter, wordId) {
    return generatePath(this.word, { id, letter, wordId });
  }
};

export default paths;
