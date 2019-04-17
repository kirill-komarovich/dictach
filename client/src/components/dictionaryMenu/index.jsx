import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import { injectIntl, intlShape } from 'react-intl';
import { deleteDictionary } from 'actions/DictionariesActions';
import history from 'src/history';
import paths from 'src/paths';
import DeleteDictionaryDialog from './deleteDictionaryDialog';

class DictionaryMenu extends React.Component {
  state = {
    anchorEl: null,
    openDeleteModal: false,
  };

  handleMenu = ({ currentTarget }) => {
    this.setState({ anchorEl: currentTarget });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  openDeleteModal = () => {
    this.setState({
      openDeleteModal: true,
      anchorEl: null,
    });
  }

  closeDeleteModal = () => {
    this.setState({
      openDeleteModal: false,
    });
  }

  deleteDictionary = () => {
    const { actions: { deleteDictionary }, dictionary: { id } } = this.props;
    deleteDictionary(id).then(() => {
      history.push(paths.dictionaries);
    });
  }

  render() {
    const { anchorEl, openDeleteModal } = this.state;
    const { intl: { formatMessage } } = this.props;
    const open = Boolean(anchorEl);
    return (
      <React.Fragment>
        <IconButton
          aria-label="Settings"
          aria-owns={open ? 'menu-dictionary' : undefined}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
        <Menu
          id="menu-dictionary"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.openDeleteModal}>
            { formatMessage({ id: 'buttons.delete' }) }
          </MenuItem>
        </Menu>
        {
          openDeleteModal && (
            <DeleteDictionaryDialog
              open={openDeleteModal}
              onConfirm={this.deleteDictionary}
              onClose={this.closeDeleteModal}
            />
          )
        }
      </React.Fragment>
    );
  }
}

DictionaryMenu.propTypes = {
  intl: intlShape.isRequired,
  dictionary: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
  actions: PropTypes.shape({
    deleteDictionary: PropTypes.func.isRequired,
  }),
};

function mapStateToProps({ dictionary: { id } }) {
  return {
    dictionary: { id },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ deleteDictionary }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(DictionaryMenu));
