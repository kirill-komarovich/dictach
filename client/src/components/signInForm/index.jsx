import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { injectIntl, intlShape } from 'react-intl';
import { capitalize } from 'src/utils/str';
import { signInUser } from 'actions/SessionActions';
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

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        email: '',
        password: ''
      }
    };
  }

  onChange = ({ target: { name, value } }) => {
    const credentials = { ...this.state.credentials };
    credentials[name] = value;
    return this.setState({ credentials });
  }

  onSubmit = (event) => {
    const { actions: { signInUser } } = this.props;
    const { credentials } = this.state;
    event.preventDefault();
    signInUser(credentials);
  }

  locales = {
    emailLabel: capitalize(this.props.intl.formatMessage({id: 'user.attributes.email'})),
    passwordLabel: capitalize(this.props.intl.formatMessage({id: 'user.attributes.password'})),
    signInLabel: this.props.intl.formatMessage({id: 'session.sign_in'})
  }

  render() {
    const { classes, session: { errors } } = this.props;
    const { emailLabel, passwordLabel, signInLabel } = this.locales;
    return (
      <div className="signin-form">
        <form onSubmit={this.onSubmit}>
          <Grid item xs={formXs} container direction="column">
            <FormControl fullWidth>
              <TextField
                error={errors}
                label={emailLabel}
                className={classes.textField}
                type="email"
                name="email"
                autoComplete="email"
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={this.onChange}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                error={errors}
                label={passwordLabel}
                className={classes.textField}
                type="password"
                autoComplete="current-password"
                margin="normal"
                name="password"
                variant="outlined"
                fullWidth
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
  intl: intlShape.isRequired,
  session: PropTypes.shape({
    errors: PropTypes.bool.isRequired,
  }),
  actions: PropTypes.shape({
    signInUser: PropTypes.func.isRequired,
  }),
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ signInUser }, dispatch)
  };
}

function mapStateToProps({ session }) {
  return {
    session,
  };
}

const SignInFormWithIntl = injectIntl(SignInForm);
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignInFormWithIntl));
