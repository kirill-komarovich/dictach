import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IntlProvider } from 'react-intl';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import Typography from '@material-ui/core/Typography';
import * as namespacesActions from 'actions/NamespacesActions';
import './index.scss';

class NamespacesList extends React.Component {
  componentDidMount() {
    this.props.actions.fetchAllNamespaces();
  }

  render() {
    const { namespaces: { all: namespaces } } = this.props;
    return (
      <List className="namespaces-list">
        <span className="list-title">
          Namespaces
        </span>
        {
          namespaces.map((namespace) => (
            <ListItem key={namespace.id} role="menuitem" className="namespaces-list__item">
              <ListItemIcon >
                <LabelOutlinedIcon className="list-icon"/>
              </ListItemIcon>
              <span className="list-text">{namespace.title}</span>
            </ListItem>
          ))
        }
        <ListItem role="menuitem" className="namespaces-list__item">
          <ListItemIcon>
            <EditOutlinedIcon className="list-icon"/>
          </ListItemIcon>
          <span className="list-text">Edit namespaces</span>
        </ListItem>
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
