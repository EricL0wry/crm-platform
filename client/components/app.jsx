import React from 'react';
import Login from './login';
import Profile from './profile';
import DashBoard from './dashboard';
import Customers from './customers';
import AppContext from '../lib/context';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MenuAppBar from './menu-app-bar';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        email: 'ourguy@lfz.com',
        userId: 1
      }
    };
    this.contextValue = {
      onLogin: this.onLogin.bind(this),
      onLogout: this.onLogout.bind(this),
      isLoggedIn: this.isLoggedIn.bind(this),
      getUser: this.getUser.bind(this)
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

  render() {
    if (this.state.currentUser) {
      return (
        <AppContext.Provider value={this.contextValue}>
          <BrowserRouter>
            <MenuAppBar />
            <Switch>
              <Route exact path="/" component={DashBoard} />
              <Route path="/customers" component={Customers} />
              <Route path="/login" component={Login} />
              <Route path="/profile" component={Profile} />
            </Switch>
          </BrowserRouter>
        </AppContext.Provider>
      );
    } else {
      return this.userLogin();
    }
  }
}
