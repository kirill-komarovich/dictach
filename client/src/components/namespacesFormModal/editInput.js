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
      showDeleteModal: false,
    }

    this.inputRef = React.createRef();
    this.inputGroupRef = React.createRef();
  }

  deleteNamespace = () => {
    const { actions: { deleteNamespace } } = this.props;
    const { namespace } = this.state;
    deleteNamespace(namespace.id)
  }

  onTitleChange = ( { target: { value } }) => {
    const namespace = { ...this.state.namespace };
    namespace.title = value;
    this.setState({ namespace })
  }

  focusInput = () => {
    this.inputRef.current.focus();
  }

  blurInputGroupFocus = () => {
    this.inputGroupRef.current.blur()
  }

  updateNamespace = () => {
    const { actions: { updateNamespace, fetchAllNamespaces } } = this.props;
    const { namespace } = this.state;
    updateNamespace(namespace).then(fetchAllNamespaces);
    this.blurInputGroupFocus();
  }

  render() {
    const { namespace } = this.state;
    return (
      <ListItem
        role="menuitem"
        onMouseEnter={this.toggleMouseOver}
        onMouseLeave={this.toggleMouseOver}
        className="namespaces-modal__list-item"
      >
        <ListItemIcon>
          <div className="list-icon">
            <LabelIcon className="icon"/>
            <TooltipedIcon
              icon={DeleteIcon}
              messageId="tooltip.namespace.delete"
              onClick={this.deleteNamespace}
              className="icon action-icon"
            />
          </div>
        </ListItemIcon>
        <div
          tabIndex="0"
          className="namespaces-modal__input-group"
          ref={this.inputGroupRef}
          onClick={this.focusInput}
        >
          <Input
            className="namespaces-modal__input"
            value={namespace.title}
            onChange={this.onTitleChange}
            inputRef={this.inputRef}
          />
          <ListItemIcon className="edit-icon">
            <div>
              <TooltipedIcon
                icon={EditIcon}
                messageId="tooltip.namespace.edit"

                className="icon action-icon"
              />
              <TooltipedIcon
                icon={DoneIcon}
                messageId="tooltip.namespace.edit"
                onClick={this.updateNamespace}
                className="icon action-icon"
              />
            </div>
          </ListItemIcon>
        </div>
      </ListItem>
    )
  }
};

EditInput.propTypes = {
  namespace: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(namespacesActions, dispatch)
  };
}

export default connect(state => state, mapDispatchToProps)(EditInput);
