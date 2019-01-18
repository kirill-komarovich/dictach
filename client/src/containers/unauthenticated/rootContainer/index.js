import React from 'react';
import { withRouter} from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import Grid from '@material-ui/core/Grid';
import SignInContainer from 'containers/signInContainer';
import Hidden from '@material-ui/core/Hidden';
import './index.scss';

function RootContainer (props) {
  return (
    <SnackbarProvider maxSnack={3}>
      <Grid container className={'root-container'} >
        <Grid item xs={12} >
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={40}
          >
            <Hidden smDown>
              <Grid item xs={3}>
                Placeholder
              </Grid>
            </Hidden>
            <Grid item >
              <SignInContainer />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </SnackbarProvider>
  )
};

export default withRouter(RootContainer);
