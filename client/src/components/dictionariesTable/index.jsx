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
import Typography from '@material-ui/core/Typography';
import * as dictionariesActions from 'actions/DictionariesActions';
import DictionariesTableHead from './dictionariesTableHead';

const PER_PAGE_VARIANTS = [5, 10, 20];
const LINE_HEIGHT = 49;

class DictionariesTable extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      direction: 'asc',
      orderBy: 'id',
      page: 1,
      rowsPerPage: 5,
    };
  }

  componentDidMount() {
    const { page, rowsPerPage, order, direction } = this.state;
    this.fetchDictionaries(page, rowsPerPage, order, direction);
  }

  fetchDictionaries = (page, rowsPerPage, order, direction) => {
    const { actions: { fetchAllDictionaries }} = this.props;
    fetchAllDictionaries(page, rowsPerPage, order, direction);
  }

  handleClick = (id) => {

  };

  handleChangePage = (_event, page) => {
    const { rowsPerPage, order, direction } = this.state;
    this.setState({ page: page + 1 });
    this.fetchDictionaries(page + 1, rowsPerPage, order, direction);
  };

  handleChangeRowsPerPage = (event) => {
    const { page } = this.state;
    const rowsPerPage = event.target.value;
    this.setState({ rowsPerPage });
    this.fetchDictionaries(page, rowsPerPage);
  };

  handleRequestSort = (property) => {
    const { order, direction, page, rowsPerPage } = this.state;
    let orderDirection = 'desc';

    if (order === property && direction === 'desc') {
      orderDirection = 'asc';
    }

    if (property !== 'tags') {
      this.setState({ direction: orderDirection, order: property });
      this.fetchDictionaries(page, rowsPerPage, property, orderDirection);
    }
  };

  render() {
    const { dictionaries: { all: dictionaries, records }} = this.props;
    const { page, rowsPerPage, order, direction } = this.state;
    const emptyRows = Math.min(rowsPerPage, rowsPerPage - dictionaries.length);
    return (
      <div>
        <Typography variant="h5" gutterBottom>
          <FormattedMessage id="dictionaries.table.title"/>
        </Typography>
        <Table className="dictionaries-table" aria-labelledby="tableTitle">
          <DictionariesTableHead
            order={order}
            direction={direction}
            handleRequestSort={this.handleRequestSort}
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
                      { dictionary.title }
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
                <TableRow style={{ height: LINE_HEIGHT * emptyRows }}>
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
