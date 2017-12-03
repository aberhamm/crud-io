import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  Root: {
    padding: '15px 25px',
    backgroundColor: theme.palette.primary.A700,
    color: theme.palette.common.white,
  },
  Title__container: {
    flex: '0 0 auto',
  },
});

const DataTableToolbar = props => {
  const { classes, title } = props;

  return (
    <Toolbar className={classes.Root}>
      <div className={classes.Title__container}>
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
