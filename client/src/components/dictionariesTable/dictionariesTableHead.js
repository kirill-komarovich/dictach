import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { injectIntl, intlShape } from 'react-intl';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
// import * as dictionariesActions from 'actions/DictionariesActions';

const

class DictionariesTableHead extends React.Component {
  columns = () => {
    const { intl: { formatMessage } } = this.props;
    return [
      { id: 'title', numeric: false, disablePadding: true, label: formatMessage({id: 'dictionaries.table.head.title'}) },
      { id: 'description', numeric: true, disablePadding: false, label: formatMessage({id: 'dictionaries.table.head.description'}) },
      { id: 'tags', numeric: true, disablePadding: false, label: formatMessage({id: 'dictionaries.table.head.tags'}) },
    ];
  }

  render() {
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              // indeterminate={numSelected > 0 && numSelected < rowCount}
              // checked={numSelected === rowCount}
              // onChange={onSelectAllClick}
            />
          </TableCell>
          {
            columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.numeric ? 'right' : 'left'}
                padding={column.disablePadding ? 'none' : 'default'}
                // sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    // active={orderBy === column.id}
                    // direction={order}
                    // onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ), this)
        }
        </TableRow>
      </TableHead>
    );
  }
};

DictionariesTableHead.propTypes = {
  intl: intlShape.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    // actions: bindActionCreators(dictionariesActions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    dictionaries: state.dictionaries,
  };
};

const DictionariesTableHeadWithIntl = injectIntl(DictionariesTableHead)
export default connect(mapStateToProps, mapDispatchToProps)(DictionariesTableHeadWithIntl);
