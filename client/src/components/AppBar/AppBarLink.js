import React from 'react';
import { Route, Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import { ButtonBase, Typography } from 'material-ui';

const styles = theme => ({
  Link__element: {
    textDecoration: 'none',
    color: theme.palette.common.black,
    fontWeight: 600,
    '&:visited': {
      color: theme.palette.common.black
    }
  },
  Link__container: {
    height: '100%',
    padding: '0 15px'
  },
  Link__element_active: {
    height: 3,
    width: '100%',
    background: theme.palette.primary.A400,
    position: 'absolute',
    bottom: -20,
    left: 0,
    transition: theme.transitions.create('opacity'),
  },
});

const AppBarLink = ({ classes, label, to, activeOnlyWhenExact }) => (
  <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
    <ButtonBase className={classes.Link__container} disableRipple>
      <Typography
        component="h3"
        type="subheading"
        color="inherit"
        className={match ? 'active' : ''}
      >
        <Link to={to} className={classes.Link__element}>{label}</Link>
        { match ? <div className={classes.Link__element_active} /> : null }
      </Typography>
    </ButtonBase>
  )}/>
);

export default withStyles(styles)(AppBarLink);
