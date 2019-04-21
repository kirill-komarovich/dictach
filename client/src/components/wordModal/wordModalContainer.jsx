import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import InplaceEditing from 'components/inplaceEditing';
import { updateWord, fetchAllWordsByLetter } from 'actions/WordsActions';
import './index.scss';

const LOADER_SIZE = 80;

class WordModalContainer extends React.Component {

  updateWordTitle = (value) => {
    const {
      word: { id },
      dictionaryId,
      actions: { updateWord, fetchAllWordsByLetter }
    } = this.props;
    updateWord(dictionaryId, { id, title: value }).then(() => {
      const { word: { title, errors } } = this.props;
      if (!errors) {
        fetchAllWordsByLetter(dictionaryId, title[0].toLowerCase());
      }
    });
  }

  render() {
    const { word: { title, loading }, onClose } = this.props;
    return loading ? (
      <CircularProgress className="word-modal__loader" size={LOADER_SIZE} />
    ) : (
      <Grid container justify="center" alignItems="center">
        <Grid container item xs justify="center" alignItems="center">
          <Grid item xs={10}>
            <InplaceEditing value={title} variant="h5" onSubmit={this.updateWordTitle} />
          </Grid>
          <Grid item xs>
            <IconButton
              onClick={onClose}
              color="inherit"
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

WordModalContainer.propTypes = {
  word: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    loading: false,
  }),
  dictionaryId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  actions: PropTypes.shape({
    updateWord: PropTypes.func.isRequired,
  }),
};

function mapStateToProps({ word, dictionary: { id: dictionaryId } }) {
  return {
    word,
    dictionaryId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ updateWord, fetchAllWordsByLetter }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WordModalContainer);
