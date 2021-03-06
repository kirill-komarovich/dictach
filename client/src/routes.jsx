import React from 'react';
import { Router, Switch } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { Provider } from 'react-redux';
import DictionariesContainer from 'containers/dictionariesContainer';
import AuthenticationRoute from 'components/authenticationRoute';
import DefaultLayout from 'containers/defaultLayout';
import RootContainer from 'containers/rootContainer';
import DictionaryContainer from 'containers/dictionaryContainer';
import history from './history';
import paths from './paths';
import ConnectedIntlProvider from 'components/connectedIntrlProvider';
import AuthProvider from 'components/authProvider';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

const Routes = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <AuthProvider>
          <MuiThemeProvider theme={theme} >
            <ConnectedIntlProvider >
              <Router history={history}>
                <DefaultLayout>
                  <Switch>
                    <AuthenticationRoute
                      exact
                      path={paths.root}
                      unauthorizedRedirectTo={paths.dictionaries}
                      component={RootContainer}
                    />
                    <AuthenticationRoute
                      exact
                      path={paths.dictionaries}
                      authenticated
                      component={DictionariesContainer}
                    />
                    <AuthenticationRoute
                      exact
                      path={paths.dictionary}
                      authenticated
                      component={DictionaryContainer}
                    />
                    <AuthenticationRoute
                      path={paths.word}
                      authenticated
                      component={DictionaryContainer}
                    />
                  </Switch>
                </DefaultLayout>
              </Router>
            </ConnectedIntlProvider>
          </MuiThemeProvider>
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
};


export default Routes;
