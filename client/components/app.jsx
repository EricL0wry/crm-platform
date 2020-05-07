import React from 'react';
import Login from './login';
import Profile from './profile';
import DashBoard from './dashboard';
import Customers from './customers';
import Organization from './organization';
import AppContext from '../lib/context';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MenuAppBar from './menu-app-bar';
import NewCustomer from './new-customer';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        email: 'ourguy@lfz.com',
        userId: 1
      },
      notification: {
        isOpen: false,
        message: ''
      }
    };
    this.closeSnackbar = this.closeSnackbar.bind(this);
    this.contextValue = {
      onLogin: this.onLogin.bind(this),
      onLogout: this.onLogout.bind(this),
      isLoggedIn: this.isLoggedIn.bind(this),
      getUser: this.getUser.bind(this),
      openSnackbar: this.openSnackbar.bind(this)
    };
  }

  componentDidMount() {

  }

  onLogin(user) {
    this.setState({ currentUser: user });
  }

  onLogout() {
    this.setState({ currentUser: null });
  }

  isLoggedIn() {
    return this.state.currentUser !== null;
  }

  userLogin() {
    return (
      <AppContext.Provider value={this.contextValue}>
        <Login />
      </AppContext.Provider>
    );
  }

  getUser() {
    const user = Object.assign({}, this.state.currentUser);
    return user;
  }

  openSnackbar(message) {
    this.setState({
      notification: {
        isOpen: true,
        message: message
      }
    });
  }

  closeSnackbar() {
    this.setState({
      notification: {
        isOpen: false,
        message: ''
      }
    });
  }

  render() {
    if (this.state.currentUser) {
      return (
        <AppContext.Provider value={this.contextValue}>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            open={this.state.notification.isOpen}
            autoHideDuration={3000}
            onClose={this.closeSnackbar}
            message={this.state.notification.message}
            action={
              <React.Fragment>
                <IconButton size="small" aria-label="close" color="inherit" onClick={this.closeSnackbar}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          />
          <BrowserRouter>
            <MenuAppBar />
            <Switch>
              <Route exact path="/" component={DashBoard} />
              <Route path="/customers" component={Customers} />
              <Route path="/customer/new" component={NewCustomer} />
              <Route path="/login" component={Login} />
              <Route path="/profile" component={Profile} />
              <Route path="/organization" component={Organization} />
            </Switch>
          </BrowserRouter>
        </AppContext.Provider>
      );
    } else {
      return this.userLogin();
    }
  }
}
