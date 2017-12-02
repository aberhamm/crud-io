import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Tooltip } from 'material-ui';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';

const headerStyles = theme => ({
  root: {
    backgroundColor: theme.palette.common.tableSubheader,
    color: theme.palette.common.white,
  },
  tableSort: {
    color: theme.palette.common.white + '!important',
  },
});

class DataTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { classes, order, orderBy, columns } = this.props;

    return (
      <TableHead className={classes.root}>
        <TableRow>
          {columns.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
              >
                <Tooltip
                  title="Sort"
                  placement={'bottom-start'}
                  enterDelay={700}
                  color="inherit"
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                    classes={{
                      root: classes.tableSort,
                      active: classes.tableSort,
                      icon: classes.tableSort,
                      desc: classes.tableSort,
                      asc: classes.tableSort
                    }}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

export default withStyles(headerStyles)(DataTableHead);
