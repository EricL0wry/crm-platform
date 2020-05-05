import React, { Fragment } from 'react';
import MenuAppBar from './menu_app_bar';
export default class Dashboard extends React.Component {
  render() {
    return (
      <Fragment>
        <MenuAppBar />
        <h1 align="center">Dashboard</h1>
      </Fragment>
    );
  }
}
