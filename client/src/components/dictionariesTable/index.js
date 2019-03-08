import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { injectIntl, intlShape } from 'react-intl';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
// import * as dictionariesActions from 'actions/DictionariesActions';
import DictionariesTableHead from './dictionariesTableHead';

class DictionariesTable extends React.Component {

  render() {
    return (
      <div>
        <Table className="dictionaries-table" aria-labelledby="tableTitle">
          <DictionariesTableHead
            // numSelected={selected.length}
            // order={order}
            // orderBy={orderBy}
            // onSelectAllClick={this.handleSelectAllClick}
            // onRequestSort={this.handleRequestSort}
            // rowCount={data.length}
          />
        </Table>
      </div>
    );
  }
};

DictionariesTable.propTypes = {

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

export default connect(mapStateToProps, mapDispatchToProps)(DictionariesTable);
