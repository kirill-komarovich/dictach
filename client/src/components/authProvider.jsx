import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { checkAuthentication } from 'actions/SessionActions';
import CircularProgress from '@material-ui/core/CircularProgress';

const LOADER_SIZE = 100;

class AuthProvider extends React.Component {
  async componentDidMount() {
    const { actions: { checkAuthentication } } = this.props;
    await checkAuthentication();
  }

  render() {
    const { loading, children } = this.props;
    if (loading) {
      return (
        <CircularProgress className="screen-loader" size={LOADER_SIZE} />
      );
    } else {
      return children;
    }
  }
}

AuthProvider.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  actions: PropTypes.shape({
    checkAuthentication: PropTypes.func.isRequired,
  }),
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ checkAuthentication }, dispatch)
  };
}

function mapStateToProps({ session: { loading } }) {
  return {
    loading,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthProvider);
