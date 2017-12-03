import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {
  Grid,
  Paper,
} from 'material-ui';

import EditUserForm from '../components/EditUserForm';

const styles = theme => ({
  Root: theme.mixins.gutters({
    height: 'calc(100vh - 70px)',
    overflow: 'scroll',
    paddingTop: theme.spacing.unit * 10,
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
      paddingTop: theme.spacing.unit * 3
    },
  }),
  Content__container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  Form__container: {
    width: '50vw',
    padding: theme.spacing.unit * 4,
    [theme.breakpoints.down('sm')]: {
      width: '100vw'
    },
  }
});

class EditProfile extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={0} className={classes.Root}>
        <Grid item xs={12} className={classes.Content__container}>
          <Paper elevation={4} className={classes.Form__container}>
            <EditUserForm />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(EditProfile);
