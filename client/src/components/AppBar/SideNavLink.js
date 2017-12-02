import React from 'react';
import { Route, Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import { Typography } from 'material-ui';

const styles = theme => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.common.fontPrimary,
    fontWeight: 400,
  },
  activeLink: {
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
      <Link to={to} className={`${classes.link} ${match ? classes.activeLink : ''}`}>{label}</Link>
    </Typography>
  )}/>
);

export default withStyles(styles)(AppBarLink);
