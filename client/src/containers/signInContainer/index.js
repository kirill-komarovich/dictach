import React from 'react';
import Paper from '@material-ui/core/Paper';
import SignInForm from 'components/signInForm';
import './index.scss';

const paperElevation = 1;

function SignInContainer() {
  return (
      <Paper className="paper" elevation={paperElevation}>
        <SignInForm/>
      </Paper>
  );
};

export default SignInContainer;
