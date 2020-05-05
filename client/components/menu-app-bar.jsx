import React, { useContext } from 'react';
import AppContext from '../lib/context';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import MenuDrawer from './menu-drawer';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function MenuAppBar() {
  const context = useContext(AppContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClicked = () => {

  };

  return (
    // <BrowserRouter>
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuDrawer />
          </IconButton>
          <Typography variant="h6" className={classes.title} align="center">
              BasedSales
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={open}
              onClose={handleClose}
            >
              <Link to='/profile' style={{ textDecoration: 'none' }}>
                <MenuItem >Profile</MenuItem>
              </Link>
              <MenuItem onClick={context.onLogout}>Logout</MenuItem>
              {/* <Link to='/profile' style={{ textDecoration: 'none' }}>
                  <MenuItem onClick={handleProfileClicked}>Profile</MenuItem>
                </Link>
                <MenuItem onClick={handleLogoutClicked}>Logout</MenuItem> */}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>

  );
}
