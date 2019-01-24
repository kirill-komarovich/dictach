import React from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HeaderMenu from 'components/headerMenu';
import Logo from 'components/logo';
import './index.scss';

function Header(props) {
  return (
    <AppBar className={'header'} position="static">
      <Toolbar>
        <Logo className={'logo'} />
        {props.session.authenticated && (<HeaderMenu />)}
      </Toolbar>
    </AppBar>
  );
};

function mapStateToProps(state) {
  return {
    session: state.session
  };
};

export default connect(mapStateToProps)(Header);
