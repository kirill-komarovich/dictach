import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HeaderMenu from '../../components/headerMenu'
import urls from '../../urls';
import './index.scss';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.logo = this.logo.bind(this);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={'header'}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            {this.logo(classes)}
            {this.props.session.authenticated && (<HeaderMenu />)
          }
          </Toolbar>
        </AppBar>
      </div>
    );
  };

  logo(classes) {
    return (
      <Typography variant="h6" color="inherit" className={classes.grow}>
        <Link to={urls.root} className={'logo-link'}>
          Dictach
        </Link>
      </Typography>
    )
  };
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    session: state.session
  };
};

export default connect(mapStateToProps)(withStyles(styles)(Header));
