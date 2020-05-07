import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import BusinessIcon from '@material-ui/icons/Business';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
});

export default function MenuDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (anchor, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const renderIcon = index => {
    switch (index) {
      case 0: return (<DashboardIcon />);
      case 1: return (<PlaylistAddCheckIcon />);
      case 2: return (<AccountBoxIcon />);
      case 3: return (<BusinessIcon />);
    }
  };

  const list = anchor => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom'
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[{
          label: 'Dashboard',
          path: '/'
        },
        {
          label: 'Tickets',
          path: '/tickets/:userId'
        },
        {
          label: 'Customers',
          path: '/customers'
        },
        {
          label: 'Organization',
          path: '/organization'
        }
        ].map((item, index) => (
          <Link to={item.path} key={item.label} style={{ textDecoration: 'none' }}>
            <ListItem button>
              {renderIcon(index)}
              <ListItemText primary={item.label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      <React.Fragment key={'left'}>
        <MenuIcon onClick={toggleDrawer('left', true)} />
        <Drawer anchor={'left'} open={state.left} onClose={toggleDrawer('left', false)}>
          {list('left')}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
