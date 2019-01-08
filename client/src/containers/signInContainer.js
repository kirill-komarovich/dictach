import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter} from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import SignInForm from '../components/signInForm'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  signInContainer: {
    padding: theme.spacing.unit * 2,
    margin: 'auto',
    maxWidth: 500,
  },
});


function SignInContainer(props) {
  const { classes } = props;
  return (
    <Grid item alignItems={'center'}>
      <Paper className={classes.signInContainer} elevation={1}>
        <Grid item xs={12} sm container>
          <SignInForm/>
        </Grid>
      </Paper>
    </Grid>
  );
}

SignInContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(SignInContainer));
