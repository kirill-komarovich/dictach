import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import store from './store'
import { Provider } from 'react-redux'
import App from './App';
import SignInForm from './components/signInForm';
import AuthenticationRoute from './components/authenticationRoute'
import history from './history';

export const makeRoutes = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={App} />
          {/* <Route path="/sign_in" component={SignInForm} /> */}
          <AuthenticationRoute path="/sign_in" component={SignInForm} />
          {/* <AuthRoute path="/sign_up" component={SignUpForm} /> */}
        </Switch>
      </Router>
    </Provider>
  );
};
