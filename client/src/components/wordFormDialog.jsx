import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { injectIntl, intlShape } from 'react-intl';
import { createWord } from 'actions/WordsActions';

class WordFormDialog extends React.Component {
  state = {
    title: '',
    submited: false,
  }

  componentDidUpdate() {
    const { submited, title } = this.state;
    const { onClose, word: { errors } } = this.props;
    if (!submited) return;
    if (errors) {
      this.setState({ submited: false });
    } else {
      onClose(null, true, title[0].toLowerCase());
    }
  }

  handleSubmit = (event) => {
    const { actions: { createWord }, match: { params: { id: dictionaryId } } } = this.props;
    const { title } = this.state;

    event.preventDefault();
    createWord(dictionaryId, { title }).then(() => {
      this.setState({ submited: true });
    });
  }

  handleChange = ({ target: { name, value } }) => {
    return this.setState({ [name]: value});
  }

  render() {
    const { open, onClose, intl: { formatMessage }, word: { errors } } = this.props;
    const { title } = this.state;
    return (
      <Dialog
        open={open}
        onClose={onClose}
        scroll="paper"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          { formatMessage({ id: 'words.form.title' }) }
        </DialogTitle>
        <DialogContent>
          <form onSubmit={this.handleSubmit}>
            <TextField
              error={errors}
              name="title"
              label={formatMessage({ id: 'words.form.fields.title' })}
              value={title}
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            { formatMessage({ id: 'buttons.cancel' }) }
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            { formatMessage({ id: 'words.form.submit' }) }
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

WordFormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  }),
  word: PropTypes.shape({
    errors: PropTypes.bool.isRequired,
  }),
  actions: PropTypes.shape({
    createWord: PropTypes.func.isRequired,
  }).isRequired,
};

function mapStateToProps({ word: { errors } }) {
  return {
    word: { errors },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ createWord }, dispatch)
  };
}

const WordFormDialogWithIntl = injectIntl(WordFormDialog);
const WordFormDialogWithRouter = withRouter(WordFormDialogWithIntl);
export default connect(mapStateToProps, mapDispatchToProps)(WordFormDialogWithRouter);
