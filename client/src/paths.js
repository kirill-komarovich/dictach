import { generatePath } from 'react-router';

const paths = {
  root: '/',
  dictioanries: '/dicts',
  dictionary: '/dicts/:id/',
  dictioanryPath(id) {
    return generatePath(`${this.dictioanries}/:id`, { id });
  }
};

export default paths;
