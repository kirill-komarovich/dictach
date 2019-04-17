import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchDictionary, updateDictionary } from 'actions/DictionariesActions';
import TagChips from 'components/tagChips';
import WordsExpansionPanel from 'components/wordsExpansionPanel';
import InplaceEditing from 'components/inplaceEditing';
import DictionaryMenu from 'components/dictionaryMenu';
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

  updateTitle = (value) => {
    const { actions: { updateDictionary }, dictionary: { id } } = this.props;
    updateDictionary({ title: value, id });
  }

  render() {
    const { dictionary: { title, tags, language, alphabeth, loading } } = this.props;
    const { headerHeight, loaded } = this.state;
    if (!loaded || loading) {
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
                <InplaceEditing
                  variant="h3"
                  gutterBottom
                  value={title}
                  onSubmit={this.updateTitle}
                />
              </Grid>
              <Grid item >
                <DictionaryMenu />
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
    loading: PropTypes.bool.isRequired,
  }),
  actions: PropTypes.shape({
    fetchDictionary: PropTypes.func.isRequired,
  }),
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchDictionary, updateDictionary }, dispatch)
  };
}

function mapStateToProps({ dictionary }) {
  return {
    dictionary,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DictionaryContainer);
