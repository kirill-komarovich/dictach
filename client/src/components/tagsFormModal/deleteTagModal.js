import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import { injectIntl, intlShape } from 'react-intl';

function DeleteTagModal({ open, onConfirm, onClose}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
    >

    </Modal>
  )
};

DeleteTagModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(DeleteTagModal);
