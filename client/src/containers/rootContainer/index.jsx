import React from 'react';
import { withRouter} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import SignInContainer from 'containers/signInContainer';
import Hidden from '@material-ui/core/Hidden';
import './index.scss';

const aboutContainerXs = 4;
const rootContainerXs = 12;

function RootContainer () {
  return (
    <Grid container className="root-container" >
      <Grid item xs={rootContainerXs} >
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Hidden smDown>
            <Grid item xs={aboutContainerXs} >
              Placeholder
            </Grid>
          </Hidden>
          <Grid item >
            <SignInContainer />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withRouter(RootContainer);
