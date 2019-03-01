import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { injectIntl, intlShape } from 'react-intl';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Input from '@material-ui/core/Input';
import * as namespacesActions from 'actions/NamespacesActions';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import TooltipedIcon from 'components/tooltipedIcon';
import './index.scss';

class AddInput extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      namespace: {
        title: '',
      },
      changed: false,
    }

    this.inputRef = React.createRef();
    this.inputGroupRef = React.createRef();
  }

  onTitleChange = ({ target: { value } }) => {
    const namespace = { ...this.state.namespace };
    namespace.title = value;
    this.setState({
      namespace,
      changed: true,
    });
  }

  focusInput = () => {
    this.inputRef.current.focus();
  }

  blurInputGroupFocus = () => {
    this.inputGroupRef.current.blur();
  }

  createNamespace = () => {
    const { actions: { createNamespace} } = this.props;
    const { namespace, changed } = this.state;
    if (changed) {
      createNamespace(namespace).then(this.afterCreateCallback);
    }
    this.blurInputGroupFocus();
  }

  afterCreateCallback = () => {
    const { actions: { fetchAllNamespaces } } = this.props;
    const namespace = { ...this.state.namespace };
    namespace.title = '';
    this.setState({
      namespace,
      changed: false,
    });
    fetchAllNamespaces();
  }

  render() {
    const { namespace } = this.state;
    const { intl: { formatMessage }, namespaces: { errors }} = this.props;
    return (
      <ListItem
        role="menuitem"
        onMouseEnter={this.toggleMouseOver}
        onMouseLeave={this.toggleMouseOver}
        className="namespaces-modal__list-item"
      >
        <ListItemIcon>
          <div className="list-icon">
            <TooltipedIcon
              icon={AddIcon}
              messageId="tooltip.namespace.create"
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
          className="namespaces-modal__input-group"
          ref={this.inputGroupRef}
          onClick={this.focusInput}
        >
          <Input
            error={errors !== null}
            className="namespaces-modal__input"
            value={namespace.title}
            onChange={this.onTitleChange}
            inputRef={this.inputRef}
            autoFocus
            placeholder={formatMessage({ id: 'tooltip.namespace.create' })}
          />
          <ListItemIcon className="done-icon">
            <TooltipedIcon
              icon={DoneIcon}
              messageId="tooltip.namespace.create"
              onClick={this.createNamespace}
              className="icon action-icon"
            />
          </ListItemIcon>
        </div>
      </ListItem>
    )
  }
};

AddInput.propTypes = {
  intl: intlShape.isRequired,
};

function mapStateToProps(state) {
  return {
    namespaces: {
      errors: state.namespaces.errors,
    },
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(namespacesActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AddInput));
