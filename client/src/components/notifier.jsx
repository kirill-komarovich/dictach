import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { removeSnackbar } from 'src/actions/NotificationsActions';

class Notifier extends React.Component {
  displayed = [];

  storeDisplayed = (id) => {
    this.displayed = [...this.displayed, id];
  };

  shouldComponentUpdate({ notifications: newSnacks = [] }) {
    const { notifications: currentSnacks } = this.props;
    let notExists = false;
    for (let i = 0; i < newSnacks.length; i += 1) {
      if (notExists) continue;
      notExists = notExists || !currentSnacks.filter(({ key }) => newSnacks[i].key === key).length;
    }
    return notExists;
  }

  componentDidUpdate() {
    const { notifications = [], actions: { removeSnackbar }, enqueueSnackbar } = this.props;

    notifications.forEach(({ key, message, options }) => {
      // Do nothing if snackbar is already displayed
      if (this.displayed.includes(key)) return;
      // Display snackbar using notistack
      enqueueSnackbar(message, options);
      // Keep track of snackbars that we've displayed
      this.storeDisplayed(key);
      // Dispatch action to remove snackbar from redux store
      removeSnackbar(key);
    });
  }

  render() {
    return null;
  }
}

Notifier.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    options: PropTypes.shape({
      anchorOrigin: PropTypes.shape({
        vertical: PropTypes.string,
        horizontal: PropTypes.string,
      }),
      variant: PropTypes.string,
      autoHideDuration: PropTypes.number,
    }).isRequired,
  })),
  actions: PropTypes.shape({
    removeSnackbar: PropTypes.func.isRequired,
  }),
  enqueueSnackbar: PropTypes.func.isRequired,
};


function mapStateToProps({ notifications }) {
  return {
    notifications,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ removeSnackbar }, dispatch),
  };
}

export default connect( mapStateToProps, mapDispatchToProps)(withSnackbar(Notifier));
