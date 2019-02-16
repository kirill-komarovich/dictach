import React from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import * as namespacesActions from 'actions/NamespacesActions';

class NamespacesList extends React.Component {
  componentDidMount() {
    this.props.actions.fetchAllNamespaces();
  }

  render() {
    const namespaces = this.props.namespaces.all;
    return (
      <List dense>
        {
          namespaces.map((namespace) => (
              <ListItem>
                <ListItemIcon>
                  {/* <FolderIcon /> */}
                </ListItemIcon>
                <ListItemText
                  primary="Single-line item"
                />
              </ListItem>
          ))
        }
      </List>
    )
  }
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(namespacesActions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    namespaces: state.namespaces,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NamespacesList);
