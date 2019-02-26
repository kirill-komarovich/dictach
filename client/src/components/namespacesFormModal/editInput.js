import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LabelIcon from '@material-ui/icons/Label';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Input from '@material-ui/core/Input';
import * as namespacesActions from 'actions/NamespacesActions';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import TooltipedIcon from 'components/tooltipedIcon';
import './index.scss';

class EditInput extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      namespace: props.namespace,
      mouseOver: false,
    }

    this.inputRef = React.createRef();
  }

  deleteNamespace = () => {
    const { setEditableNamespace, actions: { deleteNamespace } } = this.props;
    const { namespace } = this.state;
    deleteNamespace(namespace.id).then(() => setEditableNamespace(null));

  }

  toggleMouseOver = () => {
    this.setState({ mouseOver: !this.state.mouseOver })
  }

  onTitleChange = ( { target: { value } }) => {
    const namespace = { ...this.state.namespace };
    namespace.title = value;
    this.setState({ namespace })
  }

  setEditable = () => {
    this.inputRef.current.focus();
    this.props.setEditableNamespace(this.state.namespace.id);
  }

  updateNamespace = () => {
    const { actions: { updateNamespace, fetchAllNamespaces }, setEditableNamespace } = this.props;
    const { namespace } = this.state;
    updateNamespace(namespace).then(() => fetchAllNamespaces()
                              .then(() => setEditableNamespace(null)));
  }

  render() {
    const { namespace, mouseOver } = this.state;
    const { editable, setEditableNamespace } = this.props;
    return (
      <ListItem role="menuitem"
        onMouseEnter={this.toggleMouseOver}
        onMouseLeave={this.toggleMouseOver}
      >
        <ListItemIcon >
          {
            mouseOver || editable ?
              <TooltipedIcon
                icon={DeleteIcon}
                messageId="tooltip.namespace.delete"
                onClick={this.deleteNamespace}
                className="action-icon"
              /> :
              <LabelIcon/>
          }
        </ListItemIcon>
        <Input
          className="namespaces-modal__input"
          value={namespace.title}
          onChange={this.onTitleChange}
          inputRef={this.inputRef}
          onFocus={() => setEditableNamespace(namespace.id)}
        />
        <ListItemIcon className="edit-icon" >
          {
            editable ?
              <TooltipedIcon
                icon={DoneIcon}
                messageId="tooltip.namespace.edit"
                onClick={this.updateNamespace}
                className="action-icon"
              /> :
              <TooltipedIcon
                icon={EditIcon}
                messageId="tooltip.namespace.edit"
                onClick={this.setEditable}
                className="action-icon"
              />
          }
        </ListItemIcon>
      </ListItem>
    )
  }
};

EditInput.propTypes = {
  namespace: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  editable: PropTypes.bool.isRequired,
  setEditableNamespace: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(namespacesActions, dispatch)
  };
}

export default connect(state => state, mapDispatchToProps)(EditInput);
