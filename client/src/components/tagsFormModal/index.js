import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { injectIntl, intlShape } from 'react-intl';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withSnackbar } from 'notistack';
import { freeTagErrors } from 'actions/TagsActions';
import EditInput from './editInput';
import AddInput from './addInput';
import './index.scss';

const SNACKBAR_HIDE_DURATION = 3000;

class TagsFormModal extends React.Component  {
  handleErrorMessages = () => {
    const { tags: { errors }, actions: { freeTagErrors }, enqueueSnackbar } = this.props;
    if (!errors) return undefined;
    errors.forEach((error) => {
      enqueueSnackbar(error, {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        variant: 'error',
        autoHideDuration: SNACKBAR_HIDE_DURATION,
      });
    });
    freeTagErrors();
  }

  render() {
    const {
      open,
      onClose,
      intl: { formatMessage },
      tags: { all: tags },
    } = this.props;
    this.handleErrorMessages();
    return (
      <Modal
        open={open}
        onClose={onClose}
      >
        <Paper className="tags-modal">
          <div className="tags-modal__content">
            <Typography variant="subtitle1" className="tags-modal__title">
              {formatMessage({ id: 'tags.list.edit' })}
            </Typography>
            <List>
              <AddInput/>
              {
                tags.map((tag) => (
                  <EditInput
                    key={tag.id}
                    tag={tag}
                  />
                ))
              }
            </List>
          </div>
          <CardActions>
            <Grid container direction="row" justify="flex-end">
              <Button onClick={onClose} className="tags-modal__button-done">
                {formatMessage({ id: 'buttons.done' })}
              </Button>
            </Grid>
          </CardActions>
        </Paper>
      </Modal>
    );
  }
}

TagsFormModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  tags: PropTypes.shape({
    all: PropTypes.array.isRequired,
    errors: PropTypes.oneOf({ types: [PropTypes.array, null] }).isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    freeTagErrors: PropTypes.func.isRequired,
  }).isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ freeTagErrors }, dispatch)
  };
}

function mapStateToProps({ tags: { all, errors } }) {
  return {
    tags: { all, errors },
  };
}

const TagsFormModalWithIntl = injectIntl(TagsFormModal);
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(TagsFormModalWithIntl));
