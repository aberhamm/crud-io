import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import {
  Grid,
  Typography
} from 'material-ui';

import {
  Redirect
} from 'react-router-dom';

import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';

const styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    height: 'calc(100vh - 80px)',
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.mixins.gutters({}),
  },
  content: {
    height: '50vh',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    '&>:last-child': {
      borderLeft: '1px solid grey'
    },
    [theme.breakpoints.down('md')]: {
      height: 'auto',
      flexDirection: 'column',
      '&>:last-child': {
        borderLeft: 0
      },
    }
  },

  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: theme.mixins.gutters({}).paddingLeft * 3,
    paddingRight: theme.mixins.gutters({}).paddingRight * 3,
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing.unit * 4,
      ...theme.mixins.gutters({})
    }
  }
});

class Authenticate extends Component {
  state = {
    licensee: 'MyArea Network'
  };

  render() {
    const { classes, session } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    if (session) {
      return (
        <Redirect to={from} />
      );
    }
    return (
      <Grid container spacing={40} className={classes.root}>
        <Grid item xs={12} className={classes.content}>
          <Grid item xs={12} md={4} className={classes.formContainer}>
            <SignUpForm />
          </Grid>
          <Grid item xs={12} md={4} className={classes.formContainer}>
            <SignInForm />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    session: state.session
  };
};

const mapDispatchToProps = (/* dispatch */) => {
  return { };
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Authenticate);
