import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter, Link } from 'react-router-dom'
import { Button, Row, Col,  Input, Card} from 'react-materialize';
import {bindActionCreators} from 'redux';
import * as sessionActions from '../actions/SessionActions';

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        email: '',
        password: ''
      }
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(event) {
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;
    return this.setState({credentials: credentials});
  }

  onSave(event) {
    event.preventDefault();
    this.props.actions.logInUser(this.state.credentials);
  }

  render() {
    return (
      <div className={'sign-form'}>
        <Row>
          <Col m={4} s={12} offset={'m4'}>
            <Card title='Sign In' className={'grey lighten-5'}>
              <Input type="email" name="email" label="Email" s={12} onChange={this.onChange} value={this.state.credentials.username}/>
              <Input type="password" name="password" label="Password" s={12} onChange={this.onChange} value={this.state.credentials.password}/>
              <Button waves={"light"} type={"submit"} onClick={this.onSave}>Sign In</Button>
              <span>Or</span>
              <Link to={'/sign_up'}>Sign Up</Link>
            </Card>
          </Col>
        </Row>
      </div>
    );
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignInForm));

