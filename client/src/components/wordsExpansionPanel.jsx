import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class WordsExpansionPanel extends React.Component {
  state = {
    expanded: false,
  }

  toggleExpanded = () => {
    this.setState(({ expanded }) => ({ expanded: !expanded }));
  }

  render() {
    const { letter } = this.props;
    const { expanded } = this.state;
    return (
      <ExpansionPanel expanded={expanded} onClick={this.toggleExpanded}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{letter.toUpperCase()}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Word list
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

WordsExpansionPanel.propTypes = {
  letter: PropTypes.string.isRequired,
};

export default WordsExpansionPanel;
