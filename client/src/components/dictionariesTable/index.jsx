import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FilterListIcon from '@material-ui/icons/FilterList';
import * as dictionariesActions from 'actions/DictionariesActions';
import DictionariesTableHead from './dictionariesTableHead';

const PER_PAGE_VARIANTS = [5, 10, 20];

class DictionariesTable extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      order: 'asc',
      orderBy: 'id',
      page: 1,
      rowsPerPage: 5,
    };
  }

  componentDidMount() {
    const { page, rowsPerPage } = this.state;
    this.fetchDictionaries(page, rowsPerPage);
  }

  fetchDictionaries = (page, rowsPerPage) => {
    const { actions: { fetchAllDictionaries }} = this.props;
    fetchAllDictionaries(page, rowsPerPage);
  }

  handleClick = (id) => {

  };

  handleChangePage = (_event, page) => {
    const { rowsPerPage } = this.state;
    this.setState({ page: page + 1 });
    this.fetchDictionaries(page + 1, rowsPerPage);
  };

  handleChangeRowsPerPage = (event) => {
    const { page } = this.state;
    const rowsPerPage = event.target.value;
    this.setState({ rowsPerPage });
    this.fetchDictionaries(page, rowsPerPage);
  };

  render() {
    const { dictionaries: { all: dictionaries, records }} = this.props;
    const { page, rowsPerPage, order, orderBy } = this.state;
    const emptyRows = Math.min(rowsPerPage, rowsPerPage - dictionaries.length);
    return (
      <div>
        <Typography variant="h5" gutterBottom>
          <FormattedMessage id="dictionaries.table.title"/>
        </Typography>
        <Table className="dictionaries-table" aria-labelledby="tableTitle">
          <DictionariesTableHead
            order={order}
            orderBy={orderBy}
            onSelectAllClick={this.handleSelectAllClick}
            // onRequestSort={this.handleRequestSort}
            rowCount={dictionaries.length}
          />
          <TableBody>
            {
              dictionaries.map(dictionary => {
                return (
                  <TableRow
                    hover
                    onClick={() => this.handleClick(dictionary.id)}
                    tabIndex={-1}
                    key={dictionary.id}
                  >
                    <TableCell component="th" scope="row" padding="none">
                      {dictionary.title}
                    </TableCell>
                    <TableCell align="right">
                      { dictionary.language }
                    </TableCell>
                    <TableCell align="right">
                      { dictionary.tags }
                    </TableCell>
                  </TableRow>
                );
              })}
            {
              emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )
            }
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={PER_PAGE_VARIANTS}
          component="div"
          count={records}
          rowsPerPage={rowsPerPage}
          page={page - 1}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </div>
    );
  }
};

DictionariesTable.propTypes = {
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
};

export default connect(mapStateToProps, mapDispatchToProps)(DictionariesTable);
