import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
} from 'material-ui';
import MenuIcon from 'material-ui-icons/Menu';
import SideNavLink from './SideNavLink';

const styles = {
  list: {
    width: 250,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class SideNavToggle extends React.Component {
  state = {
    open: false
  };

  toggleDrawer = (open) => () => {
    this.setState({
      open
    });
  };

  render() {
    const { classes } = this.props;

    const navList = (
      <div className={classes.list}>
        <List>
          <ListItem>
            <SideNavLink to="/dashboard" label="Dashboard" />
          </ListItem>
          <ListItem>
            <SideNavLink to="/my-donations" label="My Donations" />
          </ListItem>
          <ListItem>
            <SideNavLink to="/profile" label="Edit Profile" />
          </ListItem>
        </List>
      </div>
    );

    return (
      <div>
        <IconButton onClick={this.toggleDrawer(true)} className={classes.menuButton} aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Drawer open={this.state.open} onRequestClose={this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            {navList}
          </div>
        </Drawer>
      </div>
    );
  }
}

SideNavToggle.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideNavToggle);
