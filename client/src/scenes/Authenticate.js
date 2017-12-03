import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import {
  Grid
} from 'material-ui';

import {
  Redirect
} from 'react-router-dom';

import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';

const styles = theme => ({
  Root: {
    display: 'flex',
    flexGrow: 1,
    height: 'calc(100vh - 80px)',
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.mixins.gutters({}),
  },
  Forms__container: {
    height: '50vh',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    [theme.breakpoints.down('md')]: {
      height: 'auto',
      flexDirection: 'column',
      marginTop: 100
    }
  },

  Forms__formContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: theme.mixins.gutters({}).paddingLeft * 3,
    paddingRight: theme.mixins.gutters({}).paddingRight * 3,
    '&:last-child': {
      borderLeft: '1px solid grey'
    },
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing.unit * 4,
      flex: 0,
      ...theme.mixins.gutters({}),
      '&:last-child': {
        borderLeft: 0
      }
    }
  },
});

class Authenticate extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    session: PropTypes.bool.isRequired
  }

  render() {
    const { classes, session } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    if (session) {
      return (
        <Redirect to={from} />
      );
    }
    return (
      <Grid container spacing={0} className={classes.Root}>
        <Grid item xs={12} className={classes.Forms__container}>
          <Grid item xs={12} md={4} className={classes.Forms__formContainer}>
            <SignUpForm />
          </Grid>
          <Grid item xs={12} md={4} className={classes.Forms__formContainer}>
            <SignInForm />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    session: state.session
  };
};

export default compose(connect(mapStateToProps), withStyles(styles))(Authenticate);
