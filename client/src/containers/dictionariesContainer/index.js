import React from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import TagsList from 'components/tagsList';
import DictionariesTable from 'components/dictionariesTable';
import TagsFormModal from 'components/tagsFormModal';
import './index.scss';

class DictionariesContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      editFormOpened: false,
      headerHeight: 0,
    };
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
      <Grid container className="tags-container" style={{ marginTop: `${headerHeight}px` }}>
        <Hidden xsDown>
          <div className="tags-container__list">
            <TagsList
              toggleForm={this.toggleForm}
              headerHeight={headerHeight}
            />
          </div>
        </Hidden>
        <div className="tags-container__chosen">
          <DictionariesTable/>
        </div>
        {
          editFormOpened && <TagsFormModal open onClose={this.toggleForm} />
        }
      </Grid>
    );
  }
}

export default DictionariesContainer;
