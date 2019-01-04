import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as sessionActions from '../actions/SessionActions';
import urls from '../urls'

function AuthenticationRoute ({component: Component, ...rest}) {
  const access_token_expired = localStorage.access_token_expires_at
    ? Date.now() > localStorage.access_token_expires_at : true
  const has_tokens = localStorage.access_token && localStorage.refresh_token
  // TODO: check if token expired
  return (
    <Route
      {...rest}
      render={(props) => !has_tokens
        ? <Component {...props} />
        : <Redirect to={{pathname: urls.root, state: {from: props.location}}} />}
    />
  )
}

function mapStateToProps(state, ownProps) {
  return {
    session: state.session
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
}

export default connect({}, mapDispatchToProps)(AuthenticationRoute);
