import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter, Link } from 'react-router-dom'
import { Button, Row, Col,  Input, Card} from 'react-materialize';
import {bindActionCreators} from 'redux';
import * as sessionActions from '../actions/SessionActions';
import { capitalize } from '../utils/str'

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
    this.onSubmit = this.onSubmit.bind(this);
    this.emailInput = React.createRef();
  }

  onChange(event) {
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;
    return this.setState({credentials: credentials});
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.actions.signInUser(this.state.credentials);
  }

  componentDidMount() {
    console.log(this.emailInput.current);
    document.getElementById(this.emailInput.current._id).focus();
  }

  handleErrorMessages(){
    if (!this.props.session.errors) return null;
    const errors = this.props.session.errors;
    errors.forEach((error) => {
      window.M.toast({
        html: capitalize(error),
        displayLength: 3000,
        classes: 'red lighten-2'
      });
    });
    this.props.actions.freeSessionErrors();
  }

  render() {
    this.handleErrorMessages();
    return (
      <div className={'sign-form'}>
        <form onSubmit={this.onSubmit}>
          <Row>
            <Col m={4} s={12} offset={'m4'}>
              <Card title='Sign In' className={'grey lighten-5'}>
                <Input
                  type="email"
                  name="email"
                  label="Email"
                  s={12}
                  onChange={this.onChange}
                  value={this.state.credentials.username}
                  ref={this.emailInput}
                />
                <Input
                  type="password"
                  name="password"
                  label="Password"
                  s={12}
                  onChange={this.onChange}
                  value={this.state.credentials.password}
                />
                <Button waves={"light"} type={"submit"}>Sign In</Button>
                <span>Or</span>
                <Link to={'/sign_up'}>Sign Up</Link>
              </Card>
            </Col>
          </Row>
        </form>
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

