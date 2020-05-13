import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AppContext from '../lib/context';

export default function withAuth(Component) {

  return function WithAuth(props) {
    const context = useContext(AppContext);
    if (context.isLoggedIn()) {
      return (
        <Component {...props}/>
      );
    } else {
      return (
        <Redirect to='/login'/>
      );
    }
  };
}
