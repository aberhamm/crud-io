import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import FilterListIcon from 'material-ui-icons/FilterList';

const styles = theme => ({
  root: {
    padding: '15px 25px',
    backgroundColor: theme.palette.common.tableHeader,
    color: theme.palette.common.white,
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {

  },
  title: {
    flex: '0 0 auto',
  },
});

const DataTableToolbar = props => {
  const { classes, title } = props;

  return (
    <Toolbar className={classes.root}>
      <div className={classes.title}>
        <Typography type="headline" color="inherit">{title}</Typography>
      </div>
    </Toolbar>
  );
};

DataTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};

export default withStyles(styles)(DataTableToolbar);
