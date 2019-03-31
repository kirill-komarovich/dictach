import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import paths from 'src/paths';

class AuthenticationRoute extends Component {
  render () {
    const {
      authenticated,
      unauthorizedRedirectTo,
      session: { authenticated: storedAuthenticated },
      location,
      ...props
    } = this.props;
    if (authenticated !== storedAuthenticated) {
      return (
        <Redirect to={{ pathname: unauthorizedRedirectTo, state: { from: location } }} />
      );
    } else {
      return (
        <Route {...props} />
      );
    }
  }
}

AuthenticationRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
  authenticated: PropTypes.bool.isRequired,
  unauthorizedRedirectTo: PropTypes.string.isRequired,
  session: PropTypes.shape({
    authenticated: PropTypes.bool.isRequired,
  }),
};

AuthenticationRoute.defaultProps = {
  authenticated: false,
  unauthorizedRedirectTo: paths.root,
};

function mapStateToProps({ session: { authenticated } }) {
  return {
    session: { authenticated },
  };
}

export default connect(mapStateToProps)(AuthenticationRoute);
