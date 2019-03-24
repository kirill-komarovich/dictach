import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HeaderMenu from 'components/headerMenu';
import Logo from 'components/logo';
import './index.scss';

function Header(props) {
  return (
    <AppBar className="header" position="fixed">
      <Toolbar>
        <Logo className="logo" />
        { props.session.authenticated && (<HeaderMenu />)}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  session: PropTypes.shape({
    authenticated: PropTypes.bool.isRequired,
  }).isRequired,
};

function mapStateToProps({ session: { authenticated } }) {
  return {
    session: { authenticated },
  };
}

export default connect(mapStateToProps)(Header);
