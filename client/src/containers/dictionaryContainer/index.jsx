import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchDictionary, updateDictionary, refreshAlphabeth } from 'actions/DictionariesActions';
import { fetchAllWordsByLetter } from 'src/actions/WordsActions';
import TagChips from 'components/tagChips';
import WordsExpansionPanel from 'components/wordsExpansionPanel';
import InplaceEditing from 'components/inplaceEditing';
import DictionaryMenu from 'components/dictionaryMenu';
import AddWordButton from 'components/addWordButton';
import WordFormDialog from 'components/wordFormDialog';
import Breadcrumbs from './breadcrumbs';
import './index.scss';

const LOADER_SIZE = 60;

class DictionaryContainer extends React.Component {
  state = {
    headerHeight: 0,
    loaded: false,
    wordFormOpened: false,
  }

  componentDidMount() {
    const { actions: { fetchDictionary }, match: { params: { id } } } = this.props;
    const headerHeight = document.getElementsByClassName('header')[0].clientHeight;
    this.setState({ headerHeight });
    fetchDictionary(id).then(() => {
      this.setState({ loaded: true });
    });
  }

  updateTitle = (value) => {
    const { actions: { updateDictionary }, dictionary: { id } } = this.props;
    updateDictionary({ title: value, id });
  }

  openWordForm = () => {
    this.setState({ wordFormOpened: true });
  }

  closeWordForm = (_event, update, letter ) => {
    this.setState({ wordFormOpened: false });
    if (update) {
      const {
        dictionary: { id, alphabeth },
        actions: { refreshAlphabeth, fetchAllWordsByLetter }
      } = this.props;

      if (alphabeth.includes(letter)) {
        fetchAllWordsByLetter(id, letter);
      } else {
        refreshAlphabeth(id);
      }
    }
  }

  render() {
    const { dictionary: { id, title, tags, language, alphabeth, loading } } = this.props;
    const { headerHeight, loaded, wordFormOpened } = this.state;
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
              <Grid item>
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
                <WordsExpansionPanel key={letter} letter={letter} dictionaryId={id} />
              ))
            }
          </Grid>
          <AddWordButton className="dictionary-container__fab" onClick={this.openWordForm} />
          {
            wordFormOpened && (
              <WordFormDialog open={wordFormOpened} onClose={this.closeWordForm} dictionaryId={id} />
            )
          }
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
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    alphabeth: PropTypes.arrayOf(PropTypes.string).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    loading: PropTypes.bool.isRequired,
  }),
  actions: PropTypes.shape({
    fetchDictionary: PropTypes.func.isRequired,
    updateDictionary: PropTypes.func.isRequired,
    refreshAlphabeth: PropTypes.func.isRequired,
    fetchAllWordsByLetter: PropTypes.func.isRequired,
  }),
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchDictionary,
      updateDictionary,
      refreshAlphabeth,
      fetchAllWordsByLetter,
    }, dispatch)
  };
}

function mapStateToProps({ dictionary }) {
  return {
    dictionary,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DictionaryContainer);
