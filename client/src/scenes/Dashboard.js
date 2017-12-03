import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import {
  Grid
} from 'material-ui';
import DataTable from '../components/DataTable';

import { retrieveAllDonations, donationSuccess } from '../actions';

const columns = [
  { id: 'organization', numeric: false, disablePadding: false, label: 'Organization' },
  { id: 'amount', numeric: false, disablePadding: false, label: 'Amount' }
];

const styles = theme => ({
  Root: theme.mixins.gutters({
    minHeight: 'calc(100vh - 70px)',
    position: 'relative',
    paddingTop: theme.spacing.unit * 10,
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing.unit * 3
    },
  })
});

class Dashboard extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    donations: PropTypes.array,
    donationSuccess: PropTypes.func.isRequired,
    retrieveAllDonations: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.socket = io('/');
    this.props.retrieveAllDonations();
  }

  componentDidMount() {
    this.socket.on('donate', donation => this.props.donationSuccess(donation));
  }

  shouldComponentUpdate(nextProps) {
    return this.props.donations.length !== nextProps.donations.length;
  }

  componentWillUnmount() {
    this.socket.disconnect();
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
