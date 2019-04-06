import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import paths from 'src/paths';

function AuthenticationRoute({
  authenticated,
  unauthorizedRedirectTo,
  session: { storedAuthenticated },
  component: Component,
  ...rest
}) {

  return (
    <Route
      {...rest}
      render={({ location, ...props }) => {
        return authenticated === storedAuthenticated ? (
          <Component {...props}/>
        ) : (
          <Redirect to={{ pathname: unauthorizedRedirectTo, state: { from: location } }} />
        );
      }}
    />
  );
}

AuthenticationRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
  authenticated: PropTypes.bool.isRequired,
  unauthorizedRedirectTo: PropTypes.string.isRequired,
  session: PropTypes.shape({
    storedAuthenticated: PropTypes.bool.isRequired,
  }),
};

AuthenticationRoute.defaultProps = {
  authenticated: false,
  unauthorizedRedirectTo: paths.root,
};

function mapStateToProps({ session: { authenticated } }) {
  return {
    session: { storedAuthenticated: authenticated },
  };
}

export default connect(mapStateToProps)(AuthenticationRoute);
