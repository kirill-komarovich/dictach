import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EditInput from './editInput';
import AddInput from './addInput';
import './index.scss';

function TagsFormModal({ open, onClose, intl: { formatMessage }, tags: { all: tags } }) {
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

TagsFormModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  tags: PropTypes.shape({
    all: PropTypes.array.isRequired,
  }).isRequired,
};

function mapStateToProps({ tags: { all } }) {
  return {
    tags: { all },
  };
}

const TagsFormModalWithIntl = injectIntl(TagsFormModal);
export default connect(mapStateToProps, null)(TagsFormModalWithIntl);
