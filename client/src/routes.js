import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { Provider } from 'react-redux';
import App from './App';
import { IntlProvider } from 'react-intl';
import AuthenticationRoute from 'components/authenticationRoute';
import DefaultLayout from 'containers/defaultLayout';
import RootContainer from 'containers/unauthenticated/rootContainer';
import history from './history';
import urls from './urls';

export const makeRoutes = () => {
  return (
    <Provider store={store}>
      <IntlProvider>
        <PersistGate loading={null} persistor={persistor}>
          <Router history={history}>
            <DefaultLayout>
              <Switch>
                <Route exact path={urls.root} component={App} />
                {/* <Route path="/sign_in" component={SignInForm} /> */}
                <AuthenticationRoute path={urls.session.signin} component={RootContainer} />
              </Switch>
            </DefaultLayout>
          </Router>
        </PersistGate>
      </IntlProvider>
    </Provider>
  );
};
