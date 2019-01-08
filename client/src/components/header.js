import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import * as sessionActions from '../actions/SessionActions';

class Header extends Component {
  constructor(props) {
    super(props);
    this.logo = this.logo.bind(this);
  }

  render() {
    return (
      <div className={'header'}>
        
      </div>
    );
  }

  logo() {
    return (
      <div className={'logo'}>
        Dictach
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
}

function mapStateToProps(state, ownProps) {
  return {
    session: state.session
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
