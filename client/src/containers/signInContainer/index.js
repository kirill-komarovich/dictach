import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter} from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import SignInForm from '../../components/signInForm';
import './index.scss';

function SignInContainer(props) {
  return (
      <Paper className={'paper'} elevation={1}>
        <Grid item xs={12} sm container>
          <SignInForm/>
        </Grid>
      </Paper>
  );
}

SignInContainer.propTypes = {
};

export default SignInContainer;
