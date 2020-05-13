import React, { useContext } from 'react';
import AppContext from '../lib/context';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link, useHistory } from 'react-router-dom';
import MenuDrawer from './menu-drawer';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  logo: {
    height: '2rem',
    objectFit: 'contain'
  },
  logoContainer: {
    flexGrow: 1
  },
  logoLink: {
    width: 'auto'
  }
}));

export default function MenuAppBar(props) {
  const context = useContext(AppContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClicked = () => {
    handleClose();
  };

  const handleLogout = () => {
    context.onLogout();
    history.push('/');
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <MenuDrawer />
          <Box className={classes.logoContainer} display="flex" justifyContent="center" alignItems="center">
            <Link to='/' className={classes.logoLink}>
              <img src="/images/BasedLong.png" className={classes.logo} />
            </Link>
          </Box>
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
              <Link to='/profile' style={{ textDecoration: 'none', color: 'black' }}>
                <MenuItem onClick={handleProfileClicked}>Profile</MenuItem>
              </Link>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      <Toolbar></Toolbar>

    </div>
  );
}
