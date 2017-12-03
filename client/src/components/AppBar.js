import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import {
  AppBar,
  Grid,
  Toolbar
} from 'material-ui';

import { history } from '../store/configureStore';

import SideNavToggle from './AppBar/SideNavToggle';
import CurrentUserBadge from './AppBar/CurrentUserBadge';
import AppBarLink from './AppBar/AppBarLink';

import { signOutUser } from '../actions';

const styles = theme => ({
  Root: {
    height: 70
  },
  Logo__container: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  Logo__image: {
    height: '25px'
  },
  Nav__container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  }
});

class MenuAppBar extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    locationKey: PropTypes.string.isRequired,
    session: PropTypes.bool.isRequired,
    signOut: PropTypes.func,
    user: PropTypes.object
  }

  shouldComponentUpdate(nextProps) {
    const { locationKey, user, session } = this.props;
    return (nextProps.locationKey !== locationKey) || (nextProps.user.name !== user.name) || (nextProps.session !== session);
  }

  render() {
    const { classes, user, session, signOut } = this.props;
    return (
      <Grid container className={classes.Root}>
        <Grid item xs={12}>
        <AppBar position="static" color="inherit" elevation={1}>
          <Toolbar>
            <Grid container spacing={24}>
              <Grid item xs={3} hidden={{ mdUp: true }}>
                { session ? <SideNavToggle /> : null }
              </Grid>
              <Grid item xs={6} md={3}>
                <div className={classes.Logo__container}>
                  <img alt="Salesforce.org CRUD App" className={classes.Logo__image} src="data:image/png;base64,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" />
                </div>
              </Grid>
              <Grid item md={9} hidden={{ smDown: true }}>
                { session && <div className={classes.Nav__container}>
                  <AppBarLink to="/dashboard" label="Dashboard" />
                  <AppBarLink to="/my-donations" label="My Donations" />
                  <AppBarLink to="/profile" label="Edit Profile" />
                  <CurrentUserBadge user={user} signOutUser={signOut} />
                </div> }
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    locationKey: state.routing.location.key,
    session: state.session,
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => {
      dispatch(signOutUser());
      history.push('/authenticate');
    }
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(MenuAppBar);
