import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';

function TagChips({ tags, className }) {
  return (
    <div className={className} >
      {
        tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            color="default"
          />
        ))
      }
    </div>
  );
}

TagChips.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
};

TagChips.defaultProps = {
  className: '',
};

export default TagChips;
