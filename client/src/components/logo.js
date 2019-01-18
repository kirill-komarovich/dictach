import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import urls from '../urls';

function Logo() {
  return (
    <Typography variant="h6" color="inherit" >
      <Link to={urls.root} className={'logo-link'}>
        Dictach
      </Link>
    </Typography>
  )
};

export default Logo;
