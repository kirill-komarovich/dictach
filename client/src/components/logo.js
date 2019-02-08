import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import urls from '../urls';

function Logo(props) {
  return (
    <Typography variant="h6" color="inherit" className={props.className} >
      <Link to={urls.root} className="logo-link">
        Dictach
      </Link>
    </Typography>
  )
};

export default Logo;
