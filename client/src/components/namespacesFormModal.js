import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';

function NamespacesFormModal({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
    >

    </Modal>
  )
};

NamespacesFormModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}
