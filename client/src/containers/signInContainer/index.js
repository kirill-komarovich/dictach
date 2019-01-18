import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SignInForm from 'components/signInForm';
import './index.scss';

function SignInContainer() {
  return (
      <Paper className={'paper'} elevation={1}>
        <Grid item xs={12} sm container>
          <SignInForm/>
        </Grid>
      </Paper>
  );
};

export default SignInContainer;
