import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { injectIntl, intlShape } from 'react-intl';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import { fetchAllTags } from 'actions/TagsActions';
import './index.scss';

class TagsList extends React.Component {
  componentDidMount() {
    this.props.actions.fetchAllTags();
  }

  render() {
    const {
      tags: { all: tags },
      toggleForm,
      intl: { formatMessage },
      headerHeight,
    } = this.props;
    return (
      <List className="tags-list" style={{ height: `calc(100vh - ${headerHeight}px - 16px)`}}>
        <span className="list-title">
          {formatMessage({id: 'tags.list.title'})}
        </span>
        {
          tags.map((tag) => (
            <ListItem key={tag.id} role="menuitem" className="tags-list__item">
              <ListItemIcon >
                <LabelOutlinedIcon className="list-icon"/>
              </ListItemIcon>
              <span className="list-text">{tag.title}</span>
            </ListItem>
          ))
        }
        <ListItem role="menuitem" className="tags-list__item" onClick={toggleForm}>
          <ListItemIcon>
            <EditOutlinedIcon className="list-icon"/>
          </ListItemIcon>
          <span className="list-text">
            {formatMessage({id: 'tags.list.edit'})}
          </span>
        </ListItem>
      </List>
    );
  }
}


TagsList.propTypes = {
  toggleForm: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  headerHeight: PropTypes.number.isRequired,
  actions: PropTypes.shape({
    fetchAllTags: PropTypes.func.isRequired,
  }).isRequired,
  tags: PropTypes.shape({
    all: PropTypes.array.isRequired,
  }).isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchAllTags }, dispatch)
  };
}

function mapStateToProps(state) {
  const { tags: { all } } = state;
  return {
    tags: { all },
  };
}

const TagsListWithIntl = injectIntl(TagsList);
export default connect(mapStateToProps, mapDispatchToProps)(TagsListWithIntl);
