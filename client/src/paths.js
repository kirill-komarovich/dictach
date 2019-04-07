import { generatePath } from 'react-router';

const paths = {
  root: '/',
  dictionaries: '/dicts',
  dictionary: '/dicts/:id/',
  dictioanryPath(id) {
    return generatePath(`${this.dictionaries}/:id`, { id });
  }
};

export default paths;
