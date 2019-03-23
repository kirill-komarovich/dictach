import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import Tooltip from '@material-ui/core/Tooltip';

function TooltipedIcon({ icon: Icon, onClick, className, messageId, intl: { formatMessage } }) {
  return (
    <Tooltip title={formatMessage({ id: messageId })}>
      <Icon onClick={onClick} className={className} />
    </Tooltip>
  );
}

TooltipedIcon.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  icon: PropTypes.func.isRequired,
  messageId: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
};

TooltipedIcon.defaultProps = {
  onClick: undefined,
  className: '',
};

export default injectIntl(TooltipedIcon);
