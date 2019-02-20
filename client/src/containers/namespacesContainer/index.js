import React from 'react';
import Grid from '@material-ui/core/Grid';
import NamespacesList from 'components/namespacesList';
import './index.scss';

const namespacesListXs = 2;
const chosenNamespaceXs = 10;

function NamespacesContainer() {
  return (
    <Grid container className="namespaces-container">
      <Grid item xs={namespacesListXs}>
        <NamespacesList/>
      </Grid>
      <Grid item xs={chosenNamespaceXs} style={{backgroundColor: 'red'}}>
        ChosenNamespace
      </Grid>
    </Grid>
  );
};

export default NamespacesContainer;
