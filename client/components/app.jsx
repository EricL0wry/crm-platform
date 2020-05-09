import React from 'react';
import Login from './login';
import Profile from './profile';
import DashBoard from './dashboard';
import Customers from './customers';
import Organization from './organization';
import AssignedTickets from './assigned-tickets';
import AppContext from '../lib/context';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MenuAppBar from './menu-app-bar';
import NewCustomer from './new-customer';
import NewTicket from './new-ticket';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Customer from './customer';
import NewInteraction from './new-interaction';
import TicketDetails from './ticket-details';
import UpdateTicket from './update-ticket';

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
              <Route path="/customer/new" component={NewCustomer} />
              <Route exact path="/customers" component={Customers} />
              <Route path="/login" component={Login} />
              <Route path="/profile" component={Profile} />
              <Route exact path="/customers/:customerId" component={Customer} />
              <Route path="/organization" component={Organization} />
              <Route path="/tickets/:userId" component={AssignedTickets}></Route>
              <Route path="/customers/:customerId/newInteraction" component={NewInteraction}></Route>
              <Route path="/ticket/new" component={NewTicket} />
              <Route path="/ticket/edit/:ticketId" component={UpdateTicket}></Route>
              <Route path="/ticket/:ticketId" component={TicketDetails}></Route>

            </Switch>
          </BrowserRouter>
        </AppContext.Provider>
      );
    } else {
      return this.userLogin();
    }
  }
}
