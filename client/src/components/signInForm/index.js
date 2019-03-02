import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from 'actions/SessionActions';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { withSnackbar } from 'notistack';
import { injectIntl, intlShape } from 'react-intl';
import { capitalize } from 'utils/str';
import './index.scss';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

const formXs = 12;
const submitButtonXs = 6;
const SNACKBAR_HIDE_DURATION = 3000;

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        email: '',
        password: ''
      }
    };
  }

  onChange = (event) => {
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;
    return this.setState({credentials: credentials});
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.actions.signInUser(this.state.credentials);
  }

  handleErrorMessages = () => {
    const { session: { errors }, actions: { freeSessionErrors }, enqueueSnackbar } = this.props;
    if (!errors) return undefined;
    errors.forEach((error) => {
      enqueueSnackbar(error, {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        variant: 'error',
        autoHideDuration: SNACKBAR_HIDE_DURATION,
      });
    });
    freeSessionErrors();
  }

  locales = {
    emailLabel: capitalize(this.props.intl.formatMessage({id: 'user.attributes.email'})),
    passwordLabel: capitalize(this.props.intl.formatMessage({id: 'user.attributes.password'})),
    signInLabel: this.props.intl.formatMessage({id: 'session.sign_in'})
  }

  render() {
    const { classes } = this.props;
    const { emailLabel, passwordLabel, signInLabel } = this.locales;
    this.handleErrorMessages();
    return (
      <div className="signin-form">
        <form onSubmit={this.onSubmit}>
          <Grid item xs={formXs} container direction="column">
            <FormControl fullWidth={true}>
              <TextField
                label={emailLabel}
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
                label={passwordLabel}
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
            <Grid item container className="buttons">
              <Grid item xs={submitButtonXs}>
                <Button variant="contained" color="primary" className={classes.button} type="submit">
                  {signInLabel}
                </Button>
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
  enqueueSnackbar: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
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

const SignInFormWithIntl = injectIntl(SignInForm);
const SignInFormWithSnackbar = withSnackbar(SignInFormWithIntl)
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignInFormWithSnackbar));
