import React from 'react';
import { Router, Switch } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { Provider } from 'react-redux';
import NamespacesContainer from 'containers/namespacesContainer';
import AuthenticationRoute from 'components/authenticationRoute';
import DefaultLayout from 'containers/defaultLayout';
import RootContainer from 'containers/rootContainer';
import history from './history';
import paths from './paths';
import ConnectedIntlProvider from 'components/connectedIntrlProvider';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

const Routes = () => {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme} >
        <ConnectedIntlProvider >
          <PersistGate loading={null} persistor={persistor}>
            <Router history={history}>
              <DefaultLayout>
                <Switch>
                  <AuthenticationRoute exact path={paths.dictioanries} authenticated component={NamespacesContainer} />
                  <AuthenticationRoute
                    exact
                    path={paths.root}
                    unauthorizedRedirectTo={paths.dictioanries}
                    component={RootContainer}
                  />

                </Switch>
              </DefaultLayout>
            </Router>
          </PersistGate>
        </ConnectedIntlProvider>
      </MuiThemeProvider>
    </Provider>
  );
};


export default Routes;
