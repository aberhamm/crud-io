import React from 'react';
import { Route, Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import { ButtonBase, Typography } from 'material-ui';

const styles = theme => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.common.fontPrimary,
    fontWeight: 600,
    '&:visited': {
      color: theme.palette.common.fontPrimary
    }
  },
  button: {
    height: '100%',
    padding: '0 15px'
  },
  underline: {
    height: 3,
    width: '100%',
    background: theme.palette.common.blue,
    position: 'absolute',
    bottom: -20,
    left: 0,
    transition: theme.transitions.create('opacity'),
  },
});

const AppBarLink = ({ classes, label, to, activeOnlyWhenExact }) => (
  <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
    <ButtonBase className={classes.button} disableRipple>
      <Typography
        component="h3"
        type="subheading"
        color="inherit"
        className={match ? 'active' : ''}
      >
        <Link to={to} className={classes.link}>{label}</Link>
        { match ? <div className={classes.underline} /> : null }
      </Typography>
    </ButtonBase>
  )}/>
);

export default withStyles(styles)(AppBarLink);
