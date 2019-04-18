import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './index.scss';

function WordsList({ words }) {
  return (
    <List className="words-list">
      {
        words.map(({ id, title }) => (
          <ListItem key={id} button>
            <ListItemText primary={title} />
          </ListItem>
        ))
      }
    </List>
  );
}

WordsList.propTypes = {
  words: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    dictionary_id: PropTypes.number.isRequired,
  })),
};

export default WordsList;
