import React from 'react';
import { withStyles } from 'material-ui/styles';
import keycode from 'keycode';
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
  return { id: row._id, organization: row.organization, amount: row.amount, createdAt: row.createdAt };
};

const styles = theme => ({
  root: {
    width: '100%',
  },
  table: {
    minWidth: 800,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  tableRow: {
    cursor: 'pointer'
  }
});

class DataTable extends React.Component {
  state ={
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
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes, columns, title } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const specifiedColumns = columns.map(c => c.id);

    return (
      <Paper className={classes.root}>
        <DataTableToolbar title={title} handleFilter={this.handleLocationFilter} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
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
                    className={classes.tableRow}
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
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(DataTable);
