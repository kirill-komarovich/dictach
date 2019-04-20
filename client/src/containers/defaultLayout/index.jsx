import React from 'react';
import PropTypes from 'prop-types';
import { SnackbarProvider } from 'notistack';
import Header from 'containers/header';
import Notifier from 'components/notifier';
import './index.scss';

const CONTAINER_MAX_SNACK = 5;

function DefaultLayout ({ children }) {
  return (
    <div className="default-layout">
      <SnackbarProvider maxSnack={CONTAINER_MAX_SNACK}>
        <React.Fragment>
          <Notifier />
          <Header />
          { children }
        </React.Fragment>
      </SnackbarProvider>
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
