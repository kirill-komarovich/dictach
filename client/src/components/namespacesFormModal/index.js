import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { injectIntl, intlShape } from 'react-intl';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import * as namespacesActions from 'actions/NamespacesActions';
import EditInput from './editInput';
import './index.scss';

function NamespacesFormModal({
    open,
    onClose,
    intl: { formatMessage },
    namespaces: { all: namespaces },
  }) {
  const [ editableNamespaceId, setEditableNamespaceId] = React.useState(-1);

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Paper className="namespaces-modal">
        <Typography variant="subtitle1" className="namespaces-modal__title">
          {formatMessage({ id: 'namespaces.list.edit' })}
        </Typography>
        <List>
          {
            namespaces.map((namespace) => (
              <EditInput
                key={namespace.id}
                namespace={namespace}
                editable={editableNamespaceId === namespace.id}
                setEditableNamespace={setEditableNamespaceId}
              />
            ))
          }
        </List>
        <Grid container direction="row" justify="flex-end">
          <Button onClick={onClose} className="namespaces-modal__button-done">
            {formatMessage({ id: 'buttons.done' })}
          </Button>
        </Grid>
      </Paper>
    </Modal>
  )
};

NamespacesFormModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(namespacesActions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    namespaces: state.namespaces,
  };
};

const NamespacesFormModalWithIntl = injectIntl(NamespacesFormModal);
export default connect(mapStateToProps, mapDispatchToProps)(NamespacesFormModalWithIntl);
