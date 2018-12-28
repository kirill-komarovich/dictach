import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import SignInForm from '../components/signInForm'

class SignInPage extends Component {
  render() {
    return (
      <div className="signin-page">
        <p>Sign in Page</p>
        <SignInForm />
      </div>
    );
  }
}

export default withRouter(SignInPage);
