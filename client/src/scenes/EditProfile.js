import React, { PureComponent } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import {
  Grid,
  Paper,
  Typography,
} from 'material-ui';

import EditUserForm from '../components/EditUserForm';

const styles = theme => ({
  Root: theme.mixins.gutters({
    height: 'calc(100vh - 70px)',
    overflow: 'scroll',
    paddingTop: theme.spacing.unit * 10
  }),
  Content__container: {
    display: 'flex',
    justifyContent: 'center'
  },
  Form__container: {
    width: '50vw',
    padding: theme.spacing.unit * 4
  }
});

class EditProfile extends PureComponent {
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
