import React from 'react';
import Grid from '@material-ui/core/Grid';
import NamespacesList from 'components/namespacesList';
import './index.scss';

const namespacesListXs = 3;
const chosenNamespaceXs = 9;

function NamespacesContainer() {
  return (
    <Grid container >
      <Grid item xs={namespacesListXs} className="namespaces-list">
        <NamespacesList/>
      </Grid>
      <Grid item xs={chosenNamespaceXs}>

      </Grid>
    </Grid>
  );
};

export default NamespacesContainer;
