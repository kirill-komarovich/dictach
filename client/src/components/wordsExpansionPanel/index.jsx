import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import WordsList from 'components/wordsList';
import { fetchAllWordsByLetter } from 'src/actions/WordsActions';
import paths from 'src/paths';
import history from 'src/history';
import './index.scss';

const LOADER_SIZE = 50;

class WordsExpansionPanel extends React.Component {
  state = {
    expanded: false,
    loaded: false,
    loading: false,
  }

  componentDidMount() {
    const { letter, match: { params: { letter: routeLetter} } } = this.props;
    if (letter === routeLetter) {
      this.setState({ expanded: true });
    }
  }

  componentDidUpdate() {
    const { expanded, loaded, loading } = this.state;
    const {
      letter,
      actions: { fetchAllWordsByLetter },
      match: { params: { id: dictionaryId } },
    } = this.props;
    if (expanded && !loaded && !loading) {
      this.setState({ loading: true }, () => {
        fetchAllWordsByLetter(dictionaryId, letter).then(() => {
          this.setState({ loaded: true, loading: false });
        });
      });
    }
  }

  toggleExpanded = (_event, expanded) => {
    this.setState({ expanded });
  }

  handleWordClick = (wordId) => {
    const { letter, match: { params: { id: dictionaryId } } } = this.props;
    history.push(paths.wordPath(dictionaryId, letter, wordId));
  }

  render() {
    const { letter, words } = this.props;
    const { expanded, loaded, loading } = this.state;
    return (
      <ExpansionPanel
        expanded={expanded}
        onChange={this.toggleExpanded}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{letter.toUpperCase()}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {
            expanded && !loaded || loading ? (
              <CircularProgress className="words-loader" size={LOADER_SIZE} />
            ) : (
              <WordsList words={words} onClick={this.handleWordClick} />
            )
          }
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

WordsExpansionPanel.propTypes = {
  letter: PropTypes.string.isRequired,
  actions: PropTypes.shape({
    fetchAllWordsByLetter: PropTypes.func.isRequired,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
      letter: PropTypes.string,
    }),
  }),
  words: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    dictionary_id: PropTypes.number.isRequired,
  })),
};

function mapStateToProps({ words }, { letter }) {
  return {
    words: words[letter] || [],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchAllWordsByLetter }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WordsExpansionPanel);
