import React from 'react';
import Login from './login';
import Profile from './profile';
import DashBoard from './dashboard';
import Customers from './customers';
import Organization from './organization';
import AssignedTickets from './assigned-tickets';
import AppContext from '../lib/context';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NewCustomer from './new-customer';
import NewTicket from './new-ticket';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Customer from './customer';
import NewInteraction from './new-interaction';
import TicketDetails from './ticket-details';
import UpdateTicket from './update-ticket';
import EditCustomer from './edit-customer';
import Loading from './loading';
import NewUser from './new-user';
import InvalidRoute from './invalid-route';
import Layout from './layout';
import withAuth from './with-auth';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isLoading: true,
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
    fetch('/api/login')
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then(user => {
        const newState = { isLoading: false };
        newState.currentUser = user || null;
        this.setState(newState);
      });
  }

  onLogin(user) {
    this.setState({ currentUser: user });
  }

  onLogout() {
    const req = {
      method: 'POST'
    };
    fetch('/api/logout', req)
      .then(response => {
        if (response.status === 204) {
          this.setState({ currentUser: null });
        }
      });
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
    if (this.state.isLoading) {
      return (
        <Loading />
      );
    } else {
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
            <Layout>
              <Switch>
                <Route exact path="/" component={withAuth(DashBoard)} />
                <Route path="/customer/new" component={withAuth(NewCustomer)} />
                <Route exact path="/customers" component={withAuth(Customers)} />
                <Route path="/login" component={Login} />
                <Route path="/profile" component={withAuth(Profile)} />
                <Route exact path="/customers/:customerId" component={withAuth(Customer)} />
                <Route exact path="/customers/edit/:customerId" component={withAuth(EditCustomer)} />
                <Route path="/customers/:customerId/newInteraction" component={withAuth(NewInteraction)}></Route>
                <Route exact path="/organization" component={withAuth(Organization)} />
                <Route exact path="/organization/newuser" component={withAuth(NewUser)} />
                <Route path="/tickets" component={withAuth(AssignedTickets)}></Route>
                <Route path="/ticket/new" component={withAuth(NewTicket)} />
                <Route path="/ticket/edit/:ticketId" component={withAuth(UpdateTicket)}></Route>
                <Route path="/ticket/:ticketId" component={withAuth(TicketDetails)}></Route>
                <Route component={InvalidRoute}></Route>
              </Switch>
            </Layout>
          </BrowserRouter>
        </AppContext.Provider>
      );
    }
  }
}
