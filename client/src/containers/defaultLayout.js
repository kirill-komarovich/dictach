import React from 'react';
import Header from '../components/header'

function DefaultLayout (props) {
  console.log(props);
  return (
    <div className={'default-layout'}>
      <Header/>
      {props.children}
    </div>
  )
}

export default DefaultLayout;
