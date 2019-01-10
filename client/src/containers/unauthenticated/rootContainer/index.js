import React from 'react';
import { withRouter} from 'react-router-dom'
import { SnackbarProvider } from 'notistack';
import SignInForm from '../../../components/signInForm';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import SignInContainer from '../../signInContainer';
import './index.scss';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    minWidth: 350,
  },
});


function RootContainer (props) {
  console.log(props);
  const { classes } = props;
  return (
    <SnackbarProvider maxSnack={3}>
      <div className={'root-container'}>
        <Grid container >
          <Grid item xs={12} >
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={40}
            >
              <Grid item xs={3}>
                Placeholder
              </Grid>
              <Grid item>
                <SignInContainer />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </SnackbarProvider>
  )
}

export default withRouter(withStyles(styles)(RootContainer));
