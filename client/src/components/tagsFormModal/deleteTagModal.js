import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { injectIntl, intlShape } from 'react-intl';

function DeleteTagModal({ open, onConfirm, onClose, intl: { formatMessage }}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Paper className="confirm-delete-modal">
        <div className="confirm-delete-modal__message">
          <Typography>
            {formatMessage({ id: 'tags.confirm_delete' })}
          </Typography>
        </div>
        <div className="confirm-delete-modal__buttons">
          <Button className="btn-cancel" onClick={onClose}>
            {formatMessage({ id: 'buttons.cancel' })}
          </Button>
          <Button color="primary" onClick={onConfirm}>
            {formatMessage({ id: 'buttons.delete' })}
          </Button>
        </div>
      </Paper>
    </Modal>
  );
}

DeleteTagModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(DeleteTagModal);
