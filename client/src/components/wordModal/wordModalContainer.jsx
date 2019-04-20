import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchWord } from 'actions/WordsActions';
import './index.scss';

const LOADER_SIZE = 80;

class WordModalContainer extends React.Component {
  render() {
    const { word: { title, loading } } = this.props;
    return (
      <Paper className="word-modal__body">
        {
          loading ? (
            <CircularProgress className="word-modal__loader" size={LOADER_SIZE} />
          ) : (
            <div>
              { title }
            </div>
          )
        }
      </Paper>
    );
  }
}

WordModalContainer.propTypes = {
  word: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    loading: false,
  }),
  actions: PropTypes.shape({
    fetchWord: PropTypes.func.isRequired,
  }),
};

function mapStateToProps({ word }) {
  return {
    word,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchWord }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WordModalContainer);
