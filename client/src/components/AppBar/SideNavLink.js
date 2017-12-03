import React from 'react';
import { Route, Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import { Typography } from 'material-ui';

const styles = theme => ({
  NavLink: {
    textDecoration: 'none',
    color: theme.palette.common.black,
    fontWeight: 400,
  },
  NavLink_active: {
    fontWeight: 600,
  },
});

const AppBarLink = ({ classes, label, to, activeOnlyWhenExact }) => (
  <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
    <Typography
      component="h3"
      type="subheading"
      color="inherit"
    >
      <Link to={to} className={`${classes.NavLink} ${match ? classes.NavLink_active : ''}`}>{label}</Link>
    </Typography>
  )}/>
);

export default withStyles(styles)(AppBarLink);
