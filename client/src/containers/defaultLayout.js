import React from 'react';
import Header from './header'
import { SnackbarProvider } from 'notistack';

function DefaultLayout (props) {
  console.log(props);
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
