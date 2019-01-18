import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as sessionActions from 'actions/SessionActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import urls from 'urls';

class AuthenticationRoute extends Component {
  render () {
    if (this.props.session.loading) {
      return (
        <CircularProgress className={'screen-loader'} size={100} />
      )
    } else if (this.props.authenticated !== this.props.session.authenticated) {
      return (
        <Redirect to={{pathname: urls.root, state: {from: this.props.location}}} />
      )
    } else {
      return (
        <Route {...this.props} />
      )
    }
  };

  componentDidMount() {
    if (this.props.authenticated) return;
    this.props.actions.checkAuthentication();
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
}

AuthenticationRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
  authenticated: PropTypes.bool.isRequired,
}

AuthenticationRoute.defaultProps = {
  authenticated: false,
};
export default connect(state => state, mapDispatchToProps)(AuthenticationRoute);
