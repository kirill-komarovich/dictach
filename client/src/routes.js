import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import { Provider } from 'react-redux'
import App from './App';
import SignInForm from './components/signInForm';
import SignInContainer from './containers/signInContainer';
import AuthenticationRoute from './components/authenticationRoute'
import history from './history';

export const makeRoutes = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={App} />
            {/* <Route path="/sign_in" component={SignInForm} /> */}
            <AuthenticationRoute path="/sign_in" component={SignInContainer} />
            {/* <AuthRoute path="/sign_up" component={SignUpForm} /> */}
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
};
