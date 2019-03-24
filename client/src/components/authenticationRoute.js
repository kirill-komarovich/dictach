import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { checkAuthentication } from 'actions/SessionActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import paths from 'src/paths';

const LOADER_SIZE = 100;

class AuthenticationRoute extends Component {
  componentDidMount() {
    const { authenticated, actions: { checkAuthentication } } = this.props;
    if (!authenticated) return;
    checkAuthentication();
  }

  render () {
    const {
      authenticated,
      unauthorizedRedirectTo,
      session: { authenticated: storedAuthenticated, loading },
      location,
      ...props
    } = this.props;
    if (loading) {
      return (
        <CircularProgress className="screen-loader" size={LOADER_SIZE} />
      );
    } else if (authenticated !== storedAuthenticated) {
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
  }).isRequired,
  actions: PropTypes.shape({
    checkAuthentication: PropTypes.func.isRequired,
  }).isRequired,
};

AuthenticationRoute.defaultProps = {
  authenticated: false,
  unauthorizedRedirectTo: paths.root,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ checkAuthentication }, dispatch)
  };
}

function mapStateToProps({ session: { authenticated } }) {
  return {
    session: { authenticated },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationRoute);
