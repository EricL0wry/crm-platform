import React from 'react';
import Login from './login';
import DashBoard from './dashboard';
import AppContext from '../lib/context';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './header';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
    };
    this.contextValue = {
      onLogin: this.onLogin.bind(this),
      isLoggedIn: this.isLoggedIn.bind(this)
    };
  }

  componentDidMount() {

  }

  onLogin(user) {
    this.setState({ currentUser: user });
  }

  isLoggedIn() {
    return this.state.currentUser !== null;
  }

  userLogin() {
    return (
      <AppContext.Provider value={this.contextValue}>
        <Header />
        <Login />
      </AppContext.Provider>
    );
  }

  render() {
    if (this.state.currentUser) {
      return (
        <AppContext.Provider value={this.contextValue}>
          <BrowserRouter>
            <Route exact path="/" component={DashBoard} />
          </BrowserRouter>
        </AppContext.Provider>
      );
    } else {
      return this.userLogin();
    }
  }
}
