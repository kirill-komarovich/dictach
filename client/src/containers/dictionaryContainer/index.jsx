import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import { fetchDictionary } from 'actions/DictionariesActions';
import TagChips from 'components/tagChips';
import WordsExpansionPanel from 'components/wordsExpansionPanel';
import Breadcrumbs from './breadcrumbs';
import './index.scss';

const LOADER_SIZE = 60;

class DictionaryContainer extends React.Component {
  state = {
    headerHeight: 0,
    loaded: false,
  }

  componentDidMount() {
    const { actions: { fetchDictionary }, match: { params: { id } } } = this.props;
    const headerHeight = document.getElementsByClassName('header')[0].clientHeight;
    this.setState({ headerHeight });
    fetchDictionary(id).then(() => this.setState({ loaded: true }));
  }

  render() {
    const { dictionary: { title, tags, language, alphabeth } } = this.props;
    const { headerHeight, loaded } = this.state;
    if (!loaded) {
      return (
        <CircularProgress className="screen-loader" size={LOADER_SIZE} />
      );
    } else {
      return (
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ marginTop: `${headerHeight}px`}}
          className="dictionary-container"
        >
          <Grid item sm={8} xs={11}>
            <Breadcrumbs title={title}/>
            <Grid container>
              <Grid item xs>
                <Typography variant="h3" gutterBottom>
                  { title }
                </Typography>
              </Grid>
              <Grid item >
                <IconButton aria-label="Settings">
                  <MoreIcon />
                </IconButton>
              </Grid>
            </Grid>
            <FormattedMessage id={`dictionaries.languages.${language}`}>
              {
                (formatMessage) => (
                  <Typography variant="body2" gutterBottom>
                    { formatMessage }
                  </Typography>
                )
              }
            </FormattedMessage>
            <TagChips tags={tags} className="dictionary-container__tag-chips"/>
            {
              alphabeth.map((letter) => (
                <WordsExpansionPanel key={letter} letter={letter}/>
              ))
            }
          </Grid>
        </Grid>
      );
    }
  }
}

DictionaryContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
  dictionary: PropTypes.shape({
    alphabeth: PropTypes.arrayOf(PropTypes.string).isRequired,
    id: PropTypes.number.isRequired,
    language: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
  }),
  actions: PropTypes.shape({
    fetchDictionary: PropTypes.func.isRequired,
  }),
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchDictionary }, dispatch)
  };
}

function mapStateToProps({ dictionaries: { chosen, loading } }) {
  return {
    dictionary: chosen,
    loading,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DictionaryContainer);
