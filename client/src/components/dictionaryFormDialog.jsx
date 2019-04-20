import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import { injectIntl, intlShape } from 'react-intl';
import { createDictionary } from 'actions/DictionariesActions';

const LANGUAGES = ['en', 'ru'];

class DictionaryFormDialog extends React.Component {
  state = {
    title: '',
    language: 'en',
    submited: false,
  }

  componentDidUpdate() {
    const { submited } = this.state;
    const { onClose, dictionary: { errors } } = this.props;
    if (!submited) {
      return;
    }
    if (errors) {
      this.setState({ submited: false });
    } else {
      onClose(null, true);
    }
  }

  handleSubmit = (event) => {
    const { actions: { createDictionary } } = this.props;
    const { title, language } = this.state;

    event.preventDefault();
    createDictionary({ title, language }).then(() => this.setState({ submited: true }));
  }

  handleChange = ({ target: { name, value } }) => {
    return this.setState({ [name]: value});
  }

  render() {
    const { open, onClose, intl: { formatMessage } } = this.props;
    const { title, language } = this.state;
    return (
      <Dialog
        open={open}
        onClose={onClose}
        scroll="paper"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          { formatMessage({ id: 'dictionaries.form.title' }) }
        </DialogTitle>
        <DialogContent>
          <form onSubmit={this.handleSubmit}>
            <TextField
              name="title"
              label={formatMessage({ id: 'dictionaries.form.fields.title' })}
              value={title}
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              select
              name="language"
              label={formatMessage({ id: 'dictionaries.form.fields.language' })}
              value={language}
              onChange={this.handleChange}
              helperText={formatMessage({ id: 'dictionaries.form.fields.language.promt' })}
              margin="normal"
              variant="outlined"
              fullWidth
            >
              {
                LANGUAGES.map(option => (
                  <MenuItem key={option} value={option}>
                    { formatMessage({ id: `dictionaries.languages.${option}`}) }
                  </MenuItem>
                ))
              }
            </TextField>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            { formatMessage({ id: 'buttons.cancel' }) }
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            { formatMessage({ id: 'dictionaries.form.submit' }) }
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

DictionaryFormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  dictionary: PropTypes.shape({
    errors: PropTypes.oneOf({ types: [PropTypes.arrayOf(PropTypes.string), null] }).isRequired,
  }),
  actions: PropTypes.shape({
    createDictionary: PropTypes.func.isRequired,
    freeDictionaryErrors: PropTypes.func.isRequired,
  }).isRequired,
};

function mapStateToProps({ dictionary: { errors } }) {
  return {
    dictionary: { errors },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ createDictionary }, dispatch)
  };
}

const DictionaryFormDialogWithIntl = injectIntl(DictionaryFormDialog);
export default connect(mapStateToProps, mapDispatchToProps)(DictionaryFormDialogWithIntl);
