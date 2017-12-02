import React, { PureComponent } from 'react';
import io from 'socket.io-client';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import {
  Grid,
  Paper,
  Typography,
  Button
} from 'material-ui';
import DataTable from '../components/DataTable';
import DonationForm from '../components/DonationForm';

import { retrieveAllDonations, donationSuccess } from '../actions';

const columns = [
  { id: 'organization', numeric: false, disablePadding: false, label: 'Organization' },
  { id: 'amount', numeric: false, disablePadding: false, label: 'Amount' }
];

const styles = theme => ({
  Root: theme.mixins.gutters({
    minHeight: 'calc(100vh - 70px)',
    position: 'relative',
    paddingTop: theme.spacing.unit * 10
  }),
  Form__container: {
    padding: theme.spacing.unit * 4
  }
});

class Dashboard extends PureComponent {
  state = {

  }

  componentWillMount() {
    this.socket = io('/');
    this.props.retrieveAllDonations();
  }

  componentDidMount() {
    this.socket.on('donate', donation => this.props.donationSuccess(donation));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.donations.length !== nextProps.donations.length;
  }

  render() {
    const { classes, donations } = this.props;

    return (
      <Grid container spacing={40} className={classes.Root}>
        <Grid item xs={12}>
          <DataTable title="Live Donations!" columns={columns} data={donations} />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    donations: state.donations
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    retrieveAllDonations: () => dispatch(retrieveAllDonations()),
    donationSuccess: (donation) => dispatch(donationSuccess(donation))
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Dashboard);
