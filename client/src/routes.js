import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { Provider } from 'react-redux';
import App from './App';
import AuthenticationRoute from 'components/authenticationRoute';
import DefaultLayout from 'containers/defaultLayout';
import RootContainer from 'containers/unauthenticated/rootContainer';
import history from './history';
import urls from './urls';
import ConnectedIntlProvider from 'components/connectedIntrlProvider';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

export const makeRoutes = () => {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme} >
        <ConnectedIntlProvider >
          <PersistGate loading={null} persistor={persistor}>
            <Router history={history}>
              <DefaultLayout>
                <Switch>
                  <AuthenticationRoute exact path={urls.dictioanries} authenticated component={App} />
                  <AuthenticationRoute exact path={urls.root} unauthorizedRedirectTo={urls.dictioanries} component={RootContainer} />
                </Switch>
              </DefaultLayout>
            </Router>
          </PersistGate>
        </ConnectedIntlProvider>
      </MuiThemeProvider>
    </Provider>
  );
};
