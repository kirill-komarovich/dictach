import React from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import NamespacesList from 'components/namespacesList';
import NamespacesFormModal from 'components/namespacesFormModal';
import './index.scss';

class NamespacesContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      editFormOpened: false,
      headerHeight: 0,
    }
  }

  componentDidMount() {
    const headerHeight = document.getElementsByClassName('header')[0].clientHeight;
    this.setState({ headerHeight });
  }


  toggleForm = () => {
    this.setState({
      editFormOpened: !this.state.editFormOpened ,
    })
  }

  render() {
    const { headerHeight, editFormOpened } = this.state;
    return (
      <Grid container className="namespaces-container" style={{ marginTop: `${headerHeight}px` }}>
        <Hidden xsDown>
          <div className="namespaces-container__list">
            <NamespacesList
              toggleForm={this.toggleForm}
              headerHeight={headerHeight}
            />
          </div>
        </Hidden>
        <div className="namespaces-container__chosen">
          ChosenNamespace
        </div>
        {
          editFormOpened && <NamespacesFormModal open onClose={this.toggleForm} />
        }
      </Grid>
    );
  }
};

export default NamespacesContainer;
