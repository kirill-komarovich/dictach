import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import logo from './logo.svg';
import { FormattedHTMLMessage } from 'react-intl';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <FormattedHTMLMessage id="app.intro" />
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
      </div>
    );
  }
}

export default withRouter(App);
