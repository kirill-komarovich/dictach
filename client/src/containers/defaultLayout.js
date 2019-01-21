import React from 'react';
import Header from 'containers/header';
import { SnackbarProvider } from 'notistack';

function DefaultLayout (props) {
  return (
    <div className={'default-layout'}>
      <SnackbarProvider maxSnack={5}>
        <div>
          <Header/>
          {props.children}
        </div>
      </SnackbarProvider>
    </div>
  )
}

export default DefaultLayout;
