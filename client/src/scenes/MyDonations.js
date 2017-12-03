import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import {
  Grid,
  Paper,
} from 'material-ui';
import DataTable from '../components/DataTable';
import DonationForm from '../components/DonationForm';

import { retrieveAllDonations } from '../actions';

const columns = [
  { id: 'organization', numeric: false, disablePadding: false, label: 'Organization' },
  { id: 'amount', numeric: false, disablePadding: false, label: 'Amount' },
];

const styles = theme => ({
  Root: theme.mixins.gutters({
    display: 'flex',
    minHeight: 'calc(100vh - 70px)',
    position: 'relative',
    paddingTop: theme.spacing.unit * 10,
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
      paddingTop: theme.spacing.unit * 3,
      flexDirection: 'column-reverse',
    },
  }),
  Form__container: {
    padding: theme.spacing.unit * 4
  },
  Column: {
    ...theme.mixins.gutters({}),
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
      marginBottom: theme.spacing.unit * 3
    },
  }
});

class MyDonations extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    donations: PropTypes.array,
    retrieveAllDonations: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.retrieveAllDonations();
  }

  shouldComponentUpdate(nextProps) {
    return this.props.donations.length !== nextProps.donations.length;
  }

  render() {
    const { classes, donations } = this.props;

    return (
      <Grid container spacing={0} className={classes.Root}>
        <Grid item xs={12} md={8} className={classes.Column}>
          <DataTable title="My Donations" columns={columns} data={donations} />
        </Grid>

        <Grid item xs={12} md={4} className={classes.Column}>
          <Paper elevation={4} className={classes.Form__container}>
            <DonationForm />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    donations: state.donations.filter(d => (d.user === state.user.id))
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    retrieveAllDonations: () => dispatch(retrieveAllDonations())
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(MyDonations);
