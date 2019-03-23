import paths from './paths';
import history from './history';

module.export = {
  redirectToRoot: () => {
    history.push(paths.root);
  },
  redirectToDictionaries: () => {
    history.push(paths.dictioanries);
  },
};
