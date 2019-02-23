import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

function TooltipedDeleteIcon({ onClick, intl: { formatMessage } }) {
  return (
    <Tooltip title={formatMessage({ id: 'tooltip.namespace.delete' })}>
      <DeleteIcon onClick={onClick} className="action-icon" />
    </Tooltip>
  )
};

TooltipedDeleteIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(TooltipedDeleteIcon);
