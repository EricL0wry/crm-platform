import React, { useContext, Fragment } from 'react';
import MenuAppBar from './menu-app-bar';
import AppContext from '../lib/context';

export default function Layout(props) {
  const context = useContext(AppContext);

  return (
    <Fragment>
      {context.isLoggedIn() && <MenuAppBar />}
      {props.children}
    </Fragment>
  );
}
