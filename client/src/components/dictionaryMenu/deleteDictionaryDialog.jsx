import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import { injectIntl, intlShape } from 'react-intl';

function DeleteDictionaryDialog({ open, onConfirm, onClose, intl: { formatMessage }}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="confirm-delete-dialog"
    >
      <div className="confirm-delete-dialog__content">
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            { formatMessage({ id: 'dictionaries.confirm_delete' }) }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className="btn-cancel" onClick={onClose}>
            { formatMessage({ id: 'buttons.cancel' }) }
          </Button>
          <Button color="primary" onClick={onConfirm}>
            { formatMessage({ id: 'buttons.delete' }) }
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}

DeleteDictionaryDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(DeleteDictionaryDialog);
