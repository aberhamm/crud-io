import React, { PureComponent} from 'react';
import { withStyles } from 'material-ui/styles';
import {
  IconButton,
  Menu,
  Typography
} from 'material-ui';
import {
  MenuItem
} from 'material-ui/Menu';
import {
  AccountCircle
} from 'material-ui-icons';

const styles = theme => ({
  Root: {
    display: 'flex',
    marginLeft: 30,
    position: 'relative',
    '&:after': {
      content: '""',
      background: theme.palette.common.lightBlack,
      position: 'absolute',
      left: 0,
      height: '50%',
      width: 1,
      alignSelf: 'center'
    }
  },
  userMeta: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.common.lightBlack,
    fontSize: 12
  },
  button: {
    color: theme.palette.text.lightBlack
  }
});

class CurrentUserBadge extends PureComponent {
  state = {
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleSignOutClick = () => {
    this.setState({ anchorEl: null });
    this.props.signOutUser();
  };

  render() {
    const { classes, user } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.Root}>
        <IconButton
          aria-owns={open ? 'menu-appbar' : null}
          aria-haspopup="true"
          onClick={this.handleMenu}
          className={classes.button}
        >
          <AccountCircle />
        </IconButton>
        <div className={classes.userMeta}>
          <Typography type="body2" align="center">
             Welcome, {user.name}
          </Typography>
        </div>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onRequestClose={this.handleRequestClose}
        >
          <MenuItem onClick={this.handleSignOutClick}>Sign Out</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(CurrentUserBadge);
