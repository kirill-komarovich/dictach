import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'
import DefaultLayout from './containers/defaultLayout';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <DefaultLayout>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
          <Link to={'/sign_in'}>Sign In</Link>
        </div>
      </DefaultLayout>
    );
  }
}

export default withRouter(App);

