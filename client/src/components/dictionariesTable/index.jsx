import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { fetchAllDictionaries } from 'actions/DictionariesActions';
import DictionariesTableHead from './dictionariesTableHead';
import DictionaryFormDialog from 'components/dictionaryFormDialog';
import './index.scss';

const PER_PAGE_VARIANTS = [5, 10, 20];
const LINE_HEIGHT = 49;
const LOADER_SIZE = 80;

class DictionariesTable extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      direction: 'asc',
      orderBy: 'id',
      page: 1,
      rowsPerPage: 5,
      formOpened: false,
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

  toggleForm = (_event, update) => {
    this.setState(({ formOpened }) => {
      return { formOpened: !formOpened };
    });
    if (update) {
      const { order, direction, page, rowsPerPage } = this.state;
      this.fetchDictionaries(page, rowsPerPage, order, direction);
    }
  }

  render() {
    const { dictionaries: { all: dictionaries, records, loading } } = this.props;
    const { page, rowsPerPage, order, direction, formOpened } = this.state;
    const emptyRows = Math.min(rowsPerPage, rowsPerPage - dictionaries.length);
    if (loading)
      return (
        <div className="dictionaries-loader">
          <CircularProgress size={LOADER_SIZE}/>
        </div>
      );
    else
      return (
        <React.Fragment>
          <div className="dictionaries-table__header">
            <FormattedMessage id="dictionaries.table.title">
              {
                (formatMessage) => (
                  <Typography variant="h5" gutterBottom className="dictionaries-table__title">
                    { formatMessage }
                  </Typography>
                )
              }
            </FormattedMessage>
            <Button variant="contained" color="primary" onClick={this.toggleForm}>
              <FormattedMessage id="dictionaries.table.add"/>
            </Button>
          </div>
          {
            dictionaries.length > 0 ? (
              <React.Fragment>
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
              </React.Fragment>
            ) : (
              <div className="dictionaries-empty-message">
                <FormattedMessage
                  id="dictionaries.table.empty"
                >
                  {
                    (formatMessage) => (
                      <Typography variant="body1" >
                        { formatMessage }
                      </Typography>
                    )
                  }
                </FormattedMessage>
              </div>
            )
          }
          { formOpened && <DictionaryFormDialog open={formOpened} onClose={this.toggleForm} />}
        </React.Fragment>
      );
  }
}

DictionariesTable.propTypes = {
  dictionaries: PropTypes.shape({
    all: PropTypes.array.isRequired,
    records: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    fetchAllDictionaries: PropTypes.func.isRequired,
  }).isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchAllDictionaries }, dispatch)
  };
}

function mapStateToProps({ dictionaries: { all, records, loading } }) {
  return {
    dictionaries: { all, records, loading },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DictionariesTable);
