import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as sessionActions from '../actions/SessionActions';
import urls from '../urls'

function AuthenticationRoute ({component: Component, ...props}) {
  return (
    <Route
      {...props}
      render={() => renderAuthenticationComponent(Component, props)}
    />
  )
}

function renderAuthenticationComponent(Component, props) {
  return props.session.authenticated
        ? <Redirect to={{pathname: urls.root, state: {from: props.location}}} />
        : <Component {...props} />
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

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationRoute);
