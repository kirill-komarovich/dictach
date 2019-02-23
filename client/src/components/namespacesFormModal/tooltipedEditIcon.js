import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';

function TooltipedEditIcon({ onClick, intl: { formatMessage } }) {
  return (
    <Tooltip title={formatMessage({ id: 'tooltip.namespace.edit' })}>
      <EditIcon onClick={onClick} className="action-icon" />
    </Tooltip>
  )
};

TooltipedEditIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(TooltipedEditIcon);
