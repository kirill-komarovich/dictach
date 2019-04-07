import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { injectIntl, intlShape } from 'react-intl';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Input from '@material-ui/core/Input';
import { createTag, fetchAllTags } from 'actions/TagsActions';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import TooltipedIcon from 'components/tooltipedIcon';
import './index.scss';

class AddInput extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tag: {
        title: '',
      },
      changed: false,
    };

    this.inputRef = React.createRef();
    this.inputGroupRef = React.createRef();
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
  }

  blurInputGroupFocus = () => {
    this.inputGroupRef.current.blur();
  }

  createTag = () => {
    const { actions: { createTag } } = this.props;
    const { tag, changed } = this.state;
    if (changed) {
      createTag(tag).then(this.afterCreateCallback);
    }
    this.blurInputGroupFocus();
  }

  afterCreateCallback = () => {
    const { actions: { fetchAllTags } } = this.props;
    const tag = { ...this.state.tag };
    tag.title = '';
    this.setState({
      tag,
      changed: false,
    });
    fetchAllTags();
  }

  render() {
    const { tag } = this.state;
    const { intl: { formatMessage }, tags: { errors }} = this.props;
    return (
      <ListItem
        role="menuitem"
        className="tags-modal__list-item"
      >
        <ListItemIcon>
          <div className="list-icon">
            <TooltipedIcon
              icon={AddIcon}
              messageId="tooltip.tag.create"
              onClick={this.focusInput}
              className="new-icon action-icon"
            />
            <TooltipedIcon
              icon={CloseIcon}
              messageId="tooltip.cancel"
              onClick={this.blurInputGroupFocus}
              className="new-icon action-icon"
            />
          </div>
        </ListItemIcon>
        <div
          tabIndex="0"
          className="tags-modal__input-group"
          ref={this.inputGroupRef}
        >
          <Input
            error={errors !== null}
            className="tags-modal__input"
            value={tag.title}
            onChange={this.onTitleChange}
            inputRef={this.inputRef}
            autoFocus
            placeholder={formatMessage({ id: 'tooltip.tag.create' })}
          />
          <ListItemIcon className="done-icon">
            <TooltipedIcon
              icon={DoneIcon}
              messageId="tooltip.tag.create"
              onClick={this.createTag}
              className="icon action-icon"
            />
          </ListItemIcon>
        </div>
      </ListItem>
    );
  }
}

AddInput.propTypes = {
  intl: intlShape.isRequired,
  tags: PropTypes.shape({
    errors: PropTypes.oneOf({ types: [PropTypes.array, null] }).isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    createTag: PropTypes.func.isRequired,
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
    actions: bindActionCreators({ createTag, fetchAllTags }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AddInput));
