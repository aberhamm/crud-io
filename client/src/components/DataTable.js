import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Table, Paper } from 'material-ui';
import {
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
} from 'material-ui/Table';
import DataTableToolbar from './DataTable/DataTableToolbar';
import DataTableHead from './DataTable/DataTableHead';

const createData = (row) => {
  // Put data in order
  return { id: row._id, user: row.user, organization: row.organization, amount: row.amount, createdAt: row.createdAt, ...row };
};

const styles = () => ({
  Root: {
    width: '100%',
  }
});

class DataTable extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    data: PropTypes.array,
    title: PropTypes.string.isRequired
  }

  state = {
    order: 'desc',
    orderBy: 'createdAt',
    data: this.props.data.map(createData),
    page: 0,
    rowsPerPage: 10,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data.map(createData)
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.data.length !== nextProps.data.length ||
           this.state.order !== nextState.order ||
           this.state.orderBy !== nextState.orderBy ||
           this.state.page !== nextState.page ||
           this.state.rowsPerPage !== nextState.rowsPerPage;
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  }

  render() {
    const { classes, columns, title } = this.props;
    const { data, order, orderBy, rowsPerPage, page } = this.state;
    const specifiedColumns = columns.map(c => c.id);

    return (
      <Paper className={classes.Root}>
        <DataTableToolbar title={title} handleFilter={this.handleLocationFilter} />
        <Table className={classes.Table}>
          <DataTableHead
            columns={columns}
            order={order}
            orderBy={orderBy}
            onRequestSort={this.handleRequestSort}
            rowCount={data.length}
          />
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={row.id}
                >
                  { Object.entries(row).map(([key, value]) => specifiedColumns.indexOf(key) > -1 && <TableCell key={key}>{value}</TableCell>) }
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(DataTable);
