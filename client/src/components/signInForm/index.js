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
    if (!this.props.session.errors) return undefined;
    const errors = this.props.session.errors;
    errors.forEach((error) => {
      this.props.enqueueSnackbar(error, {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        variant: 'error',
        autoHideDuration: 3000,
      });
    });
    this.props.actions.freeSessionErrors();
  }

  render() {
    const { classes, intl } = this.props;
    const emailLabel = capitalize(intl.formatMessage({id: 'user.attributes.email'}));
    const passwordLabel = capitalize(intl.formatMessage({id: 'user.attributes.password'}));
    const signInLabel = intl.formatMessage({id: 'session.sign_in'})
    this.handleErrorMessages();
    return (
      <div className={'signin-form'}>
        <form onSubmit={this.onSubmit}>
          <Grid item xs={12} container direction="column" spacing={16}>
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
            <Grid item container className={'buttons'}>
              <Grid item xs={6}>
                <Button variant="contained" color="primary" className={classes.button} type={'submit'}>
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
