import React from 'react';
import PropTypes from 'prop-types';
import { SnackbarProvider } from 'notistack';
import Header from 'containers/header';
import './index.scss';

const containerMaxSnack = 5;

function DefaultLayout (props) {
  return (
    <div className="default-layout">
      <SnackbarProvider maxSnack={containerMaxSnack}>
        <div>
          <Header/>
          { props.children }
        </div>
      </SnackbarProvider>
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
