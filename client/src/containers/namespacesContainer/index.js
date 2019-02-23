import React from 'react';
import Grid from '@material-ui/core/Grid';
import NamespacesList from 'components/namespacesList';
import NamespacesFormModal from 'components/namespacesFormModal';
import './index.scss';

const namespacesListXs = 3;
const chosenNamespaceXs = 9;

class NamespacesContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      editFormOpened: false,
    }
  }

  toggleForm = () => {
    this.setState({
      editFormOpened: !this.state.editFormOpened ,
    })
  }

  render() {
    return (
      <Grid container className="namespaces-container">
        <Grid item xs={namespacesListXs}>
          <NamespacesList toggleForm={this.toggleForm} />
        </Grid>
        <Grid item xs={chosenNamespaceXs} style={{backgroundColor: 'red'}}>
          ChosenNamespace
        </Grid>
        {
          this.state.editFormOpened && <NamespacesFormModal open onClose={this.toggleForm} />
        }
      </Grid>
    );
  }
};

export default NamespacesContainer;
