import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LabelIcon from '@material-ui/icons/Label';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Input from '@material-ui/core/Input';
import { deleteTag, updateTag, fetchAllTags } from 'actions/TagsActions';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import TooltipedIcon from 'components/tooltipedIcon';
import DeleteTagDialog from './deleteTagDialog';
import './index.scss';

class EditInput extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tag: props.tag,
      showDeleteModal: false,
      changed: false,
      editable: false,
    };

    this.inputRef = React.createRef();
    this.inputGroupRef = React.createRef();
  }

  deleteTag = () => {
    const { actions: { deleteTag } } = this.props;
    const { tag } = this.state;
    deleteTag(tag.id).then(this.toggleDeleteModal);
  }

  onTitleChange = ({ target: { value } }) => {
    const tag = { ...this.state.tag };
    tag.title = value;
    this.setState({
      tag,
      changed: true,
    });
  }

  focusInput = () => {
    this.inputRef.current.focus();
    this.toggleEditable();
  }

  toggleEditable = () => {
    this.setState(({ editable }) => ({ editable: !editable }));
  }

  toggleDeleteModal = () => {
    this.setState(({ showDeleteModal }) => ({ showDeleteModal: !showDeleteModal }));
  }

  blurInputGroupFocus = () => {
    this.inputGroupRef.current.blur();
    this.toggleEditable();
  }

  updateTag = () => {
    const { actions: { updateTag, fetchAllTags } } = this.props;
    const { tag, changed } = this.state;
    if (changed) {
      updateTag(tag).then(fetchAllTags);
    }
    this.blurInputGroupFocus();
  }

  render() {
    const { tag, editable, showDeleteModal } = this.state;
    return (
      <ListItem
        role="menuitem"
        className="tags-modal__list-item"
      >
        <ListItemIcon>
          <div className="list-icon">
            <LabelIcon className="icon"/>
            <TooltipedIcon
              icon={DeleteIcon}
              messageId="tooltip.tag.delete"
              onClick={this.toggleDeleteModal}
              className="icon action-icon"
            />
          </div>
        </ListItemIcon>
        <div
          tabIndex="-1"
          className={`${editable ? 'editable ' : ''}tags-modal__input-group`}
          ref={this.inputGroupRef}
        >
          <Input
            className="tags-modal__input"
            value={tag.title}
            onChange={this.onTitleChange}
            inputRef={this.inputRef}
            onBlur={this.toggleEditable}
            onFocus={this.toggleEditable}
          />
          <ListItemIcon className="edit-icon">
            <div>
              <TooltipedIcon
                icon={EditIcon}
                messageId="tooltip.tag.edit"
                className="icon action-icon"
                onClick={this.focusInput}
              />
              <TooltipedIcon
                icon={DoneIcon}
                messageId="tooltip.tag.edit"
                onClick={this.updateTag}
                className="icon action-icon"
                tabindex="1"
              />
            </div>
          </ListItemIcon>
        </div>
        <DeleteTagDialog
          open={showDeleteModal}
          onClose={this.toggleDeleteModal}
          onConfirm={this.deleteTag}
        />
      </ListItem>
    );
  }
}

EditInput.propTypes = {
  tag: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  tags: PropTypes.shape({
    errors: PropTypes.oneOf({ types: [PropTypes.array, null] }).isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    deleteTag: PropTypes.func.isRequired,
    updateTag: PropTypes.func.isRequired,
    fetchAllTags: PropTypes.func.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    tags: {
      errors: state.tags.errors,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ deleteTag, updateTag, fetchAllTags }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditInput);
