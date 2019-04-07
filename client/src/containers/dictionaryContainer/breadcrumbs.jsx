import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import MaterialBreadcrumbs from '@material-ui/lab/Breadcrumbs';
import Link from '@material-ui/core/Link';
import paths from 'src/paths';

function Breadcrumbs({ title }) {
  return (
    <MaterialBreadcrumbs aria-label="Breadcrumb">
      <FormattedMessage id="dictionaries">
        {
          (formatMessage) => (
            <Link color="inherit" to={paths.dictionaries} component={RouterLink}>
              { formatMessage }
            </Link>
          )
        }
      </FormattedMessage>
      <Typography color="textPrimary">
        { title }
      </Typography>
    </MaterialBreadcrumbs>
  );
}

Breadcrumbs.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Breadcrumbs;
