import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from '@material-ui/core/Modal';
import { fetchWord } from 'actions/WordsActions';
import paths from 'src/paths';
import history from 'src/history';
import WordModalContainer from './wordModalContainer';
import './index.scss';

class WordModal extends React.Component {
  state = {
    opened: false,
  }

  componentDidUpdate() {
    const { opened } = this.state;
    if (this.isWordPath() && !opened) {
      const {
        match: { params: { id: dictionaryId, wordId: id} },
        actions: { fetchWord }
      } = this.props;
      this.setState({ opened: true }, () => {
        fetchWord(dictionaryId, id);
      });
    }
  }

  isWordPath = () => {
    const { match: { path } } = this.props;
    return path === paths.word;
  }

  handleClose = () => {
    const { match: { params: { id: dictionaryId } } } = this.props;
    history.push(paths.dictioanryPath(dictionaryId));
    this.setState({ opened: false });
  }

  render() {
    const { opened } = this.state;
    return (
      <Modal
        aria-labelledby="word-modal-title"
        aria-describedby="word-modal-description"
        className="word-modal"
        open={opened}
        onClose={this.handleClose}
      >
        <WordModalContainer />
      </Modal>
    );
  }
}

WordModal.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
      wordId: PropTypes.string.isRequired,
    }),
    path: PropTypes.string.isRequired
  }),
  actions: PropTypes.shape({
    fetchWord: PropTypes.func.isRequired,
  }),
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchWord }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(WordModal);
