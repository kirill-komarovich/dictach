import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { injectIntl, intlShape } from 'react-intl';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import * as namespacesActions from 'actions/NamespacesActions';
import './index.scss';

class NamespacesList extends React.Component {
  componentDidMount() {
    this.props.actions.fetchAllNamespaces();
  }

  render() {
    const {
      namespaces: { all: namespaces },
      toggleForm,
      intl: { formatMessage },
    } = this.props;
    return (
      <List className="namespaces-list">
        <span className="list-title">
          {formatMessage({id: 'namespaces.list.title'})}
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
        <ListItem role="menuitem" className="namespaces-list__item" onClick={toggleForm}>
          <ListItemIcon>
            <EditOutlinedIcon className="list-icon"/>
          </ListItemIcon>
          <span className="list-text">
            {formatMessage({id: 'namespaces.list.edit'})}
          </span>
        </ListItem>
      </List>
    )
  }
};


NamespacesList.propTypes = {
  toggleForm: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
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

const NamespacesListWithIntl = injectIntl(NamespacesList);
export default connect(mapStateToProps, mapDispatchToProps)(NamespacesListWithIntl);
