import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import * as sessionActions from '../../actions/SessionActions';
import { capitalize } from '../../utils/str'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './index.scss'

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

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
    const { classes } = this.props;
    this.handleErrorMessages();
    return (
      <div className={'signin-form'}>
        <form onSubmit={this.onSubmit}>
          <Grid item xs={12} container direction="column" spacing={16}>
            <Typography className={'title'} variant="headline" component="headline">
              Sign In
            </Typography>
            <FormControl fullWidth={true}>
              <TextField
                label="Email"
                className={classes.textField}
                type="email"
                name="email"
                autoComplete="email"
                margin="normal"
                variant="outlined"
                fullWidth={true}
                autoFocus={true}
                onChange={this.onChange}
                />
            </FormControl>
            <FormControl fullWidth={true}>
              <TextField
                label="Password"
                className={classes.textField}
                type="password"
                autoComplete="current-password"
                margin="normal"
                name="password"
                variant="outlined"
                fullWidth={true}
                onChange={this.onChange}
                />
            </FormControl>
            <Grid item container spacing={16} alignItems={'center'} className={'buttons'}>
              <Grid item className={'far-left'}>
                <Button variant="contained" color="primary" className={classes.button} type={'submit'}>
                  Sign in
                </Button>
              </Grid>
              <Grid item>
                <Typography variant="body">Or</Typography>
              </Grid>
              <Grid item className={'far-right'}>
                <Link to={'/sign_up'}>
                  <Typography variant="body">Sign Up</Typography>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

SignInForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignInForm)));
