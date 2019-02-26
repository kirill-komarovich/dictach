import React from 'react';
import Header from 'containers/header';
import { SnackbarProvider } from 'notistack';
import './index.scss';

const containerMaxSnack = 5;

function DefaultLayout (props) {
  return (
    <div className="default-layout">
      <SnackbarProvider maxSnack={containerMaxSnack}>
        <div>
          <Header/>
          {props.children}
        </div>
      </SnackbarProvider>
    </div>
  )
}

export default DefaultLayout;
