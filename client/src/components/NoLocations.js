import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import {
  Paper,
  Typography,
  Button
} from 'material-ui';

const styles = theme => ({
  root: theme.mixins.gutters({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 32,
    marginTop: theme.spacing.unit * 3,
    height: '60vh'
  }),
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '30%'
  },
  headline: {
    fontWeight: 600,
    fontSize: '1.6125rem'
  },
  subtext: {
    fontWeight: 300,
  },
  button: {

  }
});

class NoLocations extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Paper elevation={4} className={classes.root}>
        <div className={classes.content}>
          <Typography type="title" gutterBottom className={classes.headline}>
            { 'Looks like you haven\'t requested any locations.' }
          </Typography>
          <Typography type="subheading" gutterBottom className={classes.subtext}>
            { 'To request new locations, simply upload a CSV file withall the location information you can provide.' }
          </Typography>
          <Button raised color="primary" className={classes.button}>
            { 'continue' }
          </Button>
        </div>
      </Paper>
    );
  }
}

const mapStateToProps = (/* state */) => {
  return { };
};

const mapDispatchToProps = (/* dispatch */) => {
  return { };
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(NoLocations);
