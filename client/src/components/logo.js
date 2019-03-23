import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import paths from 'paths';

function Logo(props) {
  return (
    <Typography variant="h6" color="inherit" className={props.className} >
      <Link to={paths.root} className="logo-link">
        Dictach
      </Link>
    </Typography>
  );
}

Logo.propTypes = {
  className: PropTypes.string,
};

Logo.defaultProps = {
  className: '',
};

export default Logo;
