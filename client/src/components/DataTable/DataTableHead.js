import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Tooltip } from 'material-ui';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';

const headerStyles = theme => ({
  Root: {
    backgroundColor: theme.palette.primary.A400,
    color: theme.palette.common.white,
  },
  TableSort__label: {
    color: theme.palette.common.white + '!important',
  },
});

class DataTableHead extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired
  }

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  }

  render() {
    const { classes, order, orderBy, columns } = this.props;

    return (
      <TableHead className={classes.Root}>
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
                      root: classes.TableSort__label,
                      active: classes.TableSort__label,
                      icon: classes.TableSort__label,
                      desc: classes.TableSort__label,
                      asc: classes.TableSort__label
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
