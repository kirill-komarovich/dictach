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
    if (this.props.authenticated === false) return;
    this.props.actions.checkAuthentication();
  }

  render () {
    if (this.props.session.loading) {
      return (
        <CircularProgress className="screen-loader" size={LOADER_SIZE} />
      );
    } else if (this.props.authenticated !== this.props.session.authenticated) {
      return (
        <Redirect to={{pathname: this.props.unauthorizedRedirectTo, state: {from: this.props.location}}} />
      );
    } else {
      return (
        <Route {...this.props} />
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

function mapStateToProps(state) {
  const { session: { authenticated } } = state;
  return {
    session: { authenticated },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationRoute);
