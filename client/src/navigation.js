import paths from './paths';
import history from './history';

export function redirectToRoot() {
  history.push(paths.root);
}

export function redirectToDictionaries() {
  history.push(paths.dictioanries);
}
