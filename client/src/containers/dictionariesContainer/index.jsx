import React from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import TagsList from 'components/tagsList';
import DictionariesTable from 'components/dictionariesTable';
import TagsFormModal from 'components/tagsFormModal';
import './index.scss';

const DICTIONARIES_TABLE_XS = 10;

class DictionariesContainer extends React.PureComponent {
  state = {
    editFormOpened: false,
    headerHeight: 0,
  }

  componentDidMount() {
    const headerHeight = document.getElementsByClassName('header')[0].clientHeight;
    this.setState({ headerHeight });
  }

  toggleForm = () => {
    this.setState({
      editFormOpened: !this.state.editFormOpened ,
    });
  }

  render() {
    const { headerHeight, editFormOpened } = this.state;
    return (
      <Grid container className="dictionaries-container" style={{ marginTop: `${headerHeight}px` }}>
        <Hidden xsDown>
          <div className="dictionaries-container__tags-list">
            <TagsList
              toggleForm={this.toggleForm}
              headerHeight={headerHeight}
            />
          </div>
        </Hidden>
        <Grid xs={DICTIONARIES_TABLE_XS} className="dictionaries-container__table">
          <DictionariesTable/>
        </Grid>
        {
          editFormOpened && <TagsFormModal open onClose={this.toggleForm} />
        }
      </Grid>
    );
  }
}

export default DictionariesContainer;
