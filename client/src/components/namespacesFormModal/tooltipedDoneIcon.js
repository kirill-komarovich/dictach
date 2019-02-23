import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import DoneIcon from '@material-ui/icons/Done';
import Tooltip from '@material-ui/core/Tooltip';

function TooltipedDoneIcon({ onClick, intl: { formatMessage } }) {
  return (
    <Tooltip title={formatMessage({ id: 'tooltip.namespace.edit' })}>
      <DoneIcon onClick={onClick} className="action-icon" />
    </Tooltip>
  )
};

TooltipedDoneIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(TooltipedDoneIcon);
