import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import * as sessionActions from 'actions/SessionActions';
import { injectIntl, intlShape } from 'react-intl';
import { capitalize } from 'utils/str';

class HeaderMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    }
  }

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  handleSignOut =  () => {
    this.props.actions.signOutUser();
  }

  render() {
    const { anchorEl } = this.state;
    const { intl } = this.props;
    const open = Boolean(anchorEl);
    const signOutLabel = capitalize(intl.formatMessage({id: 'session.sign_out'}));
    return (
      <div>
        <IconButton
          aria-owns={open ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id={'menu-appbar'}
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
          <MenuItem onClick={this.handleSignOut}>{signOutLabel}</MenuItem>
        </Menu>
      </div>
    )
  };
};

HeaderMenu.propTypes = {
  intl: intlShape.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
};


export default connect(state => state, mapDispatchToProps)(injectIntl(HeaderMenu));
