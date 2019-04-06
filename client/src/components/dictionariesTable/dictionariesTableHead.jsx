import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { injectIntl, intlShape } from 'react-intl';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import * as dictionariesActions from 'actions/DictionariesActions';

class DictionariesTableHead extends React.Component {
  columns = () => {
    const { intl: { formatMessage } } = this.props;
    return [
      {
        id: 'title',
        numeric: false,
        label: formatMessage({id: 'dictionaries.table.head.title'}),
        sortable: true,
      },
      {
        id: 'language',
        numeric: true,
        label: formatMessage({id: 'dictionaries.table.head.language'}),
        sortable: true,
      },
      {
        id: 'tags',
        numeric: true,
        label: formatMessage({id: 'dictionaries.table.head.tags'}),
        sortable: false,
      },
    ];
  }

  renderSortLabel = ({ id, label }, order, direction) => (
    <TableSortLabel
      active={order === id}
      direction={direction}
      onClick={() => this.props.handleRequestSort(id)}
    >
      { label }
    </TableSortLabel>
  );

  render() {
    const { intl: { formatMessage }} = this.props;
    const { order, direction } = this.props;
    const columns = this.columns();
    return (
      <TableHead>
        <TableRow>
          {
            columns.map((column) => (
              <TableCell
                key={column.id}
                sortDirection={order === column.id ? direction : false}
              >
                {
                  column.sortable ? (
                    <Tooltip
                      title={formatMessage({ id: 'tooltip.sort' })}
                      placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                      enterDelay={300}
                    >
                      { this.renderSortLabel(column, order, direction) }
                    </Tooltip>
                  ) : this.renderSortLabel(column, order, direction)
                }
              </TableCell>
            ), this)
          }
        </TableRow>
      </TableHead>
    );
  }
}

DictionariesTableHead.propTypes = {
  intl: intlShape.isRequired,
  order: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  handleRequestSort: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(dictionariesActions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    dictionaries: state.dictionaries,
  };
}

const DictionariesTableHeadWithIntl = injectIntl(DictionariesTableHead);
export default connect(mapStateToProps, mapDispatchToProps)(DictionariesTableHeadWithIntl);
