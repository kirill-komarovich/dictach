import ReactDOM from 'react-dom';
import 'typeface-roboto';
import './index.scss';
import { makeRoutes } from './routes'
import * as serviceWorker from './serviceWorker';

const routes = makeRoutes();
ReactDOM.render(routes, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
